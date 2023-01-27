from flask import Blueprint,request,jsonify
from modals import db, Personnes,user_schema,users_schema
from flask_jwt_extended import create_access_token,set_access_cookies,unset_jwt_cookies,jwt_required,get_jwt_identity


auth = Blueprint('auth',__name__,url_prefix='/api/auth')

@auth.post('/register') 
def add_user():
  nom = request.json.get('nom', '')
  prenom = request.json.get('prenom', '')
  email = request.json.get('email', '')
  tel = request.json.get('tel', '')
  googeId = request.json.get('googleId','')
  adresse= request.json.get('adress', '')
  isadmin= request.json.get('isadmin', '')
  
  new_user = Personnes(nom=nom,prenom=prenom,googeId=googeId, email=email,tel=tel,adresse=adresse,isadmin=isadmin)
  db.session.add(new_user)
  db.session.commit()

  return user_schema.jsonify(new_user)


@auth.post('/login')
def login() : 
    response = jsonify({"msg": "login successful"})
    access_token = create_access_token(identity="example_user") #* will get infos from googleid
    set_access_cookies(response, access_token)
    return response

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


@auth.put('/google/callback') 
def login_with_google() :
    token = create_access_token(id)
    return 'logged with google'
