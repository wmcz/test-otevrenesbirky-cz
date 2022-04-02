# Google Sheets API Setup
import gspread
from oauth2client.service_account import ServiceAccountCredentials


# Stáhne data o sbírkách z GoogleSheetu a vrátí strukturovaná data 2 formátováních
# v objektu (collectionDataJson) a v poli (collectionDataList)

def getSheetData(googleKeyPath):

    # Připojuje se k Google Sheetu s daty o sbírkách
    credential = ServiceAccountCredentials.from_json_keyfile_name(googleKeyPath,
                                                                  ["https://spreadsheets.google.com/feeds",
                                                                   "https://www.googleapis.com/auth/spreadsheets",
                                                                   "https://www.googleapis.com/auth/drive.file",
                                                                   "https://www.googleapis.com/auth/drive"])

    client = gspread.authorize(credential)
    gsheet = client.open_by_url('https://docs.google.com/spreadsheets/d/18CTrx1m21kPTpIAngnLwrDkI6YAKkTxw5Y781XyLmbo')
    worksheet = gsheet.get_worksheet(0)
    rawCollectionData = worksheet.get('A1:K')

    # Konvertuje všechna čísla na integer
    collectionDataList = []
    for collection in rawCollectionData:
        newlist = [int(item) if item.isdigit() else item for item in collection]
        collectionDataList.append(newlist)

    # Připravuje Json
    collectionDataJson = []
    for collection in collectionDataList[1:]:
        collectionDataJson.append({'Collection Name': collection[0],
                                   'Catalog Url': collection[1],
                                   'Total 2020': collection[2],
                                   'Online 2020': collection[3],
                                   'Open 2020': collection[4],
                                   'Total 2021': collection[5],
                                   'Online 2021': collection[6],
                                   'Open 2021': collection[7],
                                   'Total 2022': collection[8],
                                   'Online 2022': collection[9],
                                   'Open 2022': collection[10],
                                   })
    return collectionDataJson, collectionDataList


# Volání funkce níže je pouze pro účely testování
# adresa k json klíči se liší z pohledu modulu dataEngine.py a z pohledu routes.py

#getSheetData("../gcpKey.json")
