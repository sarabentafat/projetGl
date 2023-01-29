import os
from flask import Blueprint ,request,jsonify
from models import annonce_schema,Annonces,annonces_schema,db,Comments,comments_schema,comment_schema,Photos,photo_schema,photos_schema
from flask_jwt_extended import jwt_required,get_jwt_identity
from utils.error_handler import error_handler
from utils.errors import InvalidParamsError
from utils.upload_media import allowed_file,secure_filename,UPLOAD_FOLDER
from config import Config

annonces = Blueprint('annonces',__name__,url_prefix='/annonces')

@annonces.post('/')
@error_handler()
@jwt_required()
@error_handler()
def add_annonce():
  pers_id = get_jwt_identity()  #* add of the current user
  # pers_id = '111741026364914091469'  #* add of the current user
  theme = request.json.get('theme', '')
  description = request.json.get('description', '')
  tarif = request.json.get('tarif', 0)
  modalite = request.json.get('modalite', '')
  categorie = request.json.get('categorie', '')
  adresse= request.json.get('adresse', '')
  titre= request.json.get('titre', '')

  if pers_id== None or theme== None or description== None or tarif== None or modalite== None or categorie== None or  titre== None :
    raise InvalidParamsError()

  new_annonce = Annonces(titre=titre,theme=theme, description=description, tarif=tarif,modalite=modalite,categorie=categorie,adresse=adresse,pers_id=pers_id)

  db.session.add(new_annonce)
  db.session.commit()

  return annonce_schema.jsonify(new_annonce)

#! upload phots
@annonces.post('/<annonce_id>/media')  #* we add her annonce_id maybe
@error_handler()
@jwt_required()
def upload_media(annonce_id):

  annonce =Annonces.query.get(annonce_id)
  if annonce == None :
    raise InvalidParamsError(f'Annonce  with id : {annonce_id} not found')

  # print(request.files)
  if 'file' not in request.files:
    raise InvalidParamsError(f"files not found")
  
  files = request.files.getlist("file")
  for file in  files:
    if file.filename == '' :
      raise InvalidParamsError(f'No file selected')
    
    if file and allowed_file(file.filename) :
      filename = secure_filename(file.filename)
      file.save(os.path.join(UPLOAD_FOLDER,filename))
      photo_url = os.path.join(Config.BACKEND_URL,'static',filename)   #* can be changed
      # print(photo_url)
      photo = Photos(photo=photo_url,post=annonce_id)
      db.session.add(photo)
      db.session.commit()
    
  
  return jsonify({'msg':"saved successfuly"})




#get all annonces
@annonces.get('/')
@error_handler()
@jwt_required()
def get_annonces():
  all_annonces = Annonces.query.all()
  result = annonces_schema.dump(all_annonces)
  return jsonify(result)


#get annonce by id
@annonces.get('/<annonce_id>')
@error_handler()
@jwt_required()
def get_annonce(annonce_id):
  annonce = Annonces.query.get(annonce_id)
  return annonce_schema.jsonify(annonce)

#get annonce of a user 
@annonces.get('/myannonces')
@error_handler()
@jwt_required()
def get_user_annonces(): 
  user_id = get_jwt_identity()
  annonces = Annonces.query.filter(Annonces.pers_id==user_id).all()
  result = annonces_schema.dump(annonces)
  return jsonify(result)
  

#update
@annonces.put('/<id>')
@error_handler()
@jwt_required()
def update_annonce(id):
  user_id = get_jwt_identity()
  annonce = Annonces.query.get(id)
  if annonce == None :
    raise InvalidParamsError(f'Annonce  with id : {id} not found')

  if annonce.pers_id != user_id :
    raise InvalidParamsError(f"you're not the owner of this annonce")

  theme = request.json.get('theme',annonce.theme)
  titre = request.json.get('titre',annonce.titre)
  description = request.json.get('description',annonce.description)
  tarif = request.json.get('tarif',annonce.tarif)
  modalite = request.json.get('modalite',annonce.modalite)
  categorie= request.json.get('categorie',annonce.categorie)
  adresse= request.json.get('adresse',annonce.adresse)

  annonce.theme= theme
  annonce.description = description
  annonce.tarif = tarif 
  annonce.modalite =modalite
  annonce.categorie= categorie 
  annonce.adresse = adresse
  annonce.titre = titre
 

  db.session.commit()

  return annonce_schema.jsonify(annonce)


#deletes an announce
@annonces.delete('/<annonce_id>')
@error_handler()
@jwt_required()
def delete_annonce(annonce_id):
  user_id = get_jwt_identity()
  annonce =Annonces.query.get(annonce_id)

  if annonce == None :
    raise InvalidParamsError(f'Annonce  with id : {id} not found')

  if annonce.pers_id != user_id :
    raise InvalidParamsError(f"you're not the owner of this annonce")

  db.session.delete(annonce)
  db.session.commit()

  return annonce_schema.jsonify(annonce)



#todo : add new comment for specific post
@annonces.post('/<annonce_id>/comments')
@error_handler()
@jwt_required()
def add_comment(annonce_id):
  user_id = get_jwt_identity()
  annonce =Annonces.query.get(annonce_id)

  if annonce == None :
    raise InvalidParamsError(f'Annonce  with id : {annonce_id} not found')

  text = request.json.get('text','')

  if text == '' :
    raise InvalidParamsError('You must pass text with comment')

  new_comment = Comments(text=text,author=user_id,post_id=annonce_id)

  db.session.add(new_comment)
  db.session.commit()

  return comment_schema.jsonify(new_comment)

@annonces.get('/<annonce_id>/comments')
@error_handler()
@jwt_required()
def get_all_comments(annonce_id):
  user_id = get_jwt_identity()
  annonce =Annonces.query.get(annonce_id)

  if annonce == None :
    raise InvalidParamsError(f'Annonce  with id : {annonce_id} not found')


  commments = Comments.query.filter_by(post_id=annonce_id).all()
  print(commments)

  result = comments_schema.dump(commments)
  return result


@annonces.delete('/<annonce_id>/comments/<comment_id>')
@error_handler()
@jwt_required()
def delete_comment(annonce_id,comment_id):
  user_id = get_jwt_identity()
  annonce =Annonces.query.get(annonce_id)

  if annonce == None :
    raise InvalidParamsError(f'Annonce  with id : {annonce_id} not found')

  comment = Comments.query.get(comment_id)
  if comment == None :
    raise InvalidParamsError(f'Comment  with id : {comment_id} not found')

  if comment.author != user_id :
    raise InvalidParamsError(f'you can\'nt delete this comment you are not the author')

  db.session.delete(comment)
  db.session.commit()

  return comment_schema.jsonify(comment)
