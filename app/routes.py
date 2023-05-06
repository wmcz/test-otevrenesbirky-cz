from app import app
from flask import render_template, send_file, request
import csv
import os
from app import dataEngine
import yaml

@app.route('/')
def index():
    collectionDataJson = dataEngine.getSheetData("gcpKey.json", app.config['gsheetUrl'])[0]
    museumsCount = 0
    totalItems = 0
    onlineItems = 0
    for museum in collectionDataJson:
        if museum[app.config['currentYearTotalKey']] > 0:
            museumsCount += 1
        totalItems += museum[app.config['currentYearTotalKey']]
        onlineItems += museum[app.config['currentYearOnlineKey']]

    return render_template('base.html',
                           currentYear=app.config['currentYear'],
                           collectionDataJson=collectionDataJson,
                           museumsCount=museumsCount,
                           totalItems=totalItems,
                           onlineItems=onlineItems)

@app.route('/downloaddata')
def downloaddata ():
    path = "static/openCollections.csv"
    full_path = os.path.join('app', path)

    if not os.path.isfile(full_path):
        collectionDataList = dataEngine.getSheetData("gcpKey.json", app.config['gsheetUrl'])[1]
        with open(full_path, 'w', newline='') as file:
            writer = csv.writer(file)
            for collection in collectionDataList:
                writer.writerow(collection)

    return send_file(path, as_attachment=True)
