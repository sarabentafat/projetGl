from flask import Blueprint ,request,jsonify
from modals import annonce_schema,Annonces,annonces_schema,db


annonces = Blueprint('annonces',__name__,url_prefix='/annonces')

@annonces.route('/', methods=['POST'])
def add_annonce():
  theme = request.json.get('theme', '')
  description = request.json.get('decription', '')
  tarif = request.json.get('tarif', '')
  modalite = request.json.get('modalite', '')
  categorie= request.json.get('categorie', '')
  favorite= request.json.get('favorite', '')
  adresse= request.json.get('adresse', '')
  titre= request.json.get('titre', '')
  pers_id = request.json.get('pers_id','')
  new_annonce = Annonces(titre=titre,theme=theme, description=description, tarif=tarif,modalite=modalite,categorie=categorie,favorite=favorite,adresse=adresse,pers_id=pers_id)

  db.session.add(new_annonce)
  db.session.commit()

  return annonce_schema.jsonify(new_annonce)


#get all annonces
@annonces.route('/', methods=['GET'])
def get_annonces():
  all_annonces = Annonces.query.all()
  result = annonces_schema.dump(all_annonces)
  return jsonify(result)


#get annonce by id
@annonces.route('/<annonce_id>', methods=['GET'])
def get_annonce(annonce_id):
  annonce = Annonces.query.get(annonce_id)
  return annonce_schema.jsonify(annonce)



#update
@annonces.route('/<id>', methods=['PUT'])
def update_annonce(id):
  annonce = Annonces.query.get(id)

  theme = request.json['theme']
  titre = request.json['titre']
  description = request.json['description']
  tarif = request.json['tarif']
  modalite = request.json['modalite']
  categorie= request.json['categorie']
  favorite= request.json['categorie']
  adresse= request.json['adresse']

  annonce.theme= theme
  annonce.description = description
  annonce.tarif = tarif 
  annonce.modalite =modalite
  annonce.categorie= categorie 
  annonce.favorite= favorite
  annonce.adresse = adresse
  annonce.titre = titre
 

  db.session.commit()

  return annonce_schema.jsonify(annonce)


#deletes an announce
@annonces.route('/<annonce_id>', methods=['DELETE'])
def delete_annonce(annonce_id):
  annonce =Annonces.query.get(annonce_id)
  db.session.delete(annonce)
  db.session.commit()

  return annonce_schema.jsonify(annonce)

    #annonces = Annonces.query.order_by(Annonces.date_posted.desc()).all()


    #annonce = Annonces.query.filter_by(id=annonce_id).one()

#all favorite announces 
@annonces.route('/favorites',methods=['GET'])
def get_fav_annonces():
  favorite_annonces=  Annonces.query.filter(Annonces.favorite==True).all()
  result = annonces_schema.dump(favorite_annonces)
  return jsonify(result)

""" #fav annonces by user
@annonces.route('/users/<id>/favorites',methods=['GET'])
def get_fav_annonces():
  favorite_annonces=  Annonces.query.filter(Annonces.favorite==True).all()
  result = annonces_schema.dump(favorite_annonces)
  return jsonify(result)"""


