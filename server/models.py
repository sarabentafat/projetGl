import enum
from datetime import datetime
from marshmallow_sqlalchemy import fields
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow 

db = SQLAlchemy()
ma= Marshmallow()


from flask import Blueprint
modals_bp = Blueprint('models', __name__)








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
    # googleId = db.Column("googleId",db.Integer,primary_key=True)
    prenom = db.Column("prenom",db.String(60),nullable=False)
    tel = db.Column("tel",db.String(20),nullable=True)
    email = db.Column("email", db.String(120),unique=True, nullable=False)
    isadmin= db.Column("isadmin", db.Boolean ,default=False )
    annonces = db.relationship('Annonces', backref='personne_annonces',cascade="all,delete")
    comments = db.relationship('Comments',backref='personne_comments',cascade="all,delete")
    favorites = db.relationship('Favorites', backref='personne_favorites',cascade="all,delete")
   
    def __init__(self,id,nom,prenom , email,tel,isadmin):
        self.id = id
        self.nom = nom
        self.email=email
        self.prenom=prenom
        self.tel = tel
        self.isadmin = isadmin


class Comments(db.Model):
  id_comment = db.Column(db.Integer,primary_key=True)
  text = db.Column(db.String(255),nullable=False)
  date_created = db.Column(db.DateTime,default=datetime.utcnow)
  author = db.Column(db.String(100) , db.ForeignKey('personnes.id'), nullable=False)
  post_id = db.Column(db.Integer , db.ForeignKey('annonces.annonce_id'), nullable=False)
  def __init__(self,text,author,post_id):
        self.text=text
        self.author = author
        self.post_id = post_id


class Adresse(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    wilaya =db.Column("wilaya",db.String(100),nullable=False)
    commune =db.Column("commune",db.String(100),nullable=False)
    lieuExact =db.Column("lieuExact",db.String(150),nullable=False) #adressebienimmo
    annonces = db.relationship('Annonces', uselist=False,backref="adresse_annonce",cascade="all,delete")
    # personnes = db.relationship("Personnes", uselist=False, backref="adresse_personne",cascade="all,delete") #useList for one to one rel
    
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
    date_posted = db.Column(db.DateTime,default=datetime.utcnow)
    pers_id = db.Column(db.String(100), db.ForeignKey('personnes.id'),nullable=True)#update to false
    adresse = db.Column(db.Integer, db.ForeignKey('adresse.id'),nullable=True)#update to false
    comments = db.relationship('Comments',backref='annonces_comments',cascade="all,delete")
    photos = db.relationship('Photos',backref='annonces_photos',cascade="all,delete")
    favorites = db.relationship('Favorites', backref='annonce_favorites',cascade="all,delete")

    def __init__(self,titre,theme,description,tarif,modalite,categorie,adresse,pers_id):
        self.titre=titre
        self.theme=theme
        self.description = description
        self.tarif=tarif
        self.modalite=modalite 
        self.categorie =categorie
        self.adresse = adresse
        self.pers_id = pers_id
        


class Favorites(db.Model):
    idFav = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(100), db.ForeignKey('personnes.id'))
    annonce_id = db.Column(db.Integer, db.ForeignKey('annonces.annonce_id'))
    def __init__(self,user_id,annonce_id):
      self.user_id = user_id
      self.annonce_id=annonce_id





class Photos(db.Model):
    id_photo = db.Column(db.Integer,primary_key=True)
    photo = db.Column("photo",db.String)
    post = db.Column(db.Integer, db.ForeignKey('annonces.annonce_id'),nullable=False)

    def __init__(self,photo,post):
        self.photo=photo
        self.post = post



#-------------------------------------database schemas-----------
        
class CommentSchema(ma.SQLAlchemyAutoSchema):
  class Meta :
    model = Comments
    include_relationships = True
    sqla_session = db.session
    include_fk = True
comment_schema = CommentSchema()
comments_schema = CommentSchema(many=True)


class AdresseSchema(ma.SQLAlchemyAutoSchema):
  class Meta : 
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
  photos  = ma.Nested(PhotoSchema,many=True)
  adresse_annonce = ma.Nested(AdresseSchema)
  class Meta:
    model=Annonces
    load_instance = True
    sqla_session = db.session
    include_relationships = True
    include_fk=True
annonce_schema = AnnonceSchema()
annonces_schema = AnnonceSchema(many=True)
class UserSchema(ma.SQLAlchemyAutoSchema):
  class Meta:
    model= Personnes
    load_instance = True
    sqla_session = db.session
    include_fk=True
    
    #annonces = fields.Nested(annonce_schema, many=True)

user_schema = UserSchema()
users_schema = UserSchema(many=True)
class FavoriteSchema(ma.SQLAlchemyAutoSchema):
    # personne_favorites = ma.Nested(UserSchema)
    annonce_favorites = ma.Nested(AnnonceSchema)
    class Meta:
        model = Favorites
        include_relationships = True
        sqla_session = db.session
        load_instance = True

favorite_schema = FavoriteSchema()
favorites_schema = FavoriteSchema(many=True)


