const canvas = document.getElementById("canvas");

canvas.width = 500;
canvas.height = 300;

const ctx = canvas.getContext("2d");

//-- Bola
var RadioBola = 9;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;

//-- Raqueta
var AlturaRaqueta = 9;
var AnchoRaqueta = 70;
var RaquetaX = (canvas.width-AnchoRaqueta)/2;

//-- Botones
var BotonDerecho = false;
var BotonIzquierdo = false;

//-- Pulsar teclas
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e){
  if(e.keyCode == 39){
    rightPressed = false;
  }
  else if(e.keyCode == 37){
    leftPressed == false;
  }
}

//-- Constantes de los ladrillos
const LADRILLO = {
    F: 5,  // Filas
    C: 9,  // Columnas
    w: 30,
    h: 20,
    origen_x: 0,
    origen_y: 0,
    padding: 5,
    visible: true
};

//-- Estructura de los ladrillos
const ladrillos = [];

for (let i = 0; i < LADRILLO.F; i++) {
    ladrillos[i] = [];
    for (let j = 0; j < LADRILLO.C; j++) {
      ladrillos[i][j] = {
          x: (LADRILLO.w + LADRILLO.padding) * j,
          y: (LADRILLO.h + LADRILLO.padding) * i,
          w: LADRILLO.w,
          h: LADRILLO.h,
          padding: LADRILLO.padding,
          visible: LADRILLO.visible
        };
    }
}


//-- Dibujar ladrillos
for (let i = 0; i < LADRILLO.F; i++) {
    for (let j = 0; j < LADRILLO.C; j++) {

      //-- Si el ladrillo es visible se pinta
      if (ladrillos[i][j].visible) {
        ctx.beginPath();
        ctx.rect(ladrillos[i][j].x, ladrillos[i][j].y, LADRILLO.w, LADRILLO.h);
        ctx.fillStyle = 'yellow';
        ctx.fill();
        ctx.closePath();
      }
    }
}



function DibujarBola() {
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, Math.PI*2);
  ctx.fillStyle = "orange";
  ctx.fill();
  ctx.closePath();
}

function RaquetaDibujar() {
  ctx.beginPath();
  ctx.rect(RaquetaX, canvas.height-AlturaRaqueta, AnchoRaqueta, AlturaRaqueta);
  ctx.fillStyle = "orange";
  ctx.fill();
  ctx.closePath();
}


function MoverBola() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  DibujarBola();

  if(x + dx > canvas.width-RadioBola || x + dx < RadioBola){
    dx = -dx;
  }
  if(y + dy > canvas.height-RadioBola || y + dy < RadioBola){
    dy = -dy;
  }
  if(rightPressed && RaquetaX < canvas.width-AnchoRaqueta){
    RaquetaX += 7;
  }
  else if(leftPressed && RaquetaX > 0){
    RaquetaX -= 7;
  }

  x += dx;
  y += dy;
}

setInterval(MoverBola, 10);