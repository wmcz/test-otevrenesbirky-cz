// number with spaces

function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// section fade in

function debounce(fn, ms) {
  var time = null;
  return function () {
    var a = arguments, t = this;
    clearTimeout(time);
    time = setTimeout(function () {
      fn.apply(t, a);
    }, ms);
  }
}

function throttle(fn, ms) {
  var time, last = 0;
  return function () {
    var a = arguments, t = this, now = +(new Date), exe = function () {
      last = now;
      fn.apply(t, a);
    };
    clearTimeout(time);
    (now >= last + ms) ? exe() : time = setTimeout(exe, ms);
  }
}

function hasClass(el, cls) {
  if (el.className.match('(?:^|\\s)' + cls + '(?!\\S)')) {
    return true;
  }
}

function addClass(el, cls) {
  if (!el.className.match('(?:^|\\s)' + cls + '(?!\\S)')) {
    el.className += ' ' + cls;
  }
}

function delClass(el, cls) {
  el.className = el.className.replace(new RegExp('(?:^|\\s)' + cls + '(?!\\S)'), '');
}

document.documentElement.className += ' js'; // adds class="js" to <html> element

function elementFromTop(elem, classToEdit, distanceFromTop, unit, whatToDo) {
  var winY = window.innerHeight || document.documentElement.clientHeight,
      elemLength = elem.length, distTop, distPercent, distPixels, distUnit, i;
  for (i = 0; i < elemLength; ++i) {
    distTop = elem[i].getBoundingClientRect().top;
    distPercent = Math.round((distTop / winY) * 100);
    distPixels = Math.round(distTop);
    distUnit = unit == 'percent' ? distPercent : distPixels;
    if (distUnit <= distanceFromTop) {
      if (!hasClass(elem[i], classToEdit)) {
        if (whatToDo === 'addToSameElem'){
          addClass(elem[i], classToEdit);
        }else if(whatToDo === 'addToStats') {
          const element = document.getElementById('spaceChart');
          element.classList.add(classToEdit);
        }else if(whatToDo === 'removeFromStats'){
          const element = document.getElementById('spaceChart');
          element.classList.remove(classToEdit);
        }
      }
    } else {
      delClass(elem[i], classToEdit);
    }
  }
}

// params: element, classes to add, distance from top, unit ('percent' or 'pixels')

window.addEventListener('scroll', throttle(function () {
  elementFromTop(document.querySelectorAll('.introScreen'), 'fadeIn', 70, 'percent','addToSameElem' );
  elementFromTop(document.querySelectorAll('.introScreen'), 'fadeOut', 10, 'percent','addToSameElem' );
  elementFromTop(document.querySelectorAll('.scrollIcon'), 'fadeOut', 90, 'percent','addToSameElem' );

}, 100), false);

window.addEventListener('resize', debounce(function () {
  /* add same calls as above */
}, 100), false);


// preparing collection data
let collectionsCount = collectionData.length;

// drawing space

let displayChart = () => {
  let canvas = document.getElementById('spaceChart');
  let canvasWidth = canvas.offsetWidth;
  let canvasHeight = canvas.offsetHeight;
  let htmlResult = [];
  for (collection = 0; collection < collectionsCount ; collection++) {
    let positionLeft = Math.ceil(Math.random()*canvasWidth);
    let positionTop = Math.ceil(Math.random()*canvasHeight);
    let totalItems = collectionData[collection]['Total Items'];
    let onlineItems = collectionData[collection]['Online Items'];
    let totalItemsString = numberWithSpaces(totalItems);
    let onlineItemsString = numberWithSpaces(onlineItems);
    let totalSize = Math.ceil(Math.sqrt(totalItems/200));
    let onlineSize = Math.ceil(Math.sqrt(onlineItems/200));
    let museumName = collectionData[collection]['Collection Name'];
    let transitionDelay = Math.random()*3;
    let animationChance = () =>{
      let chance = Math.random();
      if (chance > 0.9){
        return 'showCollectionInfo'
      }else {
        return ''
      }
    }
    let addAnimation = animationChance()

    let collectionItem;
    collectionItem = `
    <div class='collectionPlanet' style='left: ${positionLeft}px; top: ${positionTop}px;'>
      <span class="collectionName">${museumName}</span>
      <span class="collectionInfo"><strong>${onlineItemsString}</strong> z ${totalItemsString} předmětů je online</span>
      <span class="totalItems collectionItems" style='transform: scale(${totalSize},${totalSize}); transition-delay: ${transitionDelay}s;'></span>
      <span class="onlineItems collectionItems" style='transform: scale(${onlineSize},${onlineSize}); transition-delay: ${transitionDelay}s;'></span>
    </div>`;

    let toBeIncluded = Math.random();
    // the share of museums to be included
    if(toBeIncluded >= 0.75){
      htmlResult.push(collectionItem);
    }
  }
  canvas.innerHTML = htmlResult.join("");
}

//* drawing collection stats

let displayColStats = (sortKey) => {
  let canvas = document.getElementById('colSizeStats');
  let htmlResult = [];

  // sort by value
  collectionData.sort(function (a, b) {
    return b[sortKey] - a[sortKey];
  });
  console.log(collectionData)

  for (collection = 0; collection < collectionsCount ; collection++) {
    let totalItems = collectionData[collection]['Total Items'];
    let onlineItems = collectionData[collection]['Online Items'];
    let totalItemsString = numberWithSpaces(totalItems);
    let onlineItemsString = numberWithSpaces(onlineItems);
    let totalSize = Math.ceil(Math.sqrt(totalItems/1000));
    let onlineSize = Math.ceil(Math.sqrt(onlineItems/1000));
    let museumName = collectionData[collection]['Collection Name'];
    let getUrl = () =>{
      if(collectionData[collection]['Web Url'] !== ""){
        return collectionData[collection]['Web Url'];
      }if(collectionData[collection]['Esbirky Url'] !== ""){
        return collectionData[collection]['Esbirky Url'];
      }if(collectionData[collection]['Citem Url'] !== ""){
        return collectionData[collection]['Citem Url'];
      }
    }
    let webUrl = getUrl();
    let webLink
    let createWebLink = () =>{
      if(webUrl !== undefined){
        webLink = `<a href="${webUrl}" target="_blank" title="${museumName} | online katalog sbírkových prředmětů" class="collectionLink">Katalog</a>`
      }else {
        webLink = ""
      }
    }
    createWebLink()

    let collectionItem = `
    <div class='collectionPlanet'>
      <span class="totalItems collectionItems" style='transform: scale(${totalSize},${totalSize});'></span>
      <span class="onlineItems collectionItems" style='transform: scale(${onlineSize},${onlineSize});'></span>
      <span class="collectionName">${museumName}</span>
      <span class="collectionInfo"><strong>${onlineItemsString}</strong> z ${totalItemsString} předmětů je online ${webLink}</span>
    </div>`;

    htmlResult.push(collectionItem);
  }
  canvas.innerHTML = htmlResult.join("");
}

// parallax

function parallax() {
  if(document.body.clientWidth > 960) {
    let s = document.getElementById("spaceChartCanvas");
    let yPos = 0 - window.pageYOffset / 75;
    s.style.top = 0 + yPos + "%";
  }
}

// activated menu item

// Get the container element
let btnContainer = document.getElementById("switchColOrder");

// Get all buttons with class="btn" inside the container
let btns = btnContainer.getElementsByClassName("jsButton");

// Loop through the buttons and add the active class to the current/clicked button
for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    let current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

// show and hide all collections
let toggleCollections = () => {
  let statsList = document.getElementById('colSizeStats')
  statsList.classList.toggle("revealAll");

  let x = document.getElementById("revealButton");
  if (x.innerHTML === "Zobrazit vše") {
    x.innerHTML = "Skrýt";
  } else {
    x.innerHTML = "Zobrazit vše";
  }
}

// calling functions

window.onload = function(){
  displayChart();
  displayColStats('Total Items');
}
window.addEventListener("scroll", function () {
  parallax();
});








