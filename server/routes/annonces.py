import os
from flask import Blueprint ,request,jsonify
from models import annonce_schema,Annonces,annonces_schema,db,Comments,comments_schema,comment_schema,Photos,photo_schema,photos_schema,Adresse
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
  print('*'*100)
  pers_id = get_jwt_identity()  #* add of the current user
  # pers_id = '111741026364914091469'  #* add of the current user
  theme = request.json.get('theme', '')
  description = request.json.get('description', '')
  tarif = request.json.get('tarif', 0)
  modalite = request.json.get('modalite', '')
  categorie = request.json.get('categorie', '')
  wilaya= request.json.get('wilaya', False)
  commune= request.json.get('commune', False)
  titre= request.json.get('titre', '')

  if pers_id== None or theme== None or description== None or tarif== None or modalite== None or categorie== None or  titre== None or not wilaya or not commune :
    raise InvalidParamsError()

  adresse = Adresse.query.filter_by(commune = commune,wilaya= wilaya).first()

  if not adresse :  # if adresse not found create new one
    adresse = Adresse(wilaya=wilaya,commune=commune,lieuExact='') # we don't have lien exact
    db.session.add(adresse)
    db.session.commit()

  new_annonce = Annonces(titre=titre,theme=theme, description=description, tarif=tarif,modalite=modalite,categorie=categorie,adresse=adresse.id,pers_id=pers_id)

  db.session.add(new_annonce)
  db.session.commit()

  return annonce_schema.jsonify(new_annonce)

#! upload phots
@annonces.post('/<annonce_id>/media/')  #* we add her annonce_id maybe
@error_handler()
@jwt_required()
def upload_media(annonce_id):

  annonce =Annonces.query.get(annonce_id)
  if annonce == None :
    raise InvalidParamsError(f'Annonce  with id : {annonce_id} not found')

  print(request.files.getlist('file'))
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



# @annonces.get('/search')
# @error_handler()
# @jwt_required()
# def search_annonces(search_terms): 
#   if (search_terms) : 
#     annonces = Annonces.query.filter(Annonces.titre.contains(search_terms)|Annonces.description.contains(search_terms))
#   else : 
#     annonces = Annonces.query.all()
  
#     result = annonces_schema.dump(annonces)
#     return jsonify(result)


"""
def search_annonces(search_terms):
   search_query = or_(Annonces.titre.like("%" + ' '.join(search_terms) + "%"), Annonces.description.like("%" + ' '.join(search_terms) + "%"))
    annonces = Annonces.query.filter(search_query).all()
    
    
    return annonces_schema.dump(annonces)

def search_annonces(search_terms):
    search_query = or_(Annonces.titre.like("%" + term + "%") for term in search_terms)
    search_query = or_(search_query, (Annonces.description.like("%" + term + "%")))
    annonces = Annonces.query.filter(search_query).all()
    result = annonces_schema.dump(annonces)
    return jsonify(result)
"""


@annonces.get('/')
@error_handler()
@jwt_required()
def get_annonces(): 
    mots_cles = request.args.get('mots_cles',False)
    module = request.args.get('module',False)
    wilaya = request.args.get('wilaya',False)
    commune = request.args.get('commune',False)
    date_debut = request.args.get('date_debut',False)
    date_fin = request.args.get('date_fin',False)
    # print('-'*100)
    # print(mots_cles)
    # print(module)
    # print(wilaya)
    # print(commune)
    # print(date_debut)
    # print(date_fin)
    # print('-'*100)

    query = Annonces.query.order_by(Annonces.date_posted.desc())

    if mots_cles :
      mots_cles = mots_cles.split(' ')
      for mot_cle in mots_cles :
          query = query.filter(Annonces.titre.like(f'%{mot_cle}%') | Annonces.description.like(f'%{mot_cle}%'))
          
    if module:
      query = query.filter(Annonces.theme.like(f'%{module}%')) # module in our db is theme
      # query = query.filter_by(theme=module)   # our fild of theme is not enum

    if wilaya and not commune:
      adresse = Adresse.query.filter_by(wilaya=wilaya).first()
      print('-'*100)
      print(adresse)
      if adresse != None :
        adresseId = adresse.id
        query = query.filter_by(adresse=adresseId)


    if commune:
      adresse = Adresse.query.filter_by(commune=commune).first()
      print('-'*100)
      print(adresse)
      if adresse != None :
        adresseId = adresse.id
        query = query.filter_by(adresse=adresseId)


    # if date_debut and date_fin:
    #     query = query.filter(Annonces.date_posted.between(date_debut, date_fin))

    if date_debut: 
            query = query.filter(Annonces.date_posted >= date_debut)

    if date_fin:
        query = query.filter(Annonces.date_posted <= date_fin)

    annonces = query.all()

    result = annonces_schema.dump(annonces)
    return jsonify(result)

    # datetime.datetime.strptime(date_fin, '%Y-%m-%d')



# def get_annonces():
#   all_annonces = Annonces.query.all()
#   result = annonces_schema.dump(all_annonces)
#   return jsonify(result)
