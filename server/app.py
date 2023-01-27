from flask import Flask
import os
#from flask_cors import CORS
from flask_migrate import Migrate
from modals import db,ma
from routes.admin import admin
from routes.annonces import annonces
from routes.auth import auth

#-----------------------app configuration------------------------
app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.app = app
ma.app = app
db.init_app(app=app)
migrate = Migrate(app, db)



if __name__ == "__main__":
  with app.app_context():
    db.create_all()
    app.register_blueprint(auth)
    app.register_blueprint(admin)
    app.register_blueprint(annonces)
    app.run(debug=True)