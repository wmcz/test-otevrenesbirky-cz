from flask import Flask
from flask_caching import Cache

import os
import yaml

app = Flask(__name__)

# Load the default config. Then apply config.local.yaml on top of it.
# config.local.yaml is not in git. Use it for machine-specific settings.
with open(r'config.yaml') as configFile:
    app.config.update(yaml.safe_load(configFile))

if os.path.isfile(r'config.local.yaml'):
    with open(r'config.local.yaml') as localConfigFile:
        app.config.update(yaml.safe_load(localConfigFile) or {})

cache = Cache(app)

from app import context_processor, routes, logger
