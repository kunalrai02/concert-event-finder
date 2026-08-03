from flask import Flask

from app.core.config import Config
from app.core.extensions import db, migrate, celery_app
from app.core.logging import setup_logging
from app.core.extensions import jwt

def create_app(config_class=Config) -> Flask:
    setup_logging()
    
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    
    # Configure Celery
    celery_app.conf.update(app.config)

    # Register blueprints (to be added)
    # from app.api.v1 import some_router
    # app.register_blueprint(some_router, url_prefix="/api/v1")

    jwt.init_app(app)

    return app
