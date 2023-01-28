from flask import Flask
import os
from flask_cors import CORS
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from models import db,ma,modals_bp
from routes.admin import admin
from routes.annonces import annonces
from routes.auth import auth,oauth
from routes.favorites import favorites
from config import DevConfig



#-----------------------app configuration------------------------
app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))
app.config.from_object(DevConfig)
JWTManager(app)  #  will get the SECKRET_KEY from DevConfig


db.app = app
ma.app = app
db.init_app(app)
ma.init_app(app)
db.init_app(app=app)

migrate = Migrate(app, db)
CORS(app)


if __name__ == "__main__":
  with app.app_context():
    #! create db
    db.create_all() 
    oauth.init_app(app)
    #! setup routes
    app.register_blueprint(modals_bp)
    app.register_blueprint(auth)
    app.register_blueprint(favorites)
    app.register_blueprint(admin)
    app.register_blueprint(annonces)

    #! run 
    app.run()