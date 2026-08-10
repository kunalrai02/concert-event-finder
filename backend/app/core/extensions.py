from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
from flask_migrate import Migrate
from celery import Celery
from flask_jwt_extended import JWTManager


class Base(DeclarativeBase):
    pass

db = SQLAlchemy(model_class=Base)
migrate = Migrate()
celery_app = Celery("concert_event_finder")
jwt = JWTManager()
