from flask import Blueprint,request,jsonify
from modals import db, Personnes,user_schema,users_schema


admin = Blueprint('admin',__name__,url_prefix='/api/admin')

#add a user
@admin.route('/users',methods=['POST'])
def add_user():
  nom = request.json.get('nom', '')
  prenom = request.json.get('prenom', '')
  email = request.json.get('email', '')
  tel = request.json.get('tel', '')
  adresse= request.json.get('admin', '')
  isadmin= request.json.get('isadmin', '')
  
  new_user = Personnes(nom=nom,prenom=prenom, email=email,tel=tel,adresse=adresse,isadmin=isadmin)
  db.session.add(new_user)
  db.session.commit()

  return user_schema.jsonify(new_user)
  


#get all users
@admin.route('/users', methods=['GET'])
def get_users():
  all_users = Personnes.query.all()
  result = users_schema.dump(all_users)
  return jsonify(result)



#delete a user 
@admin.route('/users/<id>', methods=['DELETE'])
def delete_user(id):
  user =Personnes.query.get(id)
  db.session.delete(user)
  db.session.commit()

  return user_schema.jsonify(user)

#get a user by id
@admin.route('/users/<id>', methods=['GET'])
def get_user(id):
  user = Personnes.query.get(id)
  return user_schema.jsonify(user)

