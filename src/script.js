
const transparentTanden = document.querySelectorAll('.tand.transparent-tand');
console.log(transparentTanden);

function newGame() {
  let verkeerdeTand;
  verkeerdeTand = Math.floor(Math.random()*6);
}

for (let i = 0; i < transparentTanden.length; i++) {
  transparentTanden[i].addEventListener('mouseover', function() {
    mouseOverTand(i);
  });
}

function mouseOverTand(i) {
  whiteTanden[i].classList("hoverTand");
}