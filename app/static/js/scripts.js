/* Drawing chart */

let displayChart = (openArtifactPercent, closedArtifactPercent, totalArtifactCount) => {
  let canvas = document.getElementById('collectionStats');
  let canvasWidth = canvas.offsetWidth;
  let canvasHeight = canvas.offsetHeight;
  console.log('canvas width:'+ canvasWidth);
  console.log('canvas height:'+ canvasHeight);

  let openedItems = openArtifactPercent * (totalArtifactCount / 10000);
  let closedItems = closedArtifactPercent * (totalArtifactCount / 10000);
  let itemsCount = Math.ceil(openedItems + closedItems);
  let rowItemsCount = Math.ceil(Math.sqrt(itemsCount));
  if (rowItemsCount < 5){
    rowItemsCount = 5;
  }else if (rowItemsCount > 50){
    rowItemsCount = 50;
  }
  let columnItemsCount = Math.ceil(Math.sqrt(itemsCount));
  if (columnItemsCount < 5){
    columnItemsCount = 5;
  }else if (columnItemsCount > 50){
    columnItemsCount = 50;
  }
  totalArtifactCount = rowItemsCount * columnItemsCount
  console.log('items count:' + itemsCount);
  console.log('row items count:' + rowItemsCount);
  console.log('column items count:' + columnItemsCount);

  let itemWidth = canvasWidth / rowItemsCount;
  let itemHeight = canvasHeight / columnItemsCount;
  console.log('item width:' + itemWidth);
  console.log('item height:' + itemHeight);

  let result = [];
  /*
  for (i = 0; i < openedItems; i++) {
    result.push(openArtifactElement);
  }
  */
  for (i = 0; i < totalArtifactCount; i++) {
    let animationDelay = Math.random()*6;
    let closedArtifactElement = `<div class='closedArtifact artifactItem' style='width: ${itemWidth}; height: ${itemHeight}; animation-delay: ${animationDelay}s'></div>`;
    console.log(animationDelay);
    result.push(closedArtifactElement);
  }
  canvas.innerHTML = result.join("");
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
window.onresize = countCollectionData;

