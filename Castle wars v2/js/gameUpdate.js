var contador = 0;
var contador2 = 0;
var cAcont = 0;
var cAcont2 = 0;

var cstop = 0;
var ms = 0;
var s = 30;
var m = 1;


function update(){
    if(keys[82]){
        location.reload();
    }
    
if(!cstop){
   ms++;
    if((ms%30) == 0){
        ms = 0;
        s--;
        if(s==0){
            if(m == 0){
                //location.reload();
                player1.stuned = 1;
                player2.stuned = 1;
                player1.color = "rgb(96, 52, 52)";
                player2.color = "rgb(52, 60, 96)";
                cstop = 1;
            }else{
            m--;
            s = 59;
            }            
        }
    }
}
    contador++;
    if((contador%30) == 0){
        contador2++;
        //console.log(contador2);
    }

    player1.gravity(objSuelo);
 
    player1.hMove(keys[68], keys[65]);
    player1.atacar(player2,keys[83]);
    player1.saltar(keys[87]);
    player1.mapLimit();
    
    player2.gravity(objSuelo);

    player2.hMove(keys[39], keys[37]);
    player2.atacar(player1,keys[40]);
    player2.saltar(keys[38]);
    player2.mapLimit();
    
    if(!cstop){
        player1.stun();
        player2.stun();
    } 
    
    
//Comer gemas
    //p1
        if(player1.isColliding(Cofrep2)){
            if(!player1.contpunto){
                if(player2.puntos > 0){
                    player2.puntos--;
                    player1.contpunto = 1;
                }
            }
        }
    
        if(player1.isColliding(Cofrep1)){
            if(player1.contpunto){
                    player1.puntos++;
                    player1.contpunto = 0;
            }
        }
    
    //p2
        if(player2.isColliding(Cofrep1)){
            if(!player2.contpunto){
                if(player1.puntos > 0){
                    player1.puntos--;
                    player2.contpunto = 1;
                }
            }
        }
    
        if(player2.isColliding(Cofrep2)){
            if(player2.contpunto){
                    player2.puntos++;
                    player2.contpunto = 0;
            }
        }

    
}