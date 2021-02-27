

let displayChart = () => {
  let canvas = document.getElementById('collectionStats');
  let canvasWidth = canvas.offsetWidth;
  let canvasHeight = canvas.offsetHeight;

  let htmlResult = [];
  for (collection = 0; collection < collectionData.length ; collection++) {
    let positionLeft = Math.ceil(Math.random()*canvasWidth);
    let positionTop = Math.ceil(Math.random()*canvasHeight);
    let totalItems = collectionData[collection]['Total Items'];
    let onlineItems = collectionData[collection]['Online Items'];
    let totalSize = Math.ceil(Math.sqrt(totalItems/1000))
    let onlineSize = Math.ceil(Math.sqrt(onlineItems/1000))

    let collectionItem;
    collectionItem = `<div class='openArtifact artifactItem offlineItem' style='transform: scale(${totalSize},${totalSize}); left: ${positionLeft}px; top: ${positionTop}px;'></div>`;
    htmlResult.push(collectionItem);

    let onlineItem;
    onlineItem = `<div class='openArtifact artifactItem onlineItem' style='transform: scale(${onlineSize},${onlineSize}); left: ${positionLeft}px; top: ${positionTop}px;'></div>`;
    htmlResult.push(onlineItem);

  }
  canvas.innerHTML = htmlResult.join("");
}

/* Reveal Intro Titles */

const addClassToId = (elementId,newClass,revealStart,revealEnd) =>{
  const element = document.getElementById(elementId);
  if(wheelPath >= revealStart && wheelPath < revealEnd){
    element.classList.add(newClass);
    element.classList.remove("hidden");
  }else if(wheelPath > revealEnd){
    element.classList.remove(newClass);
    element.classList.add("hidden");
  }else {
    element.classList.remove(newClass);
  }
}

const addClassToClass = (elementClass,newClass,revealStart,revealEnd) =>{
  let elements = document.getElementsByClassName(elementClass);
  for (let i = 0; i < elements.length; i++) {
    if(wheelPath >= revealStart && wheelPath < revealEnd){
      elements[i].classList.add(newClass);
      elements[i].classList.remove("hidden");
    }else if(wheelPath > revealEnd){
      elements[i].classList.remove(newClass);
      elements[i].classList.add("hidden");
    }else{
      elements[i].classList.remove(newClass);
    }
  }
}


let wheelPath = 0;
let revealObject = (event) => {
  if (event.deltaY < 0) {
    // Zoom in
    wheelPath += event.deltaY * 2;
  }
  else {
    // Zoom out
    wheelPath -= event.deltaY * -2;
  }
  // Restrict wheelPath
  wheelPath = Math.min(Math.max(0, wheelPath), 100000);

  addClassToId('introScreen1','revealTitle',0,2000);
  addClassToId('collectionStats','revealOfflineCount',0,2000);
  addClassToId('introScreen2','revealTitle',2000,4000);
  addClassToId('collectionStats','revealOfflineSize',2000,4000);
  addClassToId('collectionStats','revealOnlineSize',4000,8000);
  addClassToId('introScreen3','revealTitle', 4000,6000);
  addClassToId('introScreen4','revealTitle',6000,8000);
  addClassToId('collectionStats','hideOfflineCollections',6000,8000);
}


/* Default load */
window.onwheel = revealObject;
window.onload = function(){
  displayChart();
  /* It is necessary for adding classes immediately after loading (and before scrolling) */
  addClassToId('introScreen1','revealTitle',0,2000);
  addClassToId('collectionStats','revealOfflineCount',0,2000);
}
window.onresize = displayChart;









