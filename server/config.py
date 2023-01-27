from decouple import config
import os
class Config: 
    SECRET_KEY=config('SECRET_KEY')
    SQLALCHEMY_TRACK_MODIFICATIONS = config('SQLALCHEMY_TRACK_MODIFICATIONS',cast=bool)


BASE_DIR = os.path.dirname(os.path.realpath(__file__))
class DevConfig(Config) :
    SQLALCHEMY_DATABASE_URL = 'sqlite:///'+os.path.join(BASE_DIR,'db.sqlite')   # dev.db
    DEBUG = True 
    SQLALCHEMY_ECHO = True 

class ProdConfig(Config):
    pass 


class TestConfig(Config) :
    pass