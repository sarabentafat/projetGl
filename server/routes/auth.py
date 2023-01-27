from flask import Blueprint
from modals import db, Personnes,user_schema,users_schema
# from flask_jwt_extended import 


auth = Blueprint('auth',__name__,url_prefix='/api/auth')

@auth.post('/register') 
def register() :
    return 'user created' 


@auth.post('/login')
def login() : 
    return 'user login'


@auth.get('/profile') 
def get_profile() :
    return 'My profile'

@auth.put('/profile')
def update_profile() :
    return 'Profile updated'

