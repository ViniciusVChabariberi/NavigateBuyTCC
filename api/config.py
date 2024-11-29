import os

# Configurações do Flask
class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'postgresql+psycopg2://myuser:mysecurepassword@db.some-region.render.com:5432/mydatabase')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    secret_key = os.getenv('SECRET_KEY')
    SESSION_COOKIE_SECURE = True
    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SAMESITE = 'Lax'