import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def create_app(test_config=None):
    app = Flask(__name__)

    # default config
    app.config.from_mapping(
        SECRET_KEY="dev",
        SQLALCHEMY_DATABASE_URI=os.environ.get('DATABASE_URL', 'sqlite:///feodis.db'),
        SQLALCHEMY_TRACK_MODIFICATIONS=False,
    )

    # apply test_config or explicit overrides
    if test_config:
        app.config.update(test_config)

    db.init_app(app)

    with app.app_context():
        # Import parts of our application
        from . import routes
        app.register_blueprint(routes.bp)
        # create tables on startup if they don't exist
        db.create_all()

    return app
