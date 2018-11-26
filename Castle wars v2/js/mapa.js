var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");
var Cwidth = canvas.width, Cheight = canvas.height;

//Teclado
var keys = [];
keys[68] = 0; keys[65]=0;
keys[39] = 0; keys[37]=0; 
keys[87] = 0; keys[38]=0;//jump
keys[82] = 0;// reset
/*
W - 87  up - 38
S - 83  down - 40
D - 68  right - 39
A - 65  left - 37
*/
window.addEventListener("keydown", function(e){
    keys[e.keyCode] = 1;
    //alert(e.keyCode)
}, false);

window.addEventListener("keyup", function(e){
    keys[e.keyCode] = 0;
}, false);

    //Creacion de Players y Suelo
//Object(id,img, color, x, y, w, h)

//Generar Players
var player1 = new Object("p1","img/Players/idle/p1_idle1.png",1, "red", 32, 10, 32, 32);
var player2 = new Object("p2","img/Players/idle/p1_idle1.png",0, "blue", Cwidth, 10, 32, 32);

//Generacion suelo
var objSuelo = [];
//suelo nivel bajo
objSuelo.push(new Object("s1_1", "img/Players/idle/p1_idle1.png",1, "rgb(162,207,240)", 32, 576, 32*14, 16));
objSuelo.push(new Object("s1_2", "img/Players/idle/p1_idle1.png",1, "rgb(162,207,240)", 592, 608, 32*3, 16));
objSuelo.push(new Object("s1_3", "img/Players/idle/p1_idle1.png",1, "rgb(162,207,240)", 800, 576, 32*14, 16));
//suelo nivel alto
objSuelo.push(new Object("s2_1", "img/Players/idle/p1_idle1.png",1, "rgb(163,144,189)", 352, 416, 32*3, 32));
objSuelo.push(new Object("s2_2", "img/Players/idle/p1_idle1.png",1, "rgb(163,144,189)", 832, 416, 32*3, 32));
//suelo central
objSuelo.push(new Object("s3", "img/Players/idle/p1_idle1.png",1, "rgb(160,196,154)", 480, 320, 32*10, 32));

var Cofrep1 = new Object("cp1","img/Players/idle/p1_idle1.png",1, "rgb(162,207,240)",60,560,56,16);
var Cofrep2 = new Object("cp2","img/Players/idle/p1_idle1.png",1, "rgb(162,207,240)",1160,560,56,16);

function game(){
    update();
    render();
}

setInterval(function(){
    game();
}, 1000/30)