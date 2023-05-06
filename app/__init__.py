from flask import Flask

import yaml

app = Flask(__name__)

with open(r'config.yaml') as configFile:
    app.config.update(yaml.safe_load(configFile))

from app import context_processor, routes, logger
