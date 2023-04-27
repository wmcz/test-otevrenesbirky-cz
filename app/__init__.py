from flask import Flask

app = Flask(__name__)

from app import context_processor, routes
