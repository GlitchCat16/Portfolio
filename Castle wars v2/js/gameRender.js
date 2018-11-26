function render(){ 
    ctx.clearRect(0,0,Cwidth,Cheight);
    //Dibujar Mundo
    ctx.drawImage(img.Fondo,0,0); //fondo
    
    //dibujo nube1
    for(var i = 0; i < Nube1.length; i++){
        var n = Nube1[i];
        ctx.drawImage(n.img,n.x,n.y);
        n.x -= 0.5;
        if((n.x+n.img.width) <= 0){
            Nube1[i] = new fNube(1,1279,0);            
        }
    }
    
    //dibujo nube2
    for(var i = 0; i < Nube2.length; i++){
        var n = Nube2[i];
        ctx.drawImage(n.img,n.x,n.y);
        n.x -= 1.5;
        if((n.x+n.img.width) <= 0){
            Nube2[i] = new fNube(2,1279,0);            
        }
    }
    
    ctx.drawImage(img.Castillos,0,0);//Castillo
    ctx.drawImage(img.Montania,0,0);//Montañas
    ctx.drawImage(img.Luz,0,0);//Luz
    ctx.drawImage(img.Islas,0,0);//Islas
    
        //Dibujo cronometro
    if(s < 10){
        var s2 = "0"+s;
    }else{
        var s2 = s;
    }
ctx.font="80px Comic Sans MS";
ctx.fillStyle = "red";
ctx.textAlign = "center";
ctx.fillText(m+" : "+s2, Cwidth/2, 112);
    
ctx.font="40px Comic Sans MS";
ctx.fillStyle = "red";
ctx.textAlign = "center";
ctx.fillText(player1.puntos, 88, 626);
    
ctx.font="40px Comic Sans MS";
ctx.fillStyle = "red";
ctx.textAlign = "center";
ctx.fillText(player2.puntos, 1191,626);
    
    ctx.drawImage(img.CofreB,0,0);//CofreB
    
    if(player1.puntos > 4){
        var p = 4;
    }else{
        var p = player1.puntos
    }
    for(var i = 0; i < p; i++){
        ctx.drawImage(img.Gema1,64+(i*8),543);
    }
    
    if(player2.puntos > 4){
        var p2 = 4;
    }else{
        var p2 = player2.puntos
    }
    for(var i = 0; i < p2; i++){
        ctx.drawImage(img.Gema2,1176+(i*8),543);
    }
    
    ctx.drawImage(img.CofreF,0,0);//CofreF
    
    //Players
    //Dibujar Jugador
    /*ctx.fillStyle = player1.color;
    ctx.fillRect(player1.x,player1.y,player1.width,player1.height);
    ctx.fillStyle = player2.color;
    ctx.fillRect(player2.x,player2.y,player2.width,player2.height);*/
    
    //Player1
    var cx = Math.floor(player1.sprAniCont % (player1.img.width/64));
    player1.sprAniCont += player1.sprAniContS;
    ctx.drawImage(player1.img,cx*64,0,64,64,player1.x-16,player1.y-28,64,64);
    
    //Player2
    var cx2 = Math.floor(player2.sprAniCont % (player2.img.width/64));
    player2.sprAniCont += player2.sprAniContS;
    ctx.drawImage(player2.img,cx2*64,0,64,64,player2.x-16,player2.y-28,64,64);
    //
    
    ctx.drawImage(img.Pasto,0,0);//Pasto
    
    //dibujo nube3
    for(var i = 0; i < Nube3.length; i++){
        var n = Nube3[i];
        ctx.drawImage(n.img,n.x,n.y);
        n.x -= 3;
        if((n.x+n.img.width) <= 0){
            Nube3[i] = new fNube(3,1279,0);            
        }
    }
    
    ctx.drawImage(img.Luz2,0,0);//Luz2
    
    /*ctx.fillStyle = Cofrep1.color;
    ctx.fillRect(Cofrep1.x,Cofrep1.y,Cofrep1.width,Cofrep1.height);
    ctx.fillStyle = Cofrep2.color;
    ctx.fillRect(Cofrep2.x,Cofrep2.y,Cofrep2.width,Cofrep2.height);*/
    
    //Dibujar Suelo
    /*for(var i = 0; i < objSuelo.length; i++){
        ctx.fillStyle = objSuelo[i].color;
        ctx.fillRect(objSuelo[i].x,objSuelo[i].y,objSuelo[i].width,objSuelo[i].height);
    }*/
    
}