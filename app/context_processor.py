from app import app
import os

@app.context_processor
def inject_variables():
    return {
        'isProduction': os.environ.get('OTEVRENESBIRKY_PRODUCTION', 'false').lower() == 'true'
    }
