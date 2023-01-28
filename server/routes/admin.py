from flask import Blueprint,request,jsonify
from server.models import db, Personnes,user_schema,users_schema
from flask_jwt_extended import jwt_required


admin = Blueprint('admin',__name__,url_prefix='/admin')

#add a user
@admin.post('/users')
@jwt_required()
def add_user():
  id =  request.json.get('id','')
  nom = request.json.get('nom', '')
  prenom = request.json.get('prenom', '')
  email = request.json.get('email', '')
  googleId = request.json.get('googleId','') 
  tel = request.json.get('tel', '')
  adresse= request.json.get('adresse', '')
  isadmin= request.json.get('isadmin', '')
  
  new_user = Personnes(id=id,  nom=nom,prenom=prenom,googleId=googleId, email=email,tel=tel,adresse=adresse,isadmin=isadmin)
  db.session.add(new_user)
  db.session.commit()

  return user_schema.jsonify(new_user)
  


#get all users
@admin.get('/users')
@jwt_required()
def get_users():
  all_users = Personnes.query.all()
  result = users_schema.dump(all_users)
  return jsonify(result)



#delete a user 
@admin.delete('/users/<id>')
@jwt_required()
def delete_user(id):
  user =Personnes.query.get(id)
  db.session.delete(user)
  db.session.commit()

  return user_schema.jsonify(user)

#get a user by id
@admin.get('/users/<id>')
@jwt_required()
def get_user(id):
  user = Personnes.query.get(id)
  return user_schema.jsonify(user)

