var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//-- Bola
var RadioBola = 10;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;

//-- Raqueta
var AnchuraRaqueta = 75;
var AlturaRaqueta = 10;
var Raqueta_EjeX = (canvas.width-AnchuraRaqueta)/2;

//-- Controles raqueta
var FlechaDerecha = false;
var FlechaIzquierda = false;


//-- Ladrillos
var LadrillosColumna = 9;
var LadrillosFila = 5;
var AnchuraLadrillos = 75;
var AlturaLadrillos = 20;
var PaddingLadrillos = 10;
var OffsetTopLadrillos = 30;
var OffsetIzquierdaLadrillos = 30;

//-- Matriz para almacenar ladrillos
var ladrillos = [];
for(columnas=0; columnas<LadrillosColumna; columnas++){
  ladrillos[columnas] = [];
  for(filas=0; filas<LadrillosFila; filas++){
    ladrillos[columnas][filas] = {x: 0, y: 0, status: 1};
  }
}

//-- Puntuación
var puntuacion = 0;

//-- Vidas
var vidas = 3;

//-- Saber que flecha se esta pulsando
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//-- Creamos la funcion tecla pulsada
function keyDownHandler(e) {
  if(e.keyCode == 39) {
      FlechaDerecha = true;
  }
  else if(e.keyCode == 37) {
      FlechaIzquierda = true;
  }
}

//-- Creamos la funcion tecla levantada
function keyUpHandler(e) {
  if(e.keyCode == 39) {
    FlechaDerecha = false;
  }
  else if(e.keyCode == 37) {
    FlechaIzquierda = false;
  }
}

//-- Creamos una funcion para detectar los ladrillos
function ColisionLadrillos(){
  for(columnas=0; columnas<LadrillosColumna; columnas++){
    for(filas=0; filas<LadrillosFila; filas++){
      var colision = ladrillos[columnas][filas];
      if(colision.status == 1){
        if(x>colision.x && x<colision.x+AnchuraLadrillos && y>colision.y && y<colision.y+AlturaLadrillos){
          dy = -dy;
          colision.status = 0;
          puntuacion++;
          if(puntuacion == LadrillosFila*LadrillosColumna){
            alert("#1 VICTORY ROYALE");
            document.location.reload();  
          }
        }
      }
    }
  }
}

//-- Contador de puntuaciones
function Puntuacion(){
  ctx.font = "18px Times";
  ctx.fillStyle = "orange";
  ctx.fillText("Puntuación: " + puntuacion, 8, 20);
}

//-- Contador de vidas
function Vidas(){
  ctx.font = "18px Times";
  ctx.fillStyle = "orange";
  ctx.fillText("Vidas: " + vidas, canvas.width-65, 20);
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

//-- Creamos una funcion para dibujar los ladrillos
function DibujarLadrillos(){
  for(columnas=0; columnas<LadrillosColumna; columnas++){
    for(filas=0; filas<LadrillosFila; filas++){
      if(ladrillos[columnas][filas].status == 1){
        var ladrillosX = (columnas*(AnchuraLadrillos+PaddingLadrillos))+OffsetIzquierdaLadrillos;
        var ladrillosY = (filas*(AlturaLadrillos+PaddingLadrillos))+OffsetTopLadrillos;
        ladrillos[columnas][filas].x = ladrillosX;
        ladrillos[columnas][filas].y = ladrillosY;
        ctx.beginPath();
        ctx.rect(ladrillosX, ladrillosY, AnchuraLadrillos, AlturaLadrillos);
        ctx.fillStyle = "orange";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

//-- Creamos una funcion para que solo se vea la bola y no toda la trayecoria
function EliminarTrayectoria() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  DibujarLadrillos();
  DibujarBola();
  DibujarRaqueta();
  Puntuacion();
  Vidas();
  ColisionLadrillos();


  if(x + dx > canvas.width-RadioBola || x + dx < RadioBola){
    dx = -dx;
  }
  if(y + dy < RadioBola){
    dy = -dy;
  }
  else if(y + dy > canvas.height-RadioBola){
    if(x > Raqueta_EjeX && x < Raqueta_EjeX + AnchuraRaqueta){
      dy = -dy;
    }
    else{
      vidas--;
      if(!vidas){
        alert("Game over :(");
        document.location.reload();
      }
      else{
        x = canvas.width/2;
        y = canvas.height-30;
        dx = 3;
        dy = -3;
        Raqueta_EjeX = (canvas.width-AnchuraRaqueta)/2;
      }
    }
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