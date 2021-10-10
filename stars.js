const starfield = document.getElementById("starfield");
const og_star = document.getElementById("star");
let stars = [];
let height = starfield.offsetHeight;
let width = starfield.offsetWidth;

let time = 0;


function createStar(x, y, size, push = true) {
  let new_star = og_star.cloneNode();


  new_star.style.left = x - size / 2 + "px";
  new_star.style.top = y - size / 2 + "px";
  new_star.style.height = size + "px";
  new_star.style.width = size + "px";

  new_star.style.opacity = Math.random();

  starfield.appendChild(new_star);
  if (push) {
    stars.push(new_star);
  }
}

function randomMap(x) {
  return Math.exp(6.5 * (1 - 1 / x)) + 0.01;
}

function generateStars(boxX, boxY, boxWidth, boxHeight) {

  let starcount = boxWidth * boxHeight / 1000;

  for (let i = 0; i < starcount; i++) {
    let size = Math.max(8 * randomMap(Math.random()), 0.5);

    let x = Math.random() * boxWidth - size / 2 + boxX;
    let y = Math.random() * boxHeight - size / 2 + boxY;

    createStar(x, y, size);
  }
}

function resizeCheck() {

  if (starfield.offsetWidth > width) {
    generateStars(width, 0, starfield.offsetWidth - width, starfield.offsetHeight)
    width = starfield.offsetWidth;
  }
  if (starfield.offsetHeight > height) {
    generateStars(0, height, width, starfield.offsetHeight - height)
    height = starfield.offsetHeight;
  }
}

function updateStarIntensity(star, debug=false) {
  let x = parseFloat(star.style.left.slice(0,-2))/width*13;
  let y = parseFloat(star.style.top.slice(0,-2))/height*13;
  star.style.opacity = Math.min(Math.max((noise.perlin3(x, y, time)*1.5 + 0.35),0),1);
}

function updateStars() {
	for (var i = 0; i < stars.length; i++){
    updateStarIntensity(stars[i]);
  }
  time += 0.03;
  /* console.log(stars[1].style.opacity) */
}













generateStars(0, 0, width, height);
window.onresize = resizeCheck;
var twinkle = setInterval(updateStars, 100);