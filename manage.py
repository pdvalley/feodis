"""Simple management helper to run DB migrations (create tables).

Usage:
  DATABASE_URL=postgres://... python3 manage.py upgrade
"""
import os
import sys

from feodis_tracker import create_app, db


def upgrade():
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        print('ERROR: set DATABASE_URL environment variable to your Postgres URL')
        sys.exit(1)

    app = create_app({'SQLALCHEMY_DATABASE_URI': database_url})
    with app.app_context():
        print('Creating tables...')
        db.create_all()
        print('Done')


def main():
    if len(sys.argv) < 2:
        print('Usage: python3 manage.py upgrade')
        return
    cmd = sys.argv[1]
    if cmd == 'upgrade':
        upgrade()
    else:
        print('Unknown command:', cmd)


if __name__ == '__main__':
    main()
