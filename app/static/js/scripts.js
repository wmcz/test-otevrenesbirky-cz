// config

let currentYear = 2022
let currentYearTotalKey = "Total 2022"
let currentYearOnlineKey = "Online 2022"
let currentYearOpenKey = "Open 2022"

// Get cookies

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

// Delete old cookies onload

function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}
deleteAllCookies()

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
    let totalItems = collectionData[collection][currentYearTotalKey];
    let onlineItems = collectionData[collection][currentYearOnlineKey];
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


// drawing collection stats

let displayColStats = (sortKey="Total", activeYear= currentYear) => {
  let canvas = document.getElementById('colSizeStats');
  let htmlResult = [];
  if(getCookie("sortKey") !== ""){
    sortKey = getCookie("sortKey");
  }
  if(getCookie("activeYear") !== ""){
    activeYear = getCookie("activeYear");
  }
  console.log(sortKey)
  console.log(activeYear)

  // sort by value
  collectionData.sort(function (a, b) {
    return b[sortKey + ' ' + activeYear] - a[sortKey + ' ' + activeYear];
  });

  for (collection = 0; collection < collectionsCount ; collection++) {
    let totalItems = collectionData[collection]['Total ' + activeYear];
    let onlineItems = collectionData[collection]['Online ' + activeYear];
    let totalItemsString = numberWithSpaces(totalItems);
    let onlineItemsString = numberWithSpaces(onlineItems);
    let totalSize = Math.ceil(Math.sqrt(totalItems/1000));
    let onlineSize = Math.ceil(Math.sqrt(onlineItems/1000));
    let museumName = collectionData[collection]['Collection Name'];
    let getUrl = () =>{
      if(collectionData[collection]['Catalog Url'] !== ""){
        return collectionData[collection]['Catalog Url'];
      }
    }
    let webUrl = getUrl();
    let collectionItem = () =>{
      if(webUrl !== undefined){
        collectionItem = `
        <a class='collectionPlanet linkAvailable' href="${webUrl}" target="_blank" title="${museumName} | online katalog sbírkových předmětů">
          <span class="totalItems collectionItems" style='transform: scale(${totalSize},${totalSize});'></span>
          <span class="onlineItems collectionItems" style='transform: scale(${onlineSize},${onlineSize});'></span>
          <span class="collectionName">${museumName}</span>
          <span class="collectionInfo"><strong>${onlineItemsString}</strong> z ${totalItemsString} předmětů je online</span>
        </a>`;

      }else {
        collectionItem = `
        <div class='collectionPlanet linkDisable'>
          <span class="totalItems collectionItems" style='transform: scale(${totalSize},${totalSize});'></span>
          <span class="onlineItems collectionItems" style='transform: scale(${onlineSize},${onlineSize});'></span>
          <span class="collectionName">${museumName}</span>
          <span class="collectionInfo"><strong>${onlineItemsString}</strong> z ${totalItemsString} předmětů je online</span>
        </div>`
      }
    }
    collectionItem()

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
// Add active class to the current button (highlight it)

function toggleActive(classSelector) {
  let buttons = document.querySelectorAll(classSelector);
  console.log(buttons)
  buttons.forEach(button => {
      button.addEventListener('click', function () {
          buttons.forEach(btn => btn.classList.remove('active'));
          this.classList.add('active');
      });
  });
}
toggleActive('.jsYearButton')
toggleActive('.jsSortButton')



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
  displayColStats();
}
window.addEventListener("scroll", function () {
  parallax();
});








