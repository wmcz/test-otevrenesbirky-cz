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
    rawCollectionData = worksheet.get('A1:ZZ10000')

    # Konvertuje všechna čísla na integer
    collectionDataList = []
    for collection in rawCollectionData:
        newlist = [int(item) if item.isdigit() else item for item in collection]
        collectionDataList.append(newlist)

    # Připravuje Json
    collectionDataJson = []
    for collection in collectionDataList[1:]:
        collectionItems = {}
        for itemRank in range(len(collection)):
            collectionItems[collectionDataList[0][itemRank]] = collection[itemRank]
        collectionDataJson.append(collectionItems)

    return collectionDataJson, collectionDataList


# Volání funkce níže je pouze pro účely testování
# adresa k json klíči se liší z pohledu modulu dataEngine.py a z pohledu routes.py

# print(getSheetData("../gcpKey.json")[0])
# print(getSheetData("../gcpKey.json")[1])
