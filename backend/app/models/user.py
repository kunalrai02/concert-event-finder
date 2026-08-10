import enum
import bcrypt
from typing import Optional
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, Enum

from app.models.base import BaseModel

class Role(str, enum.Enum):
    ADMIN = "ADMIN"
    USER = "USER"
    ORGANIZER = "ORGANIZER"

class User(BaseModel):
    __tablename__ = "users"

    email: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    role: Mapped[Role] = mapped_column(Enum(Role), default=Role.USER, nullable=False)
    is_active: Mapped[bool] = mapped_column(default=True, nullable=False)

    def set_password(self, raw_password: str) -> None:
        """Hashes the password and stores it in the model."""
        salt = bcrypt.gensalt()
        self.password_hash = bcrypt.hashpw(raw_password.encode('utf-8'), salt).decode('utf-8')

    def check_password(self, raw_password: str) -> bool:
        """Verifies a raw password against the stored hash."""
        return bcrypt.checkpw(
            raw_password.encode('utf-8'), 
            self.password_hash.encode('utf-8')
        )
