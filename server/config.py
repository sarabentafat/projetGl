from decouple import config
import os
class Config: 
    SECRET_KEY=config('SECRET_KEY')
    SQLALCHEMY_TRACK_MODIFICATIONS = config('SQLALCHEMY_TRACK_MODIFICATIONS',cast=bool)
    JWT_TOKEN_LOCATION = config('JWT_TOKEN_LOCATION')
    JWT_COOKIE_SECURE = config('JWT_COOKIE_SECURE',cast=bool)
    JWT_SECRET_KEY = config('JWT_SECRET_KEY')
    GOOGLE_CLIENT_ID = config('GOOGLE_CLIENT_ID')
    GOOGLE_CLINET_SECRET = config('GOOGLE_CLINET_SECRET')
    WEBSITE_URL = config('WEBSITE_URL')
    JWT_COOKIE_CSRF_PROTECT = False
    # JWT_SESSION_COOKIE = False
    # JWT_ACCESS_TOKEN_EXPIRES = config('JWT_ACCESS_TOKEN_EXPIRES')


BASE_DIR = os.path.dirname(os.path.realpath(__file__))
class DevConfig(Config) :
    SQLALCHEMY_DATABASE_URI = 'sqlite:///'+os.path.join(BASE_DIR,'db.sqlite')   # dev.db  #app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'db.sqlite')
    DEBUG = True 
    SQLALCHEMY_ECHO = True 
    JWT_ACCESS_TOKEN_EXPIRES = 60 * 60 * 24 * 5

class ProdConfig(Config):
    pass 


class TestConfig(Config) :
    pass