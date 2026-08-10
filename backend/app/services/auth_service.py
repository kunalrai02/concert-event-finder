from datetime import timedelta
from typing import Optional, Tuple
from flask_jwt_extended import create_access_token, create_refresh_token, decode_token

from app.core.extensions import db, celery_app
from app.models.user import User, Role
from redis import Redis

class AuthService:
    def __init__(self, redis_client: Redis):
        self.redis = redis_client

    def register(self, email: str, raw_password: str, role: Role = Role.USER) -> User:
        if db.session.query(User).filter_by(email=email).first():
            raise ValueError("Email already registered")

        user = User(email=email, role=role)
        user.set_password(raw_password)
        
        db.session.add(user)
        db.session.commit()
        return user

    def login(self, email: str, raw_password: str) -> Tuple[str, str]:
        user = db.session.query(User).filter_by(email=email).first()
        if not user or not user.check_password(raw_password):
            raise ValueError("Invalid email or password")
        
        if not user.is_active:
            raise ValueError("Account is disabled")

        access_token = create_access_token(identity=str(user.id), additional_claims={"role": user.role.value})
        refresh_token = create_refresh_token(identity=str(user.id), additional_claims={"role": user.role.value})
        
        return access_token, refresh_token

    def logout(self, jti: str, expires_in_seconds: int) -> None:
        """
        Revokes a JWT by adding its JTI to the Redis blocklist.
        """
        self.redis.set(jti, "", ex=expires_in_seconds)

    def refresh(self, current_user_id: str, current_role: str) -> str:
        """
        Issues a new access token for a valid refresh token.
        """
        access_token = create_access_token(identity=current_user_id, additional_claims={"role": current_role})
        return access_token
