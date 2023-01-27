from decouple import config
import os
class Config: 
    SECRET_KEY=config('SECRET_KEY')
    SQLALCHEMY_TRACK_MODIFICATIONS = config('SQLALCHEMY_TRACK_MODIFICATIONS',cast=bool)
    JWT_TOKEN_LOCATION = config('JWT_TOKEN_LOCATION')
    JWT_COOKIE_SECURE = config('JWT_COOKIE_SECURE',cast=bool)
    JWT_SECRET_KEY = config('JWT_SECRET_KEY')


BASE_DIR = os.path.dirname(os.path.realpath(__file__))
class DevConfig(Config) :
    SQLALCHEMY_DATABASE_URI = 'sqlite:///'+os.path.join(BASE_DIR,'db.sqlite')   # dev.db  #app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'db.sqlite')
    DEBUG = True 
    SQLALCHEMY_ECHO = True 

class ProdConfig(Config):
    pass 


class TestConfig(Config) :
    pass