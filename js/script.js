"use strict"

var hora;
var minutos;
var segundos;
var tempo = 1000; // Milésimos
var cronometro;
var opc;
var i;
var radio;
var paused
var stats 
const music = new Audio('audio/som.mp3');
const music2 = new Audio('audio/beep.mp3');

// Define os números inicias
function define () {
    hora = document.querySelector("#horas");
    minutos = document.querySelector("#minutos");
    segundos = document.querySelector("#segundos");
    hora = hora.value;
    minutos = minutos.value;
    segundos = segundos.value;
}

// Começa o cronômetro
function start() {
    stats = true;
    document.getElementById('start').disabled = true // desabilitando botão
    if (paused == undefined ) {
        define();
    }
    opc = document.getElementsByName('exampleRadios');
    for (i in opc) 
        if (opc[0].checked)
            radio = 'crescente';
        else
            radio = 'decrescente';
    cronometro = setInterval(() => { timer(radio);}, tempo);
    music.play();
    music.loop =true;
}

// Pausa o cronômetro
function pause() {
    clearInterval(cronometro);
    if (stats){
        paused = true
        document.querySelector("#horas").disabled = true;// desabilitando botão
        document.querySelector("#minutos").disabled = true;
        document.querySelector("#segundos").disabled = true;
    }
    document.getElementById('start').disabled = false; // habilitando botão 	
    music.pause();
    
}

// Zera os valores
function cancel() {
    clearInterval(cronometro);
    window.location.reload(true);
}

// Faz a mudança dos valores
function timer(radio) {
    if (radio == 'crescente'){
        segundos++;
        if(segundos > 59){
            segundos = 0;
            minutos++;
        }
        if(minutos > 59){
            minutos = 0;
            hora++;
        }
    }
    else {
        segundos--;
        if(segundos < 0){
            segundos = 59;
            minutos--;
        }
        if(minutos < 0){
            minutos = 59;
            hora--;
        }
    }
    if(hora < 0){
        cancel()
    }
    hora = hora.toString().padStart(2, '0');
    minutos = minutos.toString().padStart(2, '0');
    segundos = segundos.toString().padStart(2, '0');
    var format = hora + ':' + minutos + ':' + segundos;
    document.getElementById('visor').innerText= format;
    if (hora == 0 && minutos == 0 && segundos == 0) {
        music.pause();
        music2.play();
    }
}   
// Adicionando keyboard events
document.addEventListener("keydown", function(event){
    if(event.key == 'i'){
        start()
    }
    else if(event.key == 'p'){
        pause()
    }
    if(event.key == 'c'){
        cancel()
    }
  });
