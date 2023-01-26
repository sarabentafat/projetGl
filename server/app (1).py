
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy 
from flask_marshmallow import Marshmallow 
import os
import enum
from datetime import datetime
from marshmallow_enum import EnumField



app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))





app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db=SQLAlchemy(app)
ma = Marshmallow(app)
def app_context():
    with app.app_context():
        yield
if __name__ =="__main__":
    db.create_all()
    app.run(debug=True)


class CategoriesEnum(enum.Enum):
    primaire = 'primaire'
    lycee = 'lycee'
    college = 'college'
class ModalitesEnum(enum.Enum):
    offline = 'offline'
    online = 'online'
    
class Personnes(db.Model): 
    id = db.Column("id",db.Integer,primary_key=True)
    nom = db.Column("nom",db.String(100))
    prenom = db.Column("prenom",db.String(60))
    email = db.Column("email", db.String(120),unique=True, nullable=False)
    adresse = db.Column(db.Integer, db.ForeignKey('adresse.id'))
    annonces = db.relationship('Annonces', backref='personne')
    photos = db.relationship('Photos', backref='personne')
   
    def __init__(self,nom,prenom , email,adresse):
        self.nom = nom
        self.email=email
        self.prenom=prenom
        self.adresse = Adresse


class Annonces(db.Model): 
    annonce_id = db.Column("id",db.Integer,primary_key=True)
    description = db.Column("nom",db.Text)
    tarif = db.Column("prenom",db.Float)
    theme = db.Column("theme",db.String(100))
    modalite = db.Column(db.Enum(ModalitesEnum))
    categorie = db.Column(db.Enum(CategoriesEnum))
    pers_id = db.Column(db.Integer, db.ForeignKey('personnes.id'))
    favorite = db.Column("favorite", db.Boolean ,default=False, nullable=True )
    date_posted = db.Column(db.DateTime,default=datetime.utcnow)
    

    def __init__(self,theme,description,tarif,modalite,categorie,favorite):
        self.theme=theme
        self.description = description
        self.tarif=tarif
        self.modalite=modalite 
        self.categorie =categorie
        self.favorite =favorite




class Adresse(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    wilaya =db.Column("wilaya",db.String(100))
    commune =db.Column("commune",db.String(100))
    lieuExact =db.Column("lieuExact",db.String(150)) 
    personnes = db.relationship('Personnes', backref='adresse')
    
    def __init__(self,wilaya,commune,lieuExact):
        
        self.wilaya=wilaya
        self.commune = commune
        self.lieuExact = lieuExact


class Photos(db.Model):
    id_photo = db.Column(db.Integer,primary_key=True)
    photo = db.Column("photo",db.String)
    personne_id = db.Column(db.Integer, db.ForeignKey('personnes.id'))

    def __init__(self,photo):
        self.photo=photo







#Annonce schema
class AnnonceSchema(ma.Schema):
  class Meta:
    categorie= EnumField(CategoriesEnum)
    modalite= EnumField(ModalitesEnum)
    fields = ("date_posted","pers_id","annonce_id", "theme", "description","tarif","categorie","modalite","favorite")
    
   

annonce_schema = AnnonceSchema()
annonces_schema = AnnonceSchema(many=True)








@app.route('/annonces', methods=['POST'])
def add_annonce():

  theme = request.json['theme']
  description = request.json['description']
  tarif = request.json['tarif']
  modalite = request.json['modalite']
  categorie= request.json['categorie']
  favorite= request.json['favorite']
 
  #new_annonce.categorie = CategoriesEnum.lycee

  new_annonce = Annonces(theme, description, tarif,modalite,categorie,favorite)

  db.session.add(new_annonce)
  db.session.commit()

  return annonce_schema.jsonify(new_annonce)

@app.route('/annonces', methods=['GET'])
def get_annonces():
  all_annonces = Annonces.query.all()
  result = annonces_schema.dump(all_annonces)
  return jsonify(result.data)


@app.route('/annonce/<id>', methods=['GET'])
def get_annonce(annonce_id):
  annonce = Annonces.query.get(annonce_id)
  return annonce_schema.jsonify(annonce)

# Update a Product
@app.route('/annonce/<id>', methods=['PUT'])
def update_annonce(id):
  annonce = Annonces.query.get(id)

  theme = request.json['theme']
  description = request.json['description']
  tarif = request.json['tarif']
  modalite = request.json['modalite']
  categorie= request.json['categorie']
  favorite= request.json['categorie']

  annonce.theme= theme
  annonce.description = description
  annonce.tarif = tarif 
  annonce.modalite =modalite
  annonce.categorie= categorie 
  annonce.favorite= favorite
 

  db.session.commit()

  return annonce_schema.jsonify(annonce)

@app.route('/annonce/<id>', methods=['DELETE'])
def delete_annonce(id):
  annonce =Annonces.query.get(id)
  db.session.delete(annonce)
  db.session.commit()

  return annonce_schema.jsonify(annonce)

    #annonces = Annonces.query.order_by(Annonces.date_posted.desc()).all()


    #annonce = Annonces.query.filter_by(id=annonce_id).one()

    

 

  
    

