from app import app
from flask import render_template, send_file, request
import csv
import os
from app import dataEngine
import yaml

@app.route('/')
def index():
    with open(r'config.yaml') as configFile:
        config = yaml.load(configFile, Loader=yaml.FullLoader)
    collectionDataJson = dataEngine.getSheetData("gcpKey.json", config['gsheetUrl'])[0]
    museumsCount = 0
    totalItems = 0
    onlineItems = 0
    for museum in collectionDataJson:
        if museum[config['currentYearTotalKey']] > 0:
            museumsCount += 1
        totalItems += museum[config['currentYearTotalKey']]
        onlineItems += museum[config['currentYearOnlineKey']]

    return render_template('base.html',
                           currentYear=config['currentYear'],
                           collectionDataJson=collectionDataJson,
                           museumsCount=museumsCount,
                           totalItems=totalItems,
                           onlineItems=onlineItems)

@app.route('/downloaddata')
def downloaddata ():
    path = "static/openCollections.csv"
    full_path = os.path.join('app', path)

    if not os.path.isfile(full_path):
        with open(r'config.yaml') as configFile:
            config = yaml.load(configFile, Loader=yaml.FullLoader)

        collectionDataList = dataEngine.getSheetData("gcpKey.json", config['gsheetUrl'])[1]
        with open(full_path, 'w', newline='') as file:
            writer = csv.writer(file)
            for collection in collectionDataList:
                writer.writerow(collection)

    return send_file(path, as_attachment=True)
