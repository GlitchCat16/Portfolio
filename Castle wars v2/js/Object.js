function Object(id,img,look, color, x, y, w, h){
   this.id = id;
    this.img = new Image();
    this.img.src = img;
    this.color = color;
    this.colorb = color;
    
    this.x=x;
    this.y=y;
    this.width = w;
    this.height = h;
    this.acel = 1;
    this.spd = 15;
    this.grav = 2;
    this.hsp = 0;
    this.hspd = 0;
    this.look = look;
    this.vsp = 0;
    this.vspd = 0;
    this.bounce = 0.15;
    this.suelo = 0;
    this.jumps = 0;
    this.jumpsmax = 1;
    this.jumpspeed = 30;
    this.Scont = 1;
    this.atack = 0;//variables de ataque
    this.Acont = 1;
    this.cAcont = 0;
    this.cAcont2 = 0;
    this.stuned = 0;//variables stun
    this.cScont = 0;
    this.sprAniCont = 0;
    this.sprAniContS = 0.05;
    
    this.puntos = 4;
    this.contpunto = 0;
    this.rp = 1;
    //Sistema de Colision, Gravedad y Margenes del mapa
//Colision
this.isColliding = function(obj){
        if(this.x > obj.x + obj.width) return false;
        if(this.x + this.width < obj.x) return false;
        if(this.y > obj.y + obj.height) return false;
        if(this.y + this.height < (obj.y-50)) return false;
        return true;

}
//Gravedad
this.gravity = function(obj){
var ob = false;
var obj1 = 0;
var ob2 = 2000;
for(var i=0; i< obj.length; i++){
    if(this.isColliding(obj[i])){
        ob = true;
        ob2 = obj[i].y;
        obj1 = obj[i];
        break;
    }
}
    if(!ob){
        this.suelo = 0;
    }
    if(!this.suelo){
        if(this.vspd < 30){
            this.vspd += this.grav;
        }
        this.y += this.vsp + this.vspd;

        this.hitBottom(ob2, obj1);
    }
}

//Rebote con el suelo
this.hitBottom = function(objY, obj1) {
        var rockbottom = objY - this.height;
    if(this.y < objY){
        if (this.y >= rockbottom) {
            
            this.y = rockbottom;
            //console.log(p.vspd);
            this.vspd = -(this.vspd * this.bounce);
            if(this.vspd < 0 && this.vspd > -0.26){
                this.vspd = 0;
                this.spd = 15;
                this.suelo = 1;
            }
        }
    }
    if(this.y > objY){
        this.y = obj1.y + obj1.height+1;
        this.vspd = 0;
    }
}
//Limites del mapa
this.mapLimit = function(){
    if(this.x < 80)this.x = 80;
    if(this.y < 0)this.y = 0;
    if(this.x >= (1200 - this.width)) this.x = (1200 - this.width);
    //if(this.x >= (Cwidth - this.width) - 32) this.x = (Cwidth - this.width) - 32;
    if(this.y >= (Cheight - this.height) + 32) this.y = -32; 
}

    //Movimientos Personaje
//Movimiento Horizontal
this.hMove = function(keyR,keyL){
    if(!this.stuned){
        if(keyR){
            this.rp = 1;
            this.look = 1;
            if(this.contpunto){
                this.img.src = "img/Players/Run/"+this.id+"_run2.png"
            }else{
            this.img.src = "img/Players/Run/"+this.id+"_run1.png"
            }
            this.sprAniContS = 0.5;            
        }
        if(keyL){
            this.rp = 1;
            this.look = 0;
            if(this.contpunto){
                this.img.src = "img/Players/Run/"+this.id+"_run2_2.png"
            }else{
            this.img.src = "img/Players/Run/"+this.id+"_run1_2.png"
            }
            this.sprAniContS = 0.5;            
        }
        if(keyR || keyL){
            if(this.hsp >= this.spd){
                this.hsp = this.spd;
            }else{
                this.hsp += this.acel;
            }
        }
        //Movimiento lateral
        this.hspd = (keyR-keyL)*this.hsp;
        if(!this.hspd) {
            this.hsp = 0;
            if(this.look){
                if(this.contpunto){
                    this.img.src = "img/Players/idle/"+this.id+"_idle2.png"
                }else{
                this.img.src = "img/Players/idle/"+this.id+"_idle1.png"
                }
                this.sprAniContS = 0.05;
            }else{
                if(this.contpunto){
                    this.img.src = "img/Players/idle/"+this.id+"_idle2_2.png"
                }else{
                this.img.src = "img/Players/idle/"+this.id+"_idle1_2.png"
                }
                this.sprAniContS = 0.05;
            }
        }
        this.x += this.hspd;
    }
}

//Salto
this.saltar = function(keyS) {
    if(!this.stuned){
        if(!this.stuned){
            if(this.suelo){
                this.jumps = this.jumpsmax;
                this.suelo = 0;
                this.Scont=1;
                //console.log(keyS)
            }else{
                if(this.jumps == this.jumpsmax) this.jumps -=1;
            }

            if(keyS && this.jumps > 0 && this.Scont==1){
                this.jumps -= 1;
                this.Scont=2;
                this.spd = this.spd/2;
                this.vspd = -this.jumpspeed;
                //console.log(this.vspd)
            }

            if(this.vspd < 0 && !keyS && this.Scont ==2){
                this.vspd = Math.max(this.vspd, -(this.jumpspeed/4));
                this.Scont=1;
            }
        }
    }
}
//Atacar
this.atacar = function(obj,keyA){
    if(!this.stuned){
        if(keyA){
            if(this.Acont){
                this.atack = 1;
                this.Acont = 0;
            }
        }
    }
        if(!this.Acont){
            this.cAcont2++
            if((this.cAcont2%(30*3))==0){
                this.Acont = 1;
                this.cAcont2 = 0;
            }
        }

        if(this.atack){
            if(this.look){
                this.img.src = "img/Players/Roll/"+this.id+"_roll.png"
                this.sprAniContS = 0.5;
                this.x += 30;
                this.cAcont ++;
                if(this.isColliding(obj)){
                    obj.stuned = 1;
                    obj.contpunto = 0;
                    if(this.rp){
                        console.log("bla")
                        this.puntos++;
                        this.rp = 0;
                    }
                }
                if((this.cAcont%(30/6)) == 0){
                    this.atack = 0;
                    this.cAcont = 0;
                }
            }else{
                this.img.src = "img/Players/Roll/"+this.id+"_roll_2.png"
                this.sprAniContS = 0.5;
                this.x -= 30;
                this.cAcont ++;
                if(this.isColliding(obj)){
                    obj.stuned = 1;
                    obj.contpunto = 0;
                    if(this.rp){
                        console.log("bla2")
                        this.puntos++;
                        this.rp = 0;
                    }
                }
                if((this.cAcont%(30/6)) == 0){
                    this.atack = 0;
                    this.cAcont = 0;
                }            
            }
        }
}

//stun
this.stun = function(){
    if(this.stuned && !cstop){
        
        if(this.look){

            this.img.src = "img/Stun/"+this.id+"_stun.png" 
        }else{
            this.img.src = "img/Stun/"+this.id+"_stun_2.png" 
        }
        this.sprAniContS = 0.05;

        
        this.cScont++
        if((this.cScont%(30*2))==0){
            this.stuned = 0;
            this.color = this.colorb;
            this.cScont = 0;
        }
        
    }
}
    
}