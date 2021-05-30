var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//-- Bola
var RadioBola = 9;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;

//-- Raqueta
var AnchuraRaqueta = 70;
var AlturaRaqueta = 9;
var Raqueta_EjeX = (canvas.width-AnchuraRaqueta)/2;

//-- Controles raqueta
var FlechaDerecha = false;
var FlechaIzquierda = false;

//-- Saber que flecha se esta pulsando
document.addEventListener("teclapulsada", TeclaPulsada, false);
document.addEventListener("teclalevantada", TeclaLevantada, false);

//-- Creamos la funcion tecla pulsada
function TeclaPulsada(e){
  if(e.tecla == 39){
    FlechaDerecha = true;
  }
  else if(e.tecla == 37){
    FlechaIzquierda = true;
  }
}

//-- Creamos la funcion tecla levantada
function TeclaLevantada(e){
  if(e.tecla == 39){
    FlechaDerecha = false;
  }
  else if(e.tecla == 37){
    FlechaIzquierda = false;
  }
}


//-- Creamos una funcion para dibujar la bola y hacer que se mueva
function DibujarBola() {
  ctx.beginPath();
  ctx.arc(x, y, RadioBola, 0, Math.PI*2);
  ctx.fillStyle = "orange";
  ctx.fill();
  ctx.closePath;
}

//-- Creamos una funcion para dibujar la raqueta
function DibujarRaqueta(){
  ctx.beginPath();
  ctx.rect(Raqueta_EjeX, canvas.height-AlturaRaqueta, AnchuraRaqueta, AlturaRaqueta);
  ctx.fillStyle = "orange";
  ctx.fill();
  ctx.closePath();
}

//-- Creamos una funcion para que solo se vea la bola y no toda la trayecoria
function EliminarTrayectoria() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  DibujarBola();
  DibujarRaqueta();

  if(x + dx > canvas.width-RadioBola || x + dx < RadioBola){
    dx = -dx;
  }
  if(y + dy > canvas.height-RadioBola || y + dy < RadioBola){
    dy = -dy;
  }
  if(FlechaDerecha && Raqueta_EjeX < canvas.width-AnchuraRaqueta){
    Raqueta_EjeX += 7;
  }
  else if(FlechaIzquierda && Raqueta_EjeX > 0){
    Raqueta_EjeX -= 7;
  }

  x += dx;
  y += dy;
}

setInterval(EliminarTrayectoria, 10);