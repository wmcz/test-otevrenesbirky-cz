import cesScrapper
import csv

colLinks = cesScrapper.getCollectionLinks()
subcolLinks = cesScrapper.getSubcollectionLinks(colLinks)
subcolData = cesScrapper.getSubollectionData(subcolLinks)
colData = cesScrapper.mergeSubcollectionData(subcolData)

# csv export
fileName = 'csvExport/cesData.csv'
with open(fileName, 'w', newline='', encoding='UTF8') as file:
    writer = csv.writer(file, delimiter=';')
    for collection in colData:
        writer.writerow(collection)

print('Stažená data najdete uložená v souboru ' + fileName)