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
    collectionDataJson = dataEngine.getSheetData("gcpKey.json")[0]
    museumsCount = 0
    totalItems = 0
    onlineItems = 0
    for museum in collectionDataJson:
        if museum[config['currentYearTotalKey']] > 0:
            museumsCount += 1
        totalItems += museum[config['currentYearTotalKey']]
        onlineItems += museum[config['currentYearOnlineKey']]

    return render_template('base.html',
                           collectionDataJson=collectionDataJson,
                           museumsCount=museumsCount,
                           totalItems=totalItems,
                           onlineItems=onlineItems)

@app.route('/downloaddata')
def downloaddata ():
    collectionDataList = dataEngine.getSheetData("gcpKey.json")[1]
    with open('app/static/openCollections.csv', 'w', newline='') as file:
        writer = csv.writer(file)
        for collection in collectionDataList:
            writer.writerow(collection)
    path = "static/openCollections.csv"
    return send_file(path, as_attachment=True)
