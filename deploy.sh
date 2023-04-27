#!/bin/bash

set -e

rootdir="`dirname \"$0\"`"
cd $rootdir

git pull --ff-only
touch reload
