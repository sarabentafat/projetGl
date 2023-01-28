import enum
from datetime import datetime
from marshmallow_sqlalchemy import fields
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow 

db = SQLAlchemy()
ma= Marshmallow()


#-----------------------------------------database--------------
class CategoriesEnum(str,enum.Enum):
    primaire = 'primaire'
    lycee = 'lycee'
    college = 'college'
class ModalitesEnum(str,enum.Enum): # i added str inhretance cuz apparently serializing enum is not supported
    offline = 'offline'
    online = 'online'

class Personnes(db.Model): 
    id = db.Column("id",db.String(100),primary_key=True)
    nom = db.Column("nom",db.String(100),nullable =False)
    prenom = db.Column("prenom",db.String(60),nullable=False)
    tel = db.Column("tel",db.String(20),nullable=True)
    email = db.Column("email", db.String(120),unique=True, nullable=False)
    isadmin= db.Column("isadmin", db.Boolean ,default=False )
    adresse = db.Column(db.Integer, db.ForeignKey('adresse.id',),nullable=True)
    annonces = db.relationship('Annonces', backref='personne_annonces',cascade="all,delete")
    comments = db.relationship('Comments',backref='personne_comments',cascade="all,delete")

   
    def __init__(self,id,nom,prenom , email,tel,adresse,isadmin):
        self.id =id
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
  author = db.Column(db.String(100) , db.ForeignKey('personnes.id'), nullable=False)
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
    pers_id = db.Column(db.String(100) , db.ForeignKey('personnes.id'),nullable=True)#update to false
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



