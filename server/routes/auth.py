from flask import Blueprint,request,jsonify,url_for,redirect,make_response
from models import db, Personnes,user_schema,users_schema
from flask_jwt_extended import create_access_token,set_access_cookies,unset_jwt_cookies,jwt_required,get_jwt_identity
from config import Config
from authlib.integrations.flask_client import OAuth

from utils.error_handler import error_handler

# oAuth Setup
oauth= OAuth()
google = oauth.register(
    name='google',
    client_id=Config.GOOGLE_CLIENT_ID,
    client_secret=Config.GOOGLE_CLINET_SECRET,
    access_token_url='https://accounts.google.com/o/oauth2/token',
    access_token_params=None,
    authorize_url='https://accounts.google.com/o/oauth2/auth',
    authorize_params=None,
    api_base_url='https://www.googleapis.com/oauth2/v1/',
    userinfo_endpoint='https://openidconnect.googleapis.com/v1/userinfo',  # This is only needed if using openId to fetch user info
    
    client_kwargs={'scope': 'email profile'},
)



auth = Blueprint('auth',__name__,url_prefix='/auth')

@auth.get('/register') 
@error_handler()
def register():
    google = oauth.create_client('google')  # create the google oauth client
    redirect_uri = url_for('auth.google_callback', _external=True)
    return google.authorize_redirect(redirect_uri)


@auth.get('/login')
@error_handler()
def login() : 
    google = oauth.create_client('google')  # create the google oauth client
    redirect_uri = url_for('auth.google_callback', _external=True)
    return google.authorize_redirect(redirect_uri)


@auth.post('/logout')
@error_handler()
@jwt_required()
def logout() : 
    response = make_response(redirect(Config.WEBSITE_URL))
    unset_jwt_cookies(response)
    return response


@auth.get('/profile') 
@error_handler()
@jwt_required()
def get_profile() :
    user_id = get_jwt_identity() #* search for user in db
    user = Personnes.query.get(user_id)
    print(user_schema.jsonify(user))
    return user_schema.jsonify(user)


@auth.put('/profile')
@error_handler()
@jwt_required()
def update_profile() :
  user_id = get_jwt_identity()
  user = Personnes.query.get(user_id)
  nom = request.json['nom']
  prenom = request.json['prenom']
  tel = request.json['tel']


  # todo : add all infos here
  user.nom = nom 
  user.prenom = prenom
  user.tel = tel

  db.session.commit()
  return user_schema.jsonify(user)


@auth.get('/google/callback') 
@error_handler()
def google_callback() :
    google = oauth.create_client('google')  # create the google oauth client
    token = google.authorize_access_token()  # Access token from google (needed to get user info)
    resp = google.get('userinfo')  # userinfo contains stuff u specificed in the scrope
    user_info = resp.json()
    res = google.get('https://people.googleapis.com/v1/people/me?personFields=phoneNumbers')
    user_phone = res.json()
    # print(user_info)

    user_exists = Personnes.query.get(user_info['id'])

    if user_exists != None :
        response = make_response(redirect(Config.WEBSITE_URL + 'success'))
        access_token = create_access_token(identity=user_exists.id) #* will get infos from googleid
        set_access_cookies(response, access_token)
        return response

    else :
        id = user_info['id']  # googleId
        nom = user_info['family_name']
        prenom = user_info['given_name']
        email = user_info['email']
        tel ='0565856897'  #random val
        adresse= 154 #random val
        isadmin= False
    
        new_user = Personnes(id=id,  nom=nom,prenom=prenom, email=email,tel=tel,adresse=adresse,isadmin=isadmin)
        db.session.add(new_user)
        db.session.commit()

        response = make_response(redirect(Config.WEBSITE_URL + 'success'))
        access_token = create_access_token(identity=new_user.id) #* will get infos from googleid
        set_access_cookies(response, access_token)
        return response

