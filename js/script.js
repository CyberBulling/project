let mainWindow, pauseWindow, canvas,scoreWindow,score,leaderboard,leader,settings,restart, context;
let velocity=0,acceleration=0.2, birdX,birdY;
let pipeWidth=80, pipeGap=120, firstPipeX=900,firstPipeY,secondPipeX=1200, thirdPipeX=1500,fourPipeX=1800, secondPipeY,thirdPipeY,fourPipeY, pipeSpeed=2;//change gap and speed for difficulty level
const bird=new Image(), pipeTop=new Image(), pipeBottom=new Image();
const approach=-7;//change for difficulty
bird.src='/img/bird.png';
pipeTop.src='/img/pipeTop.png';
pipeBottom.src='/img/pipeBottom.png';

window.onload = function(){
    mainWindow =document.getElementById('main');
    pauseWindow=document.getElementById('endGame');
    scoreWindow=document.getElementById('score');
    leaderboard=document.getElementById('leaderbord');
    settings=document.getElementById('settings');
    restart=document.getElementById('restart');
    canvas=document.getElementById('canvas');
    context=canvas.getContext('2d');
    firstPipeY=Math.random()*(canvas.height-pipeGap*2)+pipeGap+5;
    secondPipeY=Math.random()*(canvas.height-pipeGap*2)+pipeGap+5;
    thirdPipeY=Math.random()*(canvas.height-pipeGap*2)+pipeGap+5;
    fourPipeY=Math.random()*(canvas.height-pipeGap*2)+pipeGap+5;
    birdX=canvas.width/3;
    birdY=canvas.height/2;
    /*leaderboard.addEventListener('click',showLeaders);
    settings.addEventListener('click',showSettings);
    restart.addEventListener('click',restartGame);*/
    window.addEventListener('load',game());
}

/*function showLeaders(){

}

function showSettings(){

}

function restartGame(){

}*/

document.body.addEventListener('keydown',(event)=>{
    event.stopPropagation();

    if(event.code=='Space'){//change for mobile also
        velocity=approach;
    }
});

function drawPipe(pipeX,pipeY){
    context.drawImage(pipeTop,pipeX,-pipeGap,pipeWidth,pipeY);
    context.drawImage(pipeBottom,pipeX,pipeY+pipeGap,pipeWidth,canvas.height-pipeY);
}

function drawPipes(){
    drawPipe(firstPipeX,firstPipeY);
    drawPipe(secondPipeX,secondPipeY);
    drawPipe(thirdPipeX,thirdPipeY);
    drawPipe(fourPipeX,fourPipeY);
    firstPipeX-=pipeSpeed;
    secondPipeX-=pipeSpeed;
    thirdPipeX-=pipeSpeed;
    fourPipeX-=pipeSpeed;

    if(firstPipeX<-pipeWidth){
        firstPipeX=canvas.width-pipeWidth;
        firstPipeY=Math.random()*(canvas.height-pipeGap*2)+pipeGap+5;
    }
    if(secondPipeX<-pipeWidth){
        secondPipeX=canvas.width-pipeWidth;
        secondPipeY=Math.random()*(canvas.height-pipeGap*2)+pipeGap+5;
    }
    if(thirdPipeX<-pipeWidth){
        thirdPipeX=canvas.width-pipeWidth;
        thirdPipeY=Math.random()*(canvas.height-pipeGap*2)+pipeGap+5;
    }
    if(fourPipeX<-pipeWidth){
        fourPipeX=canvas.width-pipeWidth;
        fourPipeY=Math.random()*(canvas.height-pipeGap*2)+pipeGap+5;
    }

}

function impact(){
    const birdCollision={
        x:birdX,
        y:birdY,
    };

    const firstTopPipe={
        x:firstPipeX,
        y:firstPipeY-pipeGap,
        width:pipeWidth,
        height:firstPipeY
    };

    const firstBottomPipe={
        x:firstPipeX,
        y:firstPipeY-pipeGap,
        width:pipeWidth,
        height:canvas.height-firstPipeY-pipeGap
    };

    const secondTopPipe={
        x:secondPipeX,
        y:secondPipeY-pipeGap,
        width:pipeWidth,
        height:secondPipeY
    };

    const secondBottomPipe={
        x:secondPipeX,
        y:secondPipeY-pipeGap,
        width:pipeWidth,
        height:canvas.height-secondPipeY-pipeGap
    };

    const thirdTopPipe={
        x:thirdPipeX,
        y:thirdPipeY-pipeGap,
        width:pipeWidth,
        height:thirdPipeY
    };

    const thirdBottomPipe={
        x:thirdPipeX,
        y:thirdPipeY-pipeGap,
        width:pipeWidth,
        height:canvas.height-thirdPipeY-pipeGap
    };

    const fourTopPipe={
        x:fourPipeX,
        y:fourPipeY-pipeGap,
        width:pipeWidth,
        height:fourPipeY
    };

    const fourBottomPipe={
        x:fourPipeX,
        y:fourPipeY-pipeGap,
        width:pipeWidth,
        height:canvas.height-fourPipeY-pipeGap
    };

    if(
        birdCollision.x+bird.width>firstTopPipe.x &&
        birdCollision.x>firstTopPipe.x+firstTopPipe.width &&
        birdCollision.yfirstTopPipe.y
    ){
        return true;
    }

    if(
        birdCollision.x+bird.width>secondTopPipe.x &&
        birdCollision.x>secondTopPipe.x+secondTopPipe.width &&
        birdCollision.y-bird.height<secondTopPipe.y
    ){
        return true;
    }

    if(
        birdCollision.x+bird.width>thirdTopPipe.x &&
        birdCollision.x>thirdTopPipe.x+thirdTopPipe.width &&
        birdCollision.y-bird.height<thirdTopPipe.y
    ){
        return true;
    }

    if(
        birdCollision.x+bird.width>fourTopPipe.x &&
        birdCollision.x>fourTopPipe.x+fourTopPipe.width &&
        birdCollision.y-bird.height<fourTopPipe.y
    ){
        return true;
    }

    if(
        birdCollision.x+bird.width>firstBottomPipe.x &&
        birdCollision.x>firstBottomPipe.x+firstBottomPipe.width &&
        birdCollision.y+bird.height*2>firstBottomPipe.y
    ){
        return true;
    }

    if(
        birdCollision.x+bird.width>secondBottomPipe.x &&
        birdCollision.x>secondBottomPipe.x+secondBottomPipe.width &&
        birdCollision.y+bird.height*2>secondBottomPipe.y
    ){
        return true;
    }

    if(
        birdCollision.x+bird.width>thirdBottomPipe.x &&
        birdCollision.x>thirdBottomPipe.x+thirdBottomPipe.width &&
        birdCollision.y+bird.height*2>thirdBottomPipe.y
    ){
        return true;
    }

    if(
        birdCollision.x+bird.width>fourBottomPipe.x &&
        birdCollision.x>fourBottomPipe.x+fourBottomPipe.width &&
        birdCollision.y+bird.height*2>fourBottomPipe.y
    ){
        return true;
    }
    return false;

}

function game(){
    context.clearRect(0,0,canvas.width,canvas.height);
    context.drawImage(bird,birdX,birdY);

    drawPipes();
    console.log(bird.width)

    if(impact()){
        return
    }

    velocity+=acceleration;
    birdY+=velocity;


    requestAnimationFrame(game);
}
