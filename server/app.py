
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy 
from flask_marshmallow import Marshmallow 
import os
import enum
from datetime import datetime

from marshmallow_sqlalchemy import fields_for_model




app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))





app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db=SQLAlchemy(app)
ma = Marshmallow(app)

if __name__ =="__main__":
    db.create_all()
    app.run(debug=True)


class CategoriesEnum(str,enum.Enum):
    primaire = 'primaire'
    lycee = 'lycee'
    college = 'college'
class ModalitesEnum(str,enum.Enum): # i added str inhretance cuz apparently serializing enum is not supported
    offline = 'offline'
    online = 'online'

class Personnes(db.Model): 
    id = db.Column("id",db.Integer,primary_key=True)
    nom = db.Column("nom",db.String(100))
    prenom = db.Column("prenom",db.String(60))
    email = db.Column("email", db.String(120),unique=True, nullable=False)
    adresse = db.Column(db.Integer, db.ForeignKey('adresse.id'))
    annonces = db.relationship('Annonces', backref='personne_annonces')
    photos = db.relationship('Photos', backref='personne_photos')
   
    def __init__(self,nom,prenom , email,adresse):
        self.nom = nom
        self.email=email
        self.prenom=prenom
        self.adresse = adresse


class Annonces(db.Model): 
    annonce_id = db.Column("id",db.Integer,primary_key=True)
    description = db.Column("description",db.Text)
    tarif = db.Column("prenom",db.Float)
    theme = db.Column("theme",db.String(100))
    modalite = db.Column(db.Enum(ModalitesEnum))
    categorie = db.Column(db.Enum(CategoriesEnum))
    pers_id = db.Column(db.Integer, db.ForeignKey('personnes.id'))
    favorite = db.Column("favorite", db.Boolean ,default=False, nullable=True )
    date_posted = db.Column(db.DateTime,default=datetime.utcnow)
    adresse = db.Column(db.Integer, db.ForeignKey('adresse.id'))
    

    def __init__(self,theme,description,tarif,modalite,categorie,favorite,adresse):
        self.theme=theme
        self.description = description
        self.tarif=tarif
        self.modalite=modalite 
        self.categorie =categorie
        self.favorite =favorite
        self.adresse = adresse







class Photos(db.Model):
    id_photo = db.Column(db.Integer,primary_key=True)
    photo = db.Column("photo",db.String)
    personne_id = db.Column(db.Integer, db.ForeignKey('personnes.id'))

    def __init__(self,photo):
        self.photo=photo




class Adresse(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    wilaya =db.Column("wilaya",db.String(100))
    commune =db.Column("commune",db.String(100))
    lieuExact =db.Column("lieuExact",db.String(150)) 
    annonces = db.relationship('Annonces', backref="adresse_annonce")
    personnes = db.relationship("Personnes", uselist=False, backref="adresse_personne") #useList for one to one rela
    
    def __init__(self,wilaya,commune,lieuExact):
        
        self.wilaya=wilaya
        self.commune = commune
        self.lieuExact = lieuExact



#Annonce schema
class AnnonceSchema(ma.Schema):
  class Meta:
    
    fields = ("date_posted","pers_id","annonce_id", "theme", "description","tarif","categorie","modalite","favorite","adresse")
    
   

annonce_schema = AnnonceSchema()
annonces_schema = AnnonceSchema(many=True)








@app.route('/annonces', methods=['POST'])
def add_annonce():

  theme = request.json.get('theme', '')
  description = request.json.get('decription', '')
  tarif = request.json.get('tarif', '')
  modalite = request.json.get('modalite', '')
  categorie= request.json.get('categorie', '')
  favorite= request.json.get('favorite', '')
  adresse= request.json.get('adresse', '')
 
  #description isn't registred in db after post meth!

  new_annonce = Annonces(theme=theme, description=description, tarif=tarif,modalite=modalite,categorie=categorie,favorite=favorite,adresse=adresse)

  db.session.add(new_annonce)
  db.session.commit()

  return annonce_schema.jsonify(new_annonce)

@app.route('/annonces', methods=['GET'])
def get_annonces():
  all_annonces = Annonces.query.all()
  result = annonces_schema.dump(all_annonces)
  return jsonify(result)


@app.route('/annonce/<annonce_id>', methods=['GET'])
def get_annonce(annonce_id):
  annonce = Annonces.query.get(annonce_id)
  return annonce_schema.jsonify(annonce)

#update
@app.route('/annonce/<id>', methods=['PUT'])
def update_annonce(id):
  annonce = Annonces.query.get(id)

  theme = request.json['theme']
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
 

  db.session.commit()

  return annonce_schema.jsonify(annonce)

@app.route('/annonce/<annonce_id>', methods=['DELETE'])
def delete_annonce(annonce_id):
  annonce =Annonces.query.get(annonce_id)
  db.session.delete(annonce)
  db.session.commit()

  return annonce_schema.jsonify(annonce)

    #annonces = Annonces.query.order_by(Annonces.date_posted.desc()).all()


    #annonce = Annonces.query.filter_by(id=annonce_id).one()

    

 


