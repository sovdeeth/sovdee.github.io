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
  time += 0.015;
  /* console.log(stars[1].style.opacity) */
}


function shootingStar(x,y,x2,y2){
  let star = document.getElementById("shooting_star");
  let rotation = Math.atan((y2-y)/(x2-x));
  if (x2-x < 0) rotation += 3.1415;
  rotation = "rotate("+(rotation/3.141592*180+180)+"deg)";
  star.style.transform = rotation;
  star.style.top = y + "px";
  star.style.left = x + "px";
  console.log(x,y,x2,y2, x2-x, y2-y)
  star.style.opacity = 1;
  setTimeout(function(){
    star.classList.add("animateStar");
    star.style.transform = "translate("+(x2-x)+"px,"+(y2-y)+"px) " + rotation;
  },10);
  setTimeout(function(){
    star.classList.remove("animateStar");
    star.style.transform = "";
    star.style.opacity = 0;
  },2500);
}

function pointOnEdge(exclude = 0){
  let offsetX = 0
  let offsetY = 0
  switch(exclude){
    case 1:
      offsetX = width/2;
      break;
    case 2:
      offsetY = height/2;
      break;
    case 3:
      offsetX = width/-2;
      break;
    case 4:
      offsetY = height/-2;
      break;
    default: break;
  }
  let x = Math.random() * width + offsetX;
  let y = Math.random() * height + offsetY;
  let closest = Math.min(Math.min(x,width-x),Math.min(y,height-y));

  if (x == closest || width-x == closest){
    x = x < width/2 ? -100 : width + 100;
  } else {
    y = y < height/2 ? -100 : height + 100;
  }

  return [x,y];
}
  
function randomShootingStar(){
  let p1 = pointOnEdge();
  let exclude = 0; 
  if (p1[0] == -100) exclude = 1;
  if (p1[1] == -100) exclude = 2;
  if (p1[0] == width+100) exclude = 3;
  if (p1[1] == height+100) exclude = 4;
  let p2 = pointOnEdge(exclude);
  shootingStar(p1[0],p1[1],p2[0],p2[1])
}













generateStars(0, 0, width, height);
window.onresize = resizeCheck;
var twinkle = setInterval(updateStars, 100);
var shootingstars = setInterval(randomShootingStar, 10000);