var img = {};
img.Fondo = new Image();
img.Fondo.src = "img/Mapa/00Fondo.png";
img.Nube1 = new Image();
img.Nube1.src = "img/Mapa/01Nube1.png";
img.Nube2 = new Image();
img.Nube2.src = "img/Mapa/02Nube2.png";
img.Castillos = new Image();
img.Castillos.src = "img/Mapa/03Castillos.png";
img.Montania = new Image();
img.Montania.src = "img/Mapa/04Montanias.png";
img.Luz = new Image();
img.Luz.src = "img/Mapa/05Luz.png";
img.Islas = new Image();
img.Islas.src = "img/Mapa/06Islas.png";
img.CofreB = new Image();
img.CofreB.src = "img/Mapa/07CofreB.png";
img.CofreF = new Image();
img.CofreF.src = "img/Mapa/08CofreF.png";
img.Pasto = new Image();
img.Pasto.src = "img/Mapa/09Pasto.png";
img.Luz2 = new Image();
img.Luz2.src = "img/Mapa/10Luz2.png";
img.Nube3 = new Image();
img.Nube3.src = "img/Mapa/11Nube3.png";
img.Gema1 = new Image();
img.Gema1.src = "img/Gemas/p1_Gema.png";
img.Gema2 = new Image();
img.Gema2.src = "img/Gemas/p2_Gema.png";

var Nube1 = [];
Nube1[0] = new fNube(1,0,0);
Nube1[1] = new fNube(1,1280,0);
var Nube2 = [];
Nube2[0] = new fNube(2,0,0);
Nube2[1] = new fNube(2,1280,0);
var Nube3 = [];
Nube3[0] = new fNube(3,0,0);
Nube3[1] = new fNube(3,1280,0);

function fNube(nube,x,y){
    switch(nube) {
        case 1:
            this.img = img.Nube1;
            this.x = x;
            this.y = y;
            break;
        case 2:
            this.img = img.Nube2;
            this.x = x;
            this.y = y;
            break;
        case 3:
            this.img = img.Nube3;
            this.x = x;
            this.y = y;
            break;
    }
}
