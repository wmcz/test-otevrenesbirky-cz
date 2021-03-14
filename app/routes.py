from app import app
from flask import render_template, send_file, request
import csv
import os

# Google Sheets API Setup
import gspread
from oauth2client.service_account import ServiceAccountCredentials

credential = ServiceAccountCredentials.from_json_keyfile_name("gcpKey.json",
                                                              ["https://spreadsheets.google.com/feeds",
                                                               "https://www.googleapis.com/auth/spreadsheets",
                                                               "https://www.googleapis.com/auth/drive.file",
                                                               "https://www.googleapis.com/auth/drive"])

client = gspread.authorize(credential)
gsheet = client.open_by_url('https://docs.google.com/spreadsheets/d/1rMSSY3so30Y5RDnS_B6kKDP25-9rIBYD-P-bl_rVJ2I')
worksheet = gsheet.get_worksheet(0)
collectionData = worksheet.get('A2:H')


@app.route('/')
def index():
    collectionDataJson = []
    for collection in collectionData:
        collectionDataJson.append({'Collection Name': collection[0],
                                   'Total Items': int(collection[4]),
                                   'Online Items': int(collection[5]),
                                   'Esbirky Url': collection[1],
                                   'Citem Url': collection[2],
                                   'Web Url': collection[3]})
    museumsCount = len(collectionDataJson);
    totalItems = 0
    onlineItems = 0
    for museum in collectionDataJson:
        totalItems += museum['Total Items']
        onlineItems += museum['Online Items']

    return render_template('base.html',
                           collectionDataJson=collectionDataJson,
                           museumsCount=museumsCount,
                           totalItems=totalItems,
                           onlineItems=onlineItems)

@app.route('/downloaddata')
def downloaddata ():
    with open('app/static/openCollections.csv', 'w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(["Collection", "eSbirky url", "CITeM url", "Web url", "Total 2020", "Online 2020", "Total 2021", "Online 2021"])
        for collection in collectionData:
            writer.writerow(collection)
    path = "static/openCollections.csv"
    return send_file(path, as_attachment=True)