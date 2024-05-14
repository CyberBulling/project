let mainWindow, pauseWindow, canvas,scoreWindow,score,leaderboard,leader,settings,restart, context;
let velocity=0,acceleration=0.2, birdX,birdY;
let pipeWidth=80, pipeGap=120, firstPipeX=900,firstPipeY,secondPipeX=1200, thirdPipeX=1500,fourPipeX=1800, secondPipeY,thirdPipeY,fourPipeY, pipeSpeed=5;//change gap and speed for difficulty level
const bird=new Image();
const approach=-7;//change for difficulty
bird.src='/img/bird.png';

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
    context.fillStyle='#02a203';
    context.fillRect(pipeX,-100,pipeWidth,pipeY);
    context.fillRect(pipeX,pipeY+pipeGap,pipeWidth,canvas.height-pipeY);
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

function game(){
    context.clearRect(0,0,canvas.width,canvas.height);
    context.drawImage(bird,birdX,birdY);

    drawPipes();

    velocity+=acceleration;
    birdY+=velocity;


    requestAnimationFrame(game);
}
