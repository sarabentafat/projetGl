from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy 
from flask_marshmallow import Marshmallow 
import os
#from flask_cors import CORS
from flask_migrate import Migrate
import enum
from datetime import datetime
from marshmallow_sqlalchemy import fields



#-----------------------app configuration------------------------
app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db=SQLAlchemy(app)
ma = Marshmallow(app)
migrate = Migrate(app, db)




#-----------------------------------------database--------------
class CategoriesEnum(str,enum.Enum):
    primaire = 'primaire'
    lycee = 'lycee'
    college = 'college'
class ModalitesEnum(str,enum.Enum): # i added str inhretance cuz apparently serializing enum is not supported
    offline = 'offline'
    online = 'online'

class Personnes(db.Model): 
    id = db.Column("id",db.Integer,primary_key=True)
    nom = db.Column("nom",db.String(100),nullable =False)
    prenom = db.Column("prenom",db.String(60),nullable=False)
    tel = db.Column("tel",db.String(20),nullable=True)
    email = db.Column("email", db.String(120),unique=True, nullable=False)
    isadmin= db.Column("isadmin", db.Boolean ,default=False )
    adresse = db.Column(db.Integer, db.ForeignKey('adresse.id',),nullable=False)
    annonces = db.relationship('Annonces', backref='personne_annonces',cascade="all,delete")
    comments = db.relationship('Comments',backref='personne_comments',cascade="all,delete")
   
    def __init__(self,nom,prenom , email,tel,adresse,isadmin):
        self.nom = nom
        self.email=email
        self.prenom=prenom
        self.adresse = adresse
        self.tel = tel
        self.isadmin = isadmin


class Comments(db.Model):
  id_comment = db.Column(db.Integer,primary_key=True)
  text = db.Column(db.String(255),nullable=False)
  date_created = db.Column(db.DateTime,default=datetime.utcnow)
  author = db.Column(db.Integer , db.ForeignKey('personnes.id'), nullable=False)
  post_id = db.Column(db.Integer , db.ForeignKey('annonces.annonce_id'), nullable=False)
  def __init__(self,text):
        self.text=text
class Adresse(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    wilaya =db.Column("wilaya",db.String(100),nullable=False)
    commune =db.Column("commune",db.String(100),nullable=False)
    lieuExact =db.Column("lieuExact",db.String(150),nullable=False) 
    annonces = db.relationship('Annonces', uselist=False,backref="adresse_annonce",cascade="all,delete")
    personnes = db.relationship("Personnes", uselist=False, backref="adresse_personne",cascade="all,delete") #useList for one to one rel
    
    def __init__(self,wilaya,commune,lieuExact):
        
        self.wilaya=wilaya
        self.commune = commune
        self.lieuExact = lieuExact



class Annonces(db.Model): 
    annonce_id = db.Column("annonce_id",db.Integer,primary_key=True)
    description = db.Column("description",db.String(500),nullable=False)
    tarif = db.Column("tarif",db.Float,nullable=False)
    theme = db.Column("theme",db.String(100),nullable=False)
    titre = db.Column("titre",db.String(100),nullable=False)
    modalite = db.Column(db.Enum(ModalitesEnum),nullable=False)
    categorie = db.Column(db.Enum(CategoriesEnum),nullable=False)
    favorite = db.Column("favorite", db.Boolean ,default=False, nullable=True )
    date_posted = db.Column(db.DateTime,default=datetime.utcnow)
    pers_id = db.Column(db.Integer, db.ForeignKey('personnes.id'),nullable=True)#update to false
    adresse = db.Column(db.Integer, db.ForeignKey('adresse.id'),nullable=True)#update to false
    comments = db.relationship('Comments',backref='annonces_comments',cascade="all,delete")
    photos = db.relationship('Photos',backref='annonces_photos',cascade="all,delete")
    

    def __init__(self,titre,theme,description,tarif,modalite,categorie,favorite,adresse,pers_id):
        self.titre=titre
        self.theme=theme
        self.description = description
        self.tarif=tarif
        self.modalite=modalite 
        self.categorie =categorie
        self.favorite =favorite
        self.adresse = adresse
        self.pers_id = pers_id







class Photos(db.Model):
    id_photo = db.Column(db.Integer,primary_key=True)
    photo = db.Column("photo",db.String)
    post = db.Column(db.Integer, db.ForeignKey('annonces.annonce_id'),nullable=False)

    def __init__(self,photo):
        self.photo=photo







#-------------------------------------database schemas-----------
        
class CommentSchema(ma.SQLAlchemyAutoSchema):
  model = Comments
  include_relationships = True
  sqla_session = db.session
  include_fk = True
comment_schema = CommentSchema()
Comments_schema = CommentSchema(many=True)
class AdresseSchema(ma.SQLAlchemyAutoSchema):
  model= Adresse
  include_relationships = True
  sqla_session = db.session
  include_fk = True
adresse_schema = AdresseSchema()

class PhotoSchema(ma.SQLAlchemyAutoSchema):
  class Meta : 
    model = Photos
    include_relationships = True
    sqla_session = db.session
    include_fk = True
photo_schema = PhotoSchema()
photos_schema = PhotoSchema(many=True)
class AnnonceSchema(ma.SQLAlchemyAutoSchema):
  class Meta:
    model=Annonces
    load_instance = True
    sqla_session = db.session
    include_fk=True
annonce_schema = AnnonceSchema()
annonces_schema = AnnonceSchema(many=True)
class UserSchema(ma.SQLAlchemyAutoSchema):
  class Meta:
    model= Personnes
    load_instance = True
    sqla_session = db.session
    
    #annonces = fields.Nested(annonce_schema, many=True)

user_schema = UserSchema()
users_schema = UserSchema(many=True)






#------------------------functions----------------


@app.route('/annonces', methods=['POST'])
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
@app.route('/annonces', methods=['GET'])
def get_annonces():
  all_annonces = Annonces.query.all()
  result = annonces_schema.dump(all_annonces)
  return jsonify(result)


#get annonce by id
@app.route('/annonces/<annonce_id>', methods=['GET'])
def get_annonce(annonce_id):
  annonce = Annonces.query.get(annonce_id)
  return annonce_schema.jsonify(annonce)



#update
@app.route('/annonces/<id>', methods=['PUT'])
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
@app.route('/annonces/<annonce_id>', methods=['DELETE'])
def delete_annonce(annonce_id):
  annonce =Annonces.query.get(annonce_id)
  db.session.delete(annonce)
  db.session.commit()

  return annonce_schema.jsonify(annonce)

    #annonces = Annonces.query.order_by(Annonces.date_posted.desc()).all()


    #annonce = Annonces.query.filter_by(id=annonce_id).one()

#all favorite announces 
@app.route('/annonces/favorites',methods=['GET'])
def get_fav_annonces():
  favorite_annonces=  Annonces.query.filter(Annonces.favorite==True).all()
  result = annonces_schema.dump(favorite_annonces)
  return jsonify(result)

""" #fav annonces by user
@app.route('/users/<id>/favorites',methods=['GET'])
def get_fav_annonces():
  favorite_annonces=  Annonces.query.filter(Annonces.favorite==True).all()
  result = annonces_schema.dump(favorite_annonces)
  return jsonify(result)"""





#add a user
@app.route('/users',methods=['POST'])
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
@app.route('/users', methods=['GET'])
def get_users():
  all_users = Personnes.query.all()
  result = users_schema.dump(all_users)
  return jsonify(result)



#delete a user 
@app.route('/users/<id>', methods=['DELETE'])
def delete_user(id):
  user =Personnes.query.get(id)
  db.session.delete(user)
  db.session.commit()

  return user_schema.jsonify(user)

#get a user by id
@app.route('/users/<id>', methods=['GET'])
def get_user(id):
  user = Personnes.query.get(id)
  return user_schema.jsonify(user)



if __name__ == "__main__":
   with app.app_context():
    db.create_all()
    app.run(debug=True)