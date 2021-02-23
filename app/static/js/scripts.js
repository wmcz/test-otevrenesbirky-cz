/* Drawing chart */

let displayChart = (openArtifactPercent, closedArtifactPercent, totalArtifactCount) => {
  let openArtifactElement = "<div class='openArtifact'></div>";
  let closedArtifactElement = "<div class='closedArtifact'></div>";
  let openedItems = Math.ceil(openArtifactPercent * (totalArtifactCount / 10000))
  let closedItems = Math.ceil(closedArtifactPercent * (totalArtifactCount / 10000))
  let result = [];
  for (i = 0; i < openedItems; i++) {
    result.push(openArtifactElement);
  }
  for (i = 0; i < closedItems; i++) {
    result.push(closedArtifactElement);
  }
  document.getElementById('collectionStats').innerHTML = result.join("");
}

/* Receiving data from select and preparing collection stats*/

let countCollectionData = () => {
  let collectionValuesStr = document.getElementById("collectionSelect");
  let collectionValues = collectionValuesStr.value.split(",");
  let totalArtifactCount = parseInt(collectionValues[0]);
  let openArtifactCount = parseInt(collectionValues[1]);
  let closedArtifactCount = totalArtifactCount - openArtifactCount;
  let openArtifactPercent = openArtifactCount / totalArtifactCount * 100;
  let closedArtifactPercent = closedArtifactCount / totalArtifactCount * 100;

  console.log('Total: '+ totalArtifactCount)
  console.log('Open: '+ openArtifactCount + ', '+ openArtifactPercent + '%')
  console.log('Closed: '+ closedArtifactCount + ', '+ closedArtifactPercent + '%')

  displayChart(openArtifactPercent, closedArtifactPercent, totalArtifactCount);
}

/* Default load */
window.onload = countCollectionData;

