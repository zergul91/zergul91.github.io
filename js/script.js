let animItems = document.querySelectorAll(".anim-item");
if (animItems.length > 0) {
  window.addEventListener("scroll", animOnScroll);
  function animOnScroll() {
    for (let i = 0; i < animItems.length; i++) {
      let animItem = animItems[i];
      let animItemHeight = animItem.offsetHeight;
      let animItemOffset = offset(animItem).top;
      let animStart = 4;

      let animItemPoint = window.innerHeight - animItemHeight / animStart;
      if (animItemHeight > window.innerHeight) {
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }
      //console.log(pageYOffset);
      //console.log(animItemOffset - animItemPoint);
      //console.log(animItemHeight);
      //console.log(animItemPoint);
      //console.log(animItemOffset - animItemPoint);

      if (
        pageYOffset > animItemOffset - animItemPoint &&
        pageYOffset < animItemOffset + animItemHeight
      ) {
        animItem.classList.add("active");
      } else {
        animItem.classList.remove("active");
      }
    }
  }
}

function offset(el) {
  var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
}

function animate({ timing, draw, duraton }) {
  let start = performance.now();
  requestAnimationFrame(function animate(time) {
    let timeFraction = (time - start) / duraton;
    if (timeFraction >= 1) {
      timeFraction = 1;
    }

    let progress = timing(timeFraction);

    draw(progress);

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  });
}
let anim = false;
function positionTheDot() {
  // What percentage down the page are we?
  var scrollPercentage =
    (document.documentElement.scrollTop + document.body.scrollTop) /
    (document.documentElement.scrollHeight -
      document.documentElement.clientHeight);

  if (scrollPercentage * 100 < 5) {
    return;
  }
  // Get path length
  var path = document.getElementById("theMotionPath");
  var pathLen = path.getTotalLength();

  // Position the red dot at this point

  var dot = document.getElementById("dot");

  animate({
    duraton: 30000,
    timing(timeFraction) {
      return timeFraction;
    },
    draw(progress) {
      anim = true;
      var dist = pathLen;
      var pt = path.getPointAtLength(dist * progress);
      if (dist * progress + 1 < pathLen) {
        let posHead = path.getPointAtLength(dist * progress + 1);
        var angle = Math.atan2(posHead.y - pt.y + 10, posHead.x - pt.x + 10);
      }
      else {
        dot.setAttribute("display", "none")
      }
      dot.setAttribute(
        "transform",
        "translate(" + pt.x + "," + pt.y + ") rotate(" + rad2deg(angle) + ")"
      );
    },
  });

  anim = false;
}

function rad2deg(rad) {
  if (typeof rad ==='undefined') {
    return 0
  }
  return (180 * rad) / Math.PI;
}

let anim_2 = false;
function drawLine(line) {
  var pathLength = line.getTotalLength();
  //line.style.strokeDasharray = [10, pathLength].join(" ");
  line.style.strokeDasharray = pathLength;
  line.style.strokeDashoffset = pathLength;
  //line.style.strokeDasharray = [0, pathLength].join(" ");

  let scrollHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight
  );

  let percentDone = window.pageYOffset / (scrollHeight - window.innerHeight);

  if (percentDone * 100 < 5) {
    return;
  }
  /*
  let percentDone =
    scrolled /
    (document.documentElement.scrollHeight -
      document.documentElement.clientHeight);*/

  //maxScrollTop = document.innerHeight - window.innerHeight; //$(document).height() - $(window).height(),
  //percentDone = window.scrollY / maxScrollTop; //$(window).scrollTop() / maxScrollTop,
  //let maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  //let percent = window.pageYOffset / maxScroll;
  //console.log(percent);
  //console.log(document.documentElement.clientHeight);
  //console.log(window.innerHeight);

  let len = percentDone * pathLength;

  animate({
    duraton: 30000,
    timing(timeFraction) {
      return timeFraction;
    },
    draw(progress) {
      anim_2 = true;
      let dist = pathLength;

      // line.style.strokeDasharray = [dist * progress, pathLength].join(" ");
      line.style.strokeDashoffset = pathLength - dist * progress;
    },
  });
  anim_2 = false;

  //prevLen = prevLen + d;
}

/*
function positionTheDot() {
  // What percentage down the page are we?
  var scrollPercentage =console.log(percentDone)
  // Get the position of a point at <scrollPercentage> along the path.
  var pt = path.getPointAtLength(scrollPercentage * 0.7 * pathLen);
  var div = document
    .getElementsByClassName("gallery")[0]
    .getBoundingClientRect();

  // Position the red dot at this point
  var dot = document.getElementById("dot");
  let dotPos = dot.getBoundingClientRect();
  //console.log("dotPos", dotPos.top);
  //console.log(window.pageYOffset);
  //let breakPointDiv = offsets.top + offsets.height + window.pageYOffset - 400;
  //let breakPointDot = dotPos.top + window.pageYOffset;
  //console.log("divPos", offsets.top + window.pageYOffset);

  //console.log("divPos", offsets.bottom);
  //console.log("dotPos", dotPos.var dot = document.getElementById("dot");
  if (
    Math.round(dotPos.top + window.pageYOffset) >
    div.top + div.height + window.pageYOffset - 400
  ) {
    console.log("log");

    pt = path.getPointAtLength(scrollPercentage * pathLen);
  }
  dot.setAttribute("transform", "translate(" + pt.x + "," + pt.y + ")");
}
*/

// Update dot position when we get a scroll event.
window.addEventListener("scroll", function () {
  // Set the initial position of the dot.
  //let t = setTimeout(() => {

  //console.log(scrolledPx);
  //console.log(anim);
  if (anim == true || anim_2 == true) {
    return;
  }

  drawLine(document.getElementById("theMotionPath"));
  positionTheDot();
});

//drawLine(document.getElementById("theMotionPath"));
//positionTheDot();
