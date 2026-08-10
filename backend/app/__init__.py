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

    # Import models so they are registered with SQLAlchemy
    from app import models
    # Configure Celery
    celery_app.conf.update(app.config)

    # Configure Redis for JWT blocklist
    import redis
    redis_client = redis.from_url(app.config.get("REDIS_URL") or "redis://localhost:6379/0")
    
    @jwt.token_in_blocklist_loader
    def check_if_token_is_revoked(jwt_header, jwt_payload: dict) -> bool:
        jti = jwt_payload["jti"]
        token_in_redis = redis_client.get(jti)
        return token_in_redis is not None

    # Store redis_client on app for access in routes
    app.extensions['redis'] = redis_client
    # Register blueprints
    from app.api.v1.auth.routes import auth_bp
    app.register_blueprint(auth_bp, url_prefix="/api/v1/auth")

    jwt.init_app(app)

    return app
