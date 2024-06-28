let numeroSecreto = 0;
let intentos = 0;
//lista para agregar los números sorteados y no volver a repetirlos
let listaNumerosSorteados = []
let numeroMaximo = 0;

//Función asignarTextoElemento
function asignarTextoElemento(elemento, texto){
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

//Función intentoDeUsuario()
function verificarIntento() {
    let numeroUsuario = document.getElementById('valorUsuario').valueAsNumber;
    if(numeroSecreto === numeroUsuario){
        asignarTextoElemento('p',`Felicidades!, Acertase el número en ${intentos} ${(intentos > 1) ? ' intentos':' intento'}`);
        document.querySelector('#reiniciar').removeAttribute('disabled');
        document.querySelector('#intentar').setAttribute('disabled',true);
    }else{
        //El usuario no acertó
        if(numeroSecreto > numeroUsuario){
            asignarTextoElemento('p',`El número secreto es mayor, llevas ${intentos} ${(intentos > 1) ? ' intentos':' intento'}`);
        }else{
            asignarTextoElemento('p',`El número secreto es menor, llevas ${intentos} ${(intentos > 1) ? ' intentos':' intento'}`);
        }
        intentos++;
        limpiarCaja();
    }
    return;
}

function reiniciarJuego(){
    //limpiar caja
    limpiarCaja();
    //Indicar mensaje de intérvalo de números y reiniciar variables
    condicionesIniciales();
    document.getElementById('reiniciar').setAttribute('disabled',true);
    document.querySelector('#intentar').removeAttribute('disabled');
}

function condicionesIniciales(){
    asignarTextoElemento('h1','Juego del número Secreto');
    if(listaNumerosSorteados.length == 0){
        numeroMaximo = prompt('Ingrese un el número de juegos que quiere realizar:');
    }
    asignarTextoElemento('p',`Indica un número del 1 al ${numeroMaximo}:`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}

function limpiarCaja(){
    document.querySelector('#valorUsuario').value = '';
}

function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;
    console.log(numeroGenerado);
    console.log(listaNumerosSorteados);
    //si ya sorteamos todos los números
    if(listaNumerosSorteados.length == numeroMaximo){
        asignarTextoElemento('p',`Ya se sortearon todos los números posibles del 1 al ${numeroMaximo}`);
    }else{
        //Si el número generado está incluido en la lista
        if(listaNumerosSorteados.includes(numeroGenerado)){
            return generarNumeroSecreto();   
        }else{
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

condicionesIniciales();