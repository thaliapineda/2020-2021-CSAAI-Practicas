console.log("Ejecutando JS....")

//-- Obtener elementos del DOM
const canvas = document.getElementById('canvas');
const img = document.getElementById('imagesrc');
const ctx = canvas.getContext('2d');


//-- Acceso al deslizador
//-- Color rojo
const deslizador_rojo = document.getElementById('deslizador_rojo');
//-- Color azul
const deslizador_azul = document.getElementById('deslizador_azul');
//-- Color verde
const deslizador_verde = document.getElementById('deslizador_verde');

//-- Valor del deslizador
//-- Color rojo
const range_value_rojo = document.getElementById('range_value_rojo');
//-- Color azul
const range_value_azul = document.getElementById('range_value_azul');
//-- Color verde
const range_value_verde = document.getElementById('range_value_verde');

//-- Función de retrollamada de imagen cargada
//-- La imagen no se carga instantaneamente, sino que
//-- lleva un tiempo. Sólo podemos acceder a ella una vez
//-- que esté totalmente cargada
img.onload = function () {

  //-- Se establece como tamaño del canvas el mismo
  //-- que el de la imagen original
  canvas.width = 990;
  canvas.height = 556;

  //-- Situar la imagen original en el canvas
  //-- No se han hecho manipulaciones todavia
  ctx.drawImage(img, 0,0);

  console.log("Imagen lista...");
};

ctx.drawImage(img, 0, 0);

//-- Funcion de retrollamada del deslizador
//-- Color rojo
deslizador_rojo.oninput = () => {
  //-- Mostrar el nuevo valor del deslizador
  range_value_rojo.innerHTML = deslizador_rojo.value;

  //-- Situar la imagen original en el canvas
  //-- No se han hecho manipulaciones todavia
  ctx.drawImage(img, 0,0);

  //-- Obtener la imagen del canvas en pixeles
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  //-- Obtener el array con todos los píxeles
  let data = imgData.data

  //-- Obtener el umbral de rojo del desliador range_value por value
  umbral_rojo = deslizador_rojo.value

  //-- Filtrar la imagen según el nuevo umbral
  for (let i = 0; i < data.length; i+=4) {
    if (data[i] > umbral_rojo)
      data[i] = umbral_rojo;
  }

  //-- Poner la imagen modificada en el canvas
  ctx.putImageData(imgData, 0, 0);
}
//-- Color azul
deslizador_azul.oninput = () => {
  //-- Mostrar el nuevo valor del deslizador
  range_value_azul.innerHTML = deslizador_azul.value;

  //-- Situar la imagen original en el canvas
  //-- No se han hecho manipulaciones todavia
  ctx.drawImage(img, 0, 0);

  //-- Obtener la imagen del canvas en pixeles
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  //-- Obtener el array con todos los píxeles
  let data = imgData.data

  //-- Obtener el umbral de rojo del desliador
  umbral_azul = deslizador_azul.value

  //-- Filtrar la imagen según el nuevo umbral
  for (let i = 0; i < data.length; i+=4) {
    if (data[i + 2] > umbral_azul)
      data[i + 2] = umbral_azul;
  }

  //-- Poner la imagen modificada en el canvas
  ctx.putImageData(imgData, 0, 0);
}
//-- Color verde
deslizador_verde.oninput = () => {
  //-- Mostrar el nuevo valor del deslizador
  range_value_verde.innerHTML = deslizador_verde.value;

  //-- Situar la imagen original en el canvas
  //-- No se han hecho manipulaciones todavia
  ctx.drawImage(img, 0, 0);

  //-- Obtener la imagen del canvas en pixeles
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  //-- Obtener el array con todos los píxeles
  let data = imgData.data

  //-- Obtener el umbral de rojo del desliador
  umbral_verde = deslizador_verde.value

  //-- Filtrar la imagen según el nuevo umbral
  for (let i = 0; i < data.length; i+=4) {
    if (data[i + 1] > umbral_verde)
      data[i + 1] = umbral_verde;
  }

  //-- Poner la imagen modificada en el canvas
  ctx.putImageData(imgData, 0, 0);
}

//-- Filtrado gris
gris.onclick = () => {

    //-- Situar la imagen original en el canvas
    //-- No se han hecho manipulaciones todavia
    ctx.drawImage(img, 0,0);
  
    //-- Obtener la imagen del canvas en pixeles
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    //-- Obtener el array con todos los píxeles
    let data = imgData.data
  
    //-- Filtrar la imagen según el nuevo umbral
    for (let i = 0; i < data.length; i += 4) {
      var gris_escala = (3*data[i]+4*data[i+1]+data[i+2])/8;
      data[i] = gris_escala;
      data[i + 1] = gris_escala;
      data[i + 2] = gris_escala;
    }
  
    //-- Poner la imagen modificada en el canvas
    ctx.putImageData(imgData, 0, 0);
  }

//-- Reflejo horizontal
const horizontal= document.getElementById('reflejo_horizontal');
horizontal.onclick = () => {
  document.getElementById('rangos').style.display = 'none';
  ctx.drawImage(img, 0,0);
  ctx.translate(2*(img.width)/2,0);
  ctx.scale(-1,1);
  ctx.drawImage(img, 0,0);
}


console.log("Fin...");