const canvas = document.getElementById("canvas");

canvas.width = 500;
canvas.height = 300;

const ctx = canvas.getContext("2d");

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


