from typing import Optional
from flask_jwt_extended import get_jwt_identity
from app.core.extensions import db
from app.models.user import User


def get_acting_user() -> Optional[User]:
    """
    Retrieves the User object for the currently authenticated request.
    Use this in your route handlers to fetch the `acting_user` and pass it
    explicitly to domain services to satisfy the "Push Authorization behind Service Interface" rule.
    """
    identity = get_jwt_identity()
    if not identity:
        return None

    return db.session.get(User, int(identity))
