from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt, get_current_user
from datetime import timedelta

from app.services.auth_service import AuthService
from app.models.user import Role

auth_bp = Blueprint("auth", __name__)

def get_auth_service() -> AuthService:
    return AuthService(redis_client=current_app.extensions['redis'])

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    role_str = data.get("role", "USER").upper()

    try:
        role = Role[role_str]
    except KeyError:
        return jsonify({"error": "Invalid role"}), 400

    if not email or not password:
        return jsonify({"error": "Missing email or password"}), 400

    auth_service = get_auth_service()
    try:
        user = auth_service.register(email=email, raw_password=password, role=role)
        return jsonify({"id": user.id, "email": user.email, "role": user.role.value}), 201
    except ValueError as e:
        return jsonify({"error": str(e)}), 400

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Missing email or password"}), 400

    auth_service = get_auth_service()
    try:
        access_token, refresh_token = auth_service.login(email=email, raw_password=password)
        return jsonify({"access_token": access_token, "refresh_token": refresh_token}), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 401

@auth_bp.route("/logout", methods=["POST"])
@jwt_required()
def logout():
    jti = get_jwt()["jti"]
    # Token expiration in seconds (default to 1 hour if not specified)
    # Normally we'd calculate from the 'exp' claim. 
    # For safety, let's say 24 hours.
    auth_service = get_auth_service()
    auth_service.logout(jti=jti, expires_in_seconds=86400)
    return jsonify({"message": "Successfully logged out"}), 200

@auth_bp.route("/refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh():
    identity = get_jwt_identity()
    claims = get_jwt()
    role = claims.get("role", "USER")
    
    auth_service = get_auth_service()
    new_access_token = auth_service.refresh(current_user_id=identity, current_role=role)
    return jsonify({"access_token": new_access_token}), 200
