import os
import logging
from logging.config import dictConfig


def setup_logging():
    # Ensure logs directory exists at the root of the project
    os.makedirs("logs", exist_ok=True)

    dictConfig(
        {
            "version": 1,
            "disable_existing_loggers": False,
            "formatters": {
                "default": {
                    "format": "[%(asctime)s] %(levelname)s in %(module)s: %(message)s",
                },
                "detailed": {
                    "format": "[%(asctime)s] %(levelname)s [%(name)s:%(lineno)d] - %(message)s",
                },
            },
            "handlers": {
                "console": {
                    "class": "logging.StreamHandler",
                    "stream": "ext://flask.logging.wsgi_errors_stream",
                    "formatter": "default",
                },
                "app_file": {
                    "class": "logging.handlers.RotatingFileHandler",
                    "filename": "logs/application.log",
                    "maxBytes": 10485760,  # 10 MB limit
                    "backupCount": 3,  # Keep 5 backups before overwriting
                    "formatter": "detailed",
                    "level": "INFO",
                },
                "error_file": {
                    "class": "logging.handlers.RotatingFileHandler",
                    "filename": "logs/error.log",
                    "maxBytes": 10485760,
                    "backupCount": 3,
                    "formatter": "detailed",
                    "level": "ERROR",  # Only captures ERROR and above
                },
                "scheduler_file": {
                    "class": "logging.handlers.RotatingFileHandler",
                    "filename": "logs/scheduler.log",
                    "maxBytes": 10485760,
                    "backupCount": 3,
                    "formatter": "detailed",
                    "level": "INFO",
                },
                "notification_file": {
                    "class": "logging.handlers.RotatingFileHandler",
                    "filename": "logs/notification.log",
                    "maxBytes": 10485760,
                    "backupCount": 3,
                    "formatter": "detailed",
                    "level": "INFO",
                },
            },
            "loggers": {
                "scheduler": {
                    "level": "INFO",
                    "handlers": ["console", "scheduler_file"],
                    "propagate": False,
                },
                "notification": {
                    "level": "INFO",
                    "handlers": ["console", "notification_file"],
                    "propagate": False,
                },
            },
            "root": {
                "level": "INFO",
                # Everything logs to the console and application file.
                # Errors also go to the error_file.
                "handlers": ["console", "app_file", "error_file"],
            },
        }
    )
