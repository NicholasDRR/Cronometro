"use strict"

var hora;
var minutos;
var segundos;
var tempo = 1000; // Milésimos
var cronometro;
var opcao;
var i;
var radio;
var paused
var stats 
const music = new Audio('audio/som.mp3');
const music2 = new Audio('audio/beep.mp3');

// Define os números inicias
function define () {
    const horaDOM = document.querySelector("#horas");
    const minutosDOM = document.querySelector("#minutos");
    const segundosDOM = document.querySelector("#segundos");
    hora = horaDOM.value;
    minutos = minutosDOM.value;
    segundos = segundosDOM.value;
}

// Começa o cronômetro
function start() {
    stats = true;
    desabilita()
    if (paused == undefined ) {
        define();
    }
    opcao = document.getElementsByName('exampleRadios');
    for (i in opcao) 
        if (opcao[0].checked)
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
        desabilita()
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

// desabilita botões
function desabilita() {
    document.getElementById('start').disabled = true;
    document.querySelector("#horas").disabled = true;
    document.querySelector("#minutos").disabled = true;
    document.querySelector("#segundos").disabled = true;
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


