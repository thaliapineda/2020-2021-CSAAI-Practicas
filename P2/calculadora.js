console.log("Ejecutando JS...");


//-- Elementos de la interfaz de la calculadora
display = document.getElementById("display")
igual = document.getElementById("igual")
AC = document.getElementById("AC")
DEL = document.getElementById("DEL")

//-- Números
let numeros = document.getElementsByClassName("numero")
console.log(numeros)

//-- Operaciones
let operaciones = document.getElementsByClassName("operacion")
console.log(operaciones)

//-- Estados
const ESTADOS = {
  INICIO: 0,
  PRIMERNUMERO: 1,
  OPERACION: 2,
  SEGUNDONUMERO_INICIO: 3,
  SEGUNDONUMERO: 4,
}

//-- Inicializamos los estados
let estados = ESTADOS.INICIO;

//-- Display a 0
function valor(tecla) {
  if(display.innerHTML == "0"){
    display.innerHTML = tecla.value;
  }
  else{
    display.innerHTML += tecla.value;
  }
}

//-- Bucle que lee cada 'digito' que se va pulsando
for (i = 0; i < numeros.length; i++){
  numeros[i].onclick = (ev)=>{
    number(ev.target);
  }
}

//-- Bucle que lee cada 'operacion' que se ha pulsado
for (i=0; i<operaciones.length; i++){
  operaciones[i].onclick = (ev)=>{
    operador(ev.target);
  }
}

//-- Evaluar la expresion
igual.onclick = () => {
  display.innerHTML = eval(display.innerHTML);
}

//-- Borrar el ultimo número de la expresion (C)
DEL.onclick = () => {
  if (display.innerHTML.length != 1){
    display.innerHTML = display.innerHTML.slice(0,-1);
  } else{
    display.innerHTML = 0;
    estados = ESTADOS.INICIO;
  }
}

//-- Poner a cero la expresion (AC) - Borrar todo
AC.onclick = () => {
  display.innerHTML = "0";
  estados = ESTADOS.INICIO;
}

//-- Ha llegado un dígito
function number(num)
{
  //-- Segun el estado hacemos una cosa u otra
  if (estados == ESTADOS.INICIO) {
    display.innerHTML = num.value;
    estados = ESTADOS.PRIMERNUMERO;
  } else if (estados == ESTADOS.PRIMERNUMERO){
    display.innerHTML += num.value;
  } else if (estados == ESTADOS.OPERACION){
    display.innerHTML += num.value;
    estados = ESTADOS.SEGUNDONUMERO_INICIO;
  } else if (estados == ESTADOS.SEGUNDONUMERO_INICIO){
    display.innerHTML += num.value;
    estados = ESTADOS.SEGUNDONUMERO;
  } else if (estados == ESTADOS.SEGUNDONUMERO){
    display.innerHTML += num.value;
  }
}

//-- Ha llegado un operador - COMPROBACIÓN
function operador (oper)
{
  //-- Segun el estado hacemos una cosa u otra
  if (estados != ESTADOS.OPERACION){
    display.innerHTML += oper.value;
    estados = ESTADOS.OPERACION;
  }
}
