console.log("Ejecutando JS...");

const canvas = document.getElementById("canvas");

//-- Definir el tamaño del canvas
canvas.width = 700;
canvas.height = 600;

//-- Obtener el contexto del canvas
const ctx = canvas.getContext("2d");

//-- Constantes de los ladrillos
const LADRILLO = {
    filas = 2,
    columnas =3,
    w: 30,
    h: 20,
    origen_x: 0,
    origen_y: 0,
    padding: 5,
    visible: true
};

//-- Estructura de los ladrillos
const ladrillos =[];
for (let i=0; i<LADRILLO.filas; i++){
    ladrillos[i] = [];
    for(let j=0; j<LADRILLO.columnas; j++){
        ladrillos [i][j] = {
            x: (LADRILLO.w + LADRILLO.padding) * j,
            y: (LADRILLO.h + LADRILLO.padding) * i,
            w: LADRILLO.w,
            h: LADRILLO.h,
            padding: LADRILLO.padding,
            visible: LADRILLO.visible
        }

    }
}

//-- Dibujar ladrillos
for (i=0; i<LADRILLO.filas; i++){
    for (j=0; j<LADRILLO.columnas; j++){
        //-- Si el ladrillo es visible se pinta
        if(ladrillos[i][j].visible){
            ctx.beginPath();
            ctx.rect(ladrillos[i][j].x, ladrillos[i][j].y, LADRILLO.w, LADRILLO.h);
            ctx.fillStyle = 'yellow';
            ctx.fill();
            ctx.closePath();

        }
    }

}