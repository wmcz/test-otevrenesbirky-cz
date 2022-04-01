from requests_html import HTMLSession
session = HTMLSession()

# Vrací odkazy na stránky sbírek
def getCollectionLinks():

    urlRoot = 'http://www.cesonline.cz/arl-ces/cs/vysledky/'
    urlParams = '?field=G&term=&kvant=all&search=Naj%C3%ADt&op=result&guide=&zf=SHORT&sort=TITLE&ascii=0&pg='
    print('Hledám odkazy na sbírky na ' + urlRoot)

    collectionLinks = []
    for rank in range(100):
        urlToExplore = urlRoot + urlParams + str(rank)
        r = session.get(urlToExplore)
        allLinks = list(r.html.links)

        # Posbírá všechny odkazy na dané url adrese
        for link in allLinks:

            # Ověřuje, že se jedná o odkaz na sbírku
            if "detail-ces_us_cat.1" in link and "pg=" not in link:

                # Ověřuje, zda daný odkaz již není na seznamu. Pokud není, tak jej přidá.
                if link not in collectionLinks:
                    collectionLinks.append(link)
                    print(str(len(collectionLinks)) +' ' + link)
                else:
                    continue

    print('Nalezeno ' + str(len(collectionLinks)) + ' odkazů na sbírky')
    return collectionLinks

# Prochází stránky sbírek a získává z nich odkazy na stránky podsbírek
def getSubcollectionLinks(collectionLinks):

    print('Vyhledávám podsbírky napříč: ' + str(len(collectionLinks)) + ' sbírkami')

    subcollectionLinks = []
    counter = 0
    for colLink in collectionLinks:
        r = session.get(colLink)
        counter += 1
        print('Prozkoumávám sbírku ' + str(counter) + ' s url: ' + colLink)
        print('Nalezené podsbírky: ')
        exploredSbElm = r.html.find('.card', first=True)
        allLinks = list(exploredSbElm.links)
        for subcolLink in allLinks:
            if "detail-ces_us_cat" in subcolLink:
                subcollectionLinks.append(subcolLink)
                print('* ' + subcolLink)
        print('---')

    print('Nalezeno ' + str(len(subcollectionLinks)) + ' odkazů na podsbírky')
    return subcollectionLinks

# Získává počty artefaktů pro jednotlivé podsbírky
def getSubollectionData(subcollectionLinks):

    print('Vyhledávám počty artefaktů napříč ' + str(len(subcollectionLinks)) + ' podsbírkami')

    counter = 0
    subcolDataList = []
    for i in range(len(subcollectionLinks)):
        subcolData = []
        r = session.get(subcollectionLinks[i])
        counter += 1
        print('Prozkoumávám podsbírku ' + str(counter) +' s url ' + subcollectionLinks[i])

        # Název sbírky
        collectionNameElm = r.html.find('.card', first=True)
        collectionNameText = collectionNameElm.text
        collectionNameStart = collectionNameText.find('Sbírka') + 7
        if 'Odkaz na www stránky' in collectionNameText:
            collectionNameEnd = collectionNameText.find('Odkaz na www stránky') - 1
        elif 'Území' in collectionNameText:
            collectionNameEnd = collectionNameText.find('Území') - 1
        else:
            collectionNameEnd = collectionNameText.find('Obor') - 1
        collectionName = ''.join(list(collectionNameText)[collectionNameStart:collectionNameEnd])
        subcolData.append(collectionName)

        # Název podsbírky
        subcollectionNameElm = r.html.find('h1', first=True)
        subcollectionNameText = subcollectionNameElm.text
        subcollectionName = subcollectionNameText
        subcolData.append(subcollectionName)

        # Počet artefaktů
        itemsCountElm = r.html.find('.card', first=True)
        itemsCountText = itemsCountElm.text
        itemsCountStart = itemsCountText.find('Počet předmětů') + 15
        if 'Podsbírka obsahuje kulturní památky' in itemsCountText:
            itemsCountEnd = itemsCountText.find('Podsbírka obsahuje kulturní památky') - 1
            itemsCount = ''.join(list(itemsCountText)[itemsCountStart:itemsCountEnd])  # cut all letters before creationDateStart and after creationDateEnd
        elif 'Podsbírka obsahuje archiválie' in itemsCountText:
            itemsCountEnd = itemsCountText.find('Podsbírka obsahuje archiválie') - 1
            itemsCount = ''.join(list(itemsCountText)[itemsCountStart:itemsCountEnd])  # cut all letters before creationDateStart and after creationDateEnd
        else:
            itemsCount = ''.join(list(itemsCountText)[itemsCountStart:])  # cut all letters before creationDateStart and after creationDateEnd
        subcolData.append(int(itemsCount))

        print(subcolData)

        subcolDataList.append(subcolData)

    return subcolDataList

# Sčítá počty artefaktů z podsbírek do nadřazených sbírek
def mergeSubcollectionData(subcollectionData):

    print('Sčítám počty artefaktů napříč ' + str(len(subcollectionData)) + ' podsbírkami')

    artifactsTotal = 0
    colData = []
    for subcollection in subcollectionData:
        artifactsCount = int(subcollection[2])
        artifactsTotal += artifactsCount
        alreadyExists = False
        for collection in colData:
            if subcollection[0] == collection[0]:
                collection[1] += artifactsCount
                alreadyExists = True
                break
        if alreadyExists == False:
            collectionData = [subcollection[0],subcollection[2]]
            colData.append(collectionData)
        print(collectionData)

    print('Celkový počet sbírek: '+ str(len(colData)))
    print('Celkový počet artefaktů: ' + str(artifactsTotal))

    return colData


