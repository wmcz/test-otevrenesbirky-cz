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
          const element = document.getElementById('collectionStats');
          element.classList.add(classToEdit);
        }else if(whatToDo === 'removeFromStats'){
          const element = document.getElementById('collectionStats');
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

  elementFromTop(document.querySelectorAll('#introScreen2'), 'revealTotalCount', 70, 'percent','removeFromStats' );
  elementFromTop(document.querySelectorAll('#introScreen2'), 'revealTotalSize', 70, 'percent','addToStats' );
  elementFromTop(document.querySelectorAll('#introScreen3'), 'revealOnlineSize', 70, 'percent','addToStats' );
  elementFromTop(document.querySelectorAll('#introScreen5'), 'hideTotal', 70, 'percent','addToStats' );

}, 100), false);

window.addEventListener('resize', debounce(function () {
  /* add same calls as above */
}, 100), false);

// drawing space

let displayChart = () => {
  let canvas = document.getElementById('collectionStats');
  let canvasWidth = canvas.offsetWidth;
  let canvasHeight = canvas.offsetHeight;
  let collectionsCount = collectionData.length;

  let htmlResult = [];
  for (collection = 0; collection < collectionsCount ; collection++) {
    let positionLeft = Math.ceil(Math.random()*canvasWidth);
    let positionTop = Math.ceil(Math.random()*canvasHeight);
    let totalItems = collectionData[collection]['Total Items'];
    let onlineItems = collectionData[collection]['Online Items'];
    let totalSize = Math.ceil(Math.sqrt(totalItems/1000));
    let onlineSize = Math.ceil(Math.sqrt(onlineItems/1000));
    let museumName = collectionData[collection]['Collection Name'];
    let transitionDelay = Math.random()*3;
    let animationChance = () =>{
      let chance = Math.random();
      let animationDelay = Math.random()*5;
      if (chance > 0.75){
        return `animation: blink 5s 3 ${animationDelay}s;`
      }else {
        return ''
      }
    }
    let addAnimation = animationChance()

    let collectionItem;
    collectionItem = `
    <div class='collectionPie' style='left: ${positionLeft}px; top: ${positionTop}px;'>
      <span class="collectionInfo">${museumName}<br><strong>${onlineItems}</strong> z ${totalItems} sbírkových předmětů je přístupných online</span>
      <span class="totalItems collectionItems" style='transform: scale(${totalSize},${totalSize}); transition-delay: ${transitionDelay}s; ${addAnimation}'></span>
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
window.onload = function(){
  displayChart();
}


//* parallax

function parallax() {
  let s = document.getElementById("collectionStatsCanvas");
  let yPos = 0 - window.pageYOffset / 75;
  s.style.top = 0 + yPos + "%";
}

window.addEventListener("scroll", function () {
  parallax();
});








