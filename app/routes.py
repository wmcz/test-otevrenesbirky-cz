from app import app
from flask import render_template, jsonify, request, abort
import os

# Google Sheets API Setup
import gspread
from oauth2client.service_account import ServiceAccountCredentials

credential = ServiceAccountCredentials.from_json_keyfile_name("gcpKey.json",
                                                              ["https://spreadsheets.google.com/feeds",
                                                               "https://www.googleapis.com/auth/spreadsheets",
                                                               "https://www.googleapis.com/auth/drive.file",
                                                               "https://www.googleapis.com/auth/drive"])


@app.route('/')
def hello_world():
    client = gspread.authorize(credential)
    gsheet = client.open_by_url('https://docs.google.com/spreadsheets/d/1rMSSY3so30Y5RDnS_B6kKDP25-9rIBYD-P-bl_rVJ2I')
    worksheet = gsheet.get_worksheet(0)
    records = worksheet.get('A2:H')
    print(records)
    return render_template('base.html',
                           records=records)
