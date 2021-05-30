var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//-- Bola
var RadioBola = 9;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;

//-- Creamos una funcion para dibujar la bola y hacer que se mueva
function DibujarBola() {
  ctx.beginPath();
  ctx.arc(x, y, RadioBola, 0, Math.PI*2);
  ctx.fillStyle = "orange";
  ctx.fill();
  ctx.closePath;
}

//-- Creamos una funcion para que solo se vea la bola y no toda la trayecoria
function EliminarTrayectoria() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  DibujarBola();

  if(x + dx > canvas.width-RadioBola || x + dx < RadioBola){
    dx = -dx;
  }
  if(y + dy > canvas.height-RadioBola || y + dy < RadioBola){
    dy = -dy;
  }
  
  x += dx;
  y += dy;
}

setInterval(EliminarTrayectoria, 10);