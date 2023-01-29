from flask import Blueprint ,request,jsonify
from models import db,Favorites,favorite_schema,favorites_schema
from flask_jwt_extended import jwt_required,get_jwt_identity
from utils.error_handler import error_handler
from utils.errors import InvalidParamsError

favorites = Blueprint('favorites',__name__,url_prefix='/favorites')


#get all favorite announces 
@favorites.get('/')
@error_handler()
@jwt_required()
def get_my_favorites():
  user_id = get_jwt_identity()
  favorite_annonces=  Favorites.query.filter_by(user_id=user_id).all()
  result = favorites_schema.dump(favorite_annonces)
  return jsonify(result)


#remove element from my favorites
@favorites.delete('/<id>')
@error_handler()
@jwt_required()
def delete_favorite(id):
  favorite_annonce = Favorites.query.get(id)
  if favorite_annonce == None :
    raise InvalidParamsError(f"Annonce id : {id} not found in favorites")

  db.session.delete(favorite_annonce)
  db.session.commit()
  return  favorite_schema.jsonify(favorite_annonce)



# add annonce with id to my favorites
@favorites.post('/<id>')
@error_handler()
@jwt_required()
def add_to_favorites(id):
  annonce_id = id 
  user_id = get_jwt_identity() 
  favorite_exists = Favorites.query.filter_by(annonce_id= id).first()
  if favorite_exists != None :
    raise InvalidParamsError(f"Annonce id : {id} already in favorites")
  
  favorite = Favorites(user_id=user_id,annonce_id=annonce_id)
  db.session.add(favorite)
  db.session.commit()

  return favorite_schema.jsonify(favorite)



