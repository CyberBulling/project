let mainWindow, pauseWindow, canvas,scoreWindow,score,leaderboard,leader,settings,restart;
const bird=new Image();
bird.src='/img/bird.png';

window.onload = function(){
    mainWindow =document.getElementById('main');
    pauseWindow=document.getElementById('endGame');
    scoreWindow=document.getElementById('score');
    leaderboard=document.getElementById('leaderbord');
    settings=document.getElementById('settings');
    restart=document.getElementById('restart');
    canvas=document.getElementById('canvas');
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

function game(){
    canvas;
    const context=canvas.getContext('2d');

    context.drawImage(bird,10,50,70,50);

    requestAnimationFrame(game);
}
