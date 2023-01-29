from werkzeug.utils import secure_filename
from config import Config

UPLOAD_FOLDER = Config.UPLOAD_FOLDER
ALLOWED_EXTENSIONS = set(['png','jpg','jpeg','gif'])

def allowed_file(filename) :
    return '.' in filename and filename.rsplit('.',1)[1].lower() in ALLOWED_EXTENSIONS

