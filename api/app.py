import os
from flask import Flask
from flask_cors import CORS
from api.config import Config
from api.models import db
from api.routes import api, enviar_alerta_favoritos
from apscheduler.schedulers.background import BackgroundScheduler

app = Flask(__name__)
origins = os.environ.get('CORS_ORIGINS', 'https://navigate-buy-tcc-viniciusvchabariberis-projects.vercel.app')
CORS(app, supports_credentials=True, resources={r"/*": {"origins": origins, "methods": ["GET", "POST", "PUT", "OPTIONS", "DELETE"]}})

scheduler = BackgroundScheduler()

# Configurações do Flask
app.secret_key = os.environ.get('FLASK_SECRET_KEY', 'default_secret_key')
app.config['SESSION_COOKIE_SECURE'] = False  
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'
app.config.from_object(Config)

# Inicializando o SQLAlchemy
db.init_app(app)

# Registrando o blueprint
app.register_blueprint(api, url_prefix='/app')

UPLOAD_FOLDER = os.path.join(app.root_path, 'static/uploads/avatars')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def iniciar_agendador():
    if not scheduler.running:
        scheduler.add_job(enviar_alerta_favoritos, 'cron', day_of_week='fri', hour=15, minute=00)
        scheduler.start()
        print("Agendador iniciado com sucesso")
    else:
        print("Agendador já está em execução")

iniciar_agendador()

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)