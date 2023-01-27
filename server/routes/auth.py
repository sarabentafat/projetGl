from flask import Blueprint,request,jsonify,url_for,redirect
from modals import db, Personnes,user_schema,users_schema
from flask_jwt_extended import create_access_token,set_access_cookies,unset_jwt_cookies,jwt_required,get_jwt_identity
from config import Config
from authlib.integrations.flask_client import OAuth
from config import Config 

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
    client_kwargs={'scope': 'email profile phone'},
)



auth = Blueprint('auth',__name__,url_prefix='/auth')

@auth.get('/register') 
def register():
    google = oauth.create_client('google')  # create the google oauth client
    redirect_uri = url_for('auth.google_callback', _external=True)
    return google.authorize_redirect(redirect_uri)


@auth.get('/login')
def login() : 
    google = oauth.create_client('google')  # create the google oauth client
    redirect_uri = url_for('auth.google_callback', _external=True)
    return google.authorize_redirect(redirect_uri)


@auth.post('/logout')
def logout() : 
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response


@auth.get('/profile') 
@jwt_required()
def get_profile() :
    user_id = get_jwt_identity() #* search for user in db
    user = Personnes.query.get(id=user_id)
    return user_schema.jsonify(user)

@auth.put('/profile')
@jwt_required()
def update_profile() :
  user_id = get_jwt_identity()
  user = Personnes.query.get(id= user_id)
  nom = request.json['nom']

  # todo : add all infos here
  user.nom = nom 

  db.session.commit()
  return user_schema.jsonify(user)


@auth.get('/google/callback') 
def google_callback() :
    try :
        google = oauth.create_client('google')  # create the google oauth client
        token = google.authorize_access_token()  # Access token from google (needed to get user info)
        resp = google.get('userinfo')  # userinfo contains stuff u specificed in the scrope
        print(google)
        user_info = resp.json()
        print(user_info)

        user_exists = Personnes.query.get(googeId=user_info['id'])

        if user_exists != None :
            response = jsonify({"msg": "register successful"})
            access_token = create_access_token(identity=user_exists.id) #* will get infos from googleid
            set_access_cookies(response, access_token)
            return response

        else :
            nom = user_info['family_name']
            prenom = user_info['given_name']
            email = user_info['email']
            tel = user_info['0565856']
            googeId = user_info['id']
            adresse= user_info['154']
            isadmin= user_info['False']
        
            new_user = Personnes(nom=nom,prenom=prenom,googeId=googeId, email=email,tel=tel,adresse=adresse,isadmin=isadmin)
            db.session.add(new_user)
            db.session.commit()

            response = jsonify({"msg": "register successful"})
            access_token = create_access_token(identity=new_user.id) #* will get infos from googleid
            set_access_cookies(response, access_token)
            # return response
            # return user_schema.jsonify(new_user)
            return redirect(Config.WEBSITE_URL)

    except Exception as e :
        return f'An error accured {e}',401
