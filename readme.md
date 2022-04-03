# Otevřené sbírky
Zpráva o digitalizaci a zpřístupňování kulturního dědictví v České republice

Aplikace má 2 funkce:
1. Stahuje data z centrální evidence sbírek muzejní povahy
2. Vytváří prezentaci dostupnou na https://www.otevrenesbirky.cz/

## Jak přidat data za nový rok

1. [Stáhněte aktuáldní data z CES online](#Stažení-dat-z-CES-online)
1. [Přeneste data z CES do databáze v Google Sheets](#Databáze-v-Google-Sheets)
1. [Nastavte hodnoty pro aktuální rok v configu](#Nastavte-hodnoty-pro-aktuálnír-ok-v-configu)
1. [Upravte statickou šablonu webu](#Upravte-statickou-šablonu-webu)

### Stažení dat z CES online
Centrální evidence sbírek muzejní povahy https://www.cesonline.cz/ obsahuje informace o sbírkách a podsbírkách českých muzeí. Mimo jiné údaje o počtech artefaktů, které se v jednotlivých sbírkách nacházejí.

Pro stažení aktuálního seznamu sbírek a počtů artefaktů spusťte soubor **scrapper/getCesData.py**

### Databáze v Google Sheets
Web využívá jako databázi Google tabulku: https://docs.google.com/spreadsheets/d/18CTrx1m21kPTpIAngnLwrDkI6YAKkTxw5Y781XyLmbo

Data za nový rok přidejte do 3 nových sloupců a pojmenujte je ve formátu Total 20YY, Online 20YY a Open 20YY

### Nastavte hodnoty pro aktuální rok v configu

Nastavte hodnoty pro aktuální rok v **config.yaml** a do proměnných v horní části **app/static/js/scripts.js**

### Upravte statickou šablonu webu
Upravte statickou šablonu webu v **app/templates/base.html**

- Přidejte tlačítko s aktuálním rokem do navigace #switchColYear
- Aktualizujte doprovodné grafy o souhrnná data z nového roku