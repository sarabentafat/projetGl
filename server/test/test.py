
from flask import Flask, jsonify
from flask_jwt_extended import get_jwt_identity
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from server.models import Annonces, annonce_schema
from server.routes.annonces import get_user_annonces
from sqlalchemy import create_engine, Column, Integer, String,Float,DateTime,Boolean
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import declarative_base
import enum 

Base = declarative_base()
class Annonce(Base):
    __tablename__ = 'annonces'
    annonce_id = Column(Integer, primary_key=True)
    titre = Column(String)
    pers_id = Column(Integer)
    theme = Column(String)
    categorie = Column(String)
    modalite = Column(String)
    adresse = Column(String)
    description = Column(String)
    tarif = Column(Float)
    date_posted = Column(DateTime)
class Personnes(Base): 
    __tablename__ = 'personnes'
    id = Column(String(100),primary_key=True)
    nom = Column(String(100))
    prenom = Column(String(60))
    tel = Column(String(20))
    email = Column(String(120))
    isadmin= Column(Boolean  )
class Photos(Base):
    __tablename__ = 'photos'
    id_photo = Column(Integer,primary_key=True)
    photo = Column(String)
    post = Column(Integer)
class Favorites(Base):
    __tablename__ = 'favorites'
    idFav = Column(Integer, primary_key=True)
    user_id = Column(String(100))
    annonce_id = Column(Integer)
class Comments(Base):
  __tablename__ = 'comments'
  id_comment = Column(Integer,primary_key=True)
  text = Column(String(255))
  date_created = Column(DateTime)
  author = Column(String(100) )
  post_id = Column(Integer )
class Adresse(Base):
    __tablename__ = 'adresse'
    id = Column(Integer, primary_key=True)
    wilaya =Column(String(100))
    commune =Column(String(100))
    lieuExact =Column(String(150))

def test_get_user_annonces():
    app = Flask(__name__)
    engine = create_engine('sqlite:///test.db')
    Base.metadata.create_all(engine)
    Session = sessionmaker(bind=engine)
    session = Session()
    
    
   
    # create a test annonce
    test_annonce = Annonces(pers_id=1, titre="test_title", theme="test_theme", categorie="lycee", 
                           modalite="online", adresse="", description="test_description",tarif=12.6)
    session.add(test_annonce)
    session.commit()
    annonce_schema.jsonify(test_annonce)

    with app.test_request_context('/', headers={'Authorization': 'Bearer test_token'}):
        # mock get_jwt_identity to return 1
        get_jwt_identity = lambda: 1

        response = get_user_annonces()
        assert response.status_code == 200
        assert response.json == {"Annonces": [{"pers_id": 1, "titre": "test_title", "theme": "test_theme", 
                                               "categorie": "lycee", "modalite": "online", 
                                               "adresse": "", "description": "test_description","tarif":12.6}]}