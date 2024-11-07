const images = ["img/auto1.webp", "img/auto2.webp", "img/auto3.webp", "./img/auto4.webp"];
let i = 0;

const carrousellImg = document.getElementById("carrousellImg");
carrousellImg.src = images[0];

function increment() {
  if (i === images.length - 1) i = 0; 
  
  i++;
  carrousellImg.src = images[i];
}

function decrement() {
  if (i === 0) i = images.length; 
  
  i--;
  carrousellImg.src = images[i];
}