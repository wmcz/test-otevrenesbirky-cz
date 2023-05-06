from flask import Flask
from flask_caching import Cache

import yaml

app = Flask(__name__)

with open(r'config.yaml') as configFile:
    app.config.update(yaml.safe_load(configFile))

cache = Cache(app)

from app import context_processor, routes, logger
