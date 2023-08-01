var timeout;

const scroll = new LocomotiveScroll({
  el: document.querySelector('#main'),
  smooth: true
});

function firstPageAnim() {
  var tl = gsap.timeline();

  tl.from("#nav", {
    y: "-10",
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut,
  })
    .to(".boundingelem", {
      y: 0,
      ease: Expo.easeInOut,
      duration: 2,
      delay: -1,
      stagger: 0.2,
    })
    .from("#herofooter", {
      y: -10,
      opacity: 0,
      duration: 1.5,
      delay: -1,
      ease: Expo.easeInOut,
    });
}
function circleChaptaKaro() {
  // define default scale value
  var xscale = 1;
  var yscale = 1;

  var xprev = 0;
  var yprev = 0;
  window.addEventListener("mousemove", function (dets) {
    clearTimeout(timeout);

    xscale = gsap.utils.clamp(0.8, 1.2, dets.x - xprev);
    yscale = gsap.utils.clamp(0.8, 1.2, dets.y - yprev);

    xprev = dets.x;
    yprev = dets.y;

    circleMouseFollower(xscale, yscale);

    timeout = setTimeout(function () {
      minicircle.style.transform = `translate(${dets.x}px ,${dets.y}px) scale(1,1)`
    }, 100);
  });
}
function circleMouseFollower(xscale, yscale) {
  var minicircle = document.querySelector("#minicircle");
  window.addEventListener("mousemove", function (dets) {
    // cursor.style.top = dets.y + "px";
    // cursor.style.left = dets.x  + "px";
    minicircle.style.transform = `translate(${dets.x}px ,${dets.y}px) scale(${xscale},${yscale})`
  })
}
circleChaptaKaro();
circleMouseFollower();
firstPageAnim();

// for image on cards : teeno element ko select karo, uske baad teeno par ek mousemove lagao, jab mousemove ho to ye pata karo ki mouse kaha par hai, jiska matlab hai mouse ki x and y position pata karo, ab mouse ki x y position ke badle us image ko show karo and us image ko move karo, move karte waqt rotate karo, and jaise jaise mouse tez chale waise waise rotation bhi tez ho jaye
document.querySelectorAll(".elem").forEach(function (elem) {
  var rotate = 0;
  var diffrot = 0;

  elem.addEventListener("mouseleave", function (dets) {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: Power3,
      duration: 0.5,
    });
  });

  elem.addEventListener("mousemove", function (dets) {
    var diff = dets.clientY - elem.getBoundingClientRect().top;
    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;
    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: Power3,
      top: diff,
      left: dets.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
    });
  });
});