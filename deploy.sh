#!/bin/bash

set -e

rootdir="`dirname \"$0\"`"
cd $rootdir

source venv/bin/activate
pip install -U -r requirements.txt

git pull --ff-only
touch reload
