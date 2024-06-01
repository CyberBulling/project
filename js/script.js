let mainWindow,pauseWindow,canvas,scoreWindow,leaderButton,settings,restart,context, scoreInput,leaderboard, helloWindow,settings2,leaderButton2,restart2;
let velocity=0,acceleration=0.2,score=0,birdX,birdY, scoreTmp=0, firstPipeScore, alsoPipeScore;
let pipeWidth=80,pipeGap=120,pipeXGap=300,firstPipeX,secondPipeX,thirdPipeX,fourPipeX,firstPipeY,secondPipeY,thirdPipeY,fourPipeY,pipeSpeed=2;
let struct=[],tagName="Player 1";
const bird=new Image(),pipeTop=new Image(),pipeBottom=new Image(), backgroundImage=new Image();
let approach=-7;
bird.src='/img/bird.png';

if(localStorage.getItem('theme')=='light'){
    backgroundImage.src='/img/background-day-big.jpg';
}
else{
    backgroundImage.src='/img/background-night-big.jpg';
}
pipeTop.src='/img/pipeTop.png';
pipeBottom.src='/img/pipeBottom.png';

window.onload = function(){
    mainWindow =document.getElementById('main');
    pauseWindow=document.getElementById('endGame');
    scoreInput=document.getElementById('score');
    leaderButton=document.getElementById('leaderboard');
    leaderboard=document.getElementById('leaders');
    settingsWindow=document.getElementById('settingsWindow');
    settings=document.getElementById('settings');
    restart=document.getElementById('restart');
    helloWindow=document.getElementById('hello');
    settings2=document.getElementById('settings2');
    leaderButton2=document.getElementById('leaderboard2');
    restart2=document.getElementById('restart2');
    canvas=document.getElementById('canvas');
    context=canvas.getContext('2d');
    firstPipeX=canvas.width;
    secondPipeX=canvas.width+pipeXGap;
    thirdPipeX=canvas.width+pipeXGap*2;
    fourPipeX=canvas.width+pipeXGap*3;
    firstPipeY=Math.random()*(canvas.height-pipeGap*2)+pipeGap+5;
    secondPipeY=Math.random()*(canvas.height-pipeGap*2)+pipeGap+5;
    thirdPipeY=Math.random()*(canvas.height-pipeGap*2)+pipeGap+5;
    fourPipeY=Math.random()*(canvas.height-pipeGap*2)+pipeGap+5;
    birdX=canvas.width/3;
    birdY=canvas.height/2;
    firstPipeScore=(firstPipeX-birdX+pipeWidth)/2+bird.width;
    alsoPipeScore=(pipeXGap+bird.width)/2;
    

    leaderButton.addEventListener('click',showLeaders);
    settings.addEventListener('click',showSettings);
    restart.addEventListener('click',restartGame);

    leaderButton2.addEventListener('click',showLeaders2);
    settings2.addEventListener('click',showSettings2);
    restart2.addEventListener('click',restartGame);

    canvas.addEventListener('click', (event) => {
        const x = event.clientX - canvas.offsetLeft;
        const y = event.clientY - canvas.offsetTop;
        if (x >= 0 && x < canvas.width && y >= 0 && y < canvas.height) {
          velocity = approach;
        }
    });
    const now = new Date();
    const hours=now.getHours();
    if (hours >= 19 || hours<=8) {
        document.documentElement.setAttribute('data-theme', 'dark');
        backgroundImage.src = '/img/background-night-big.jpg';
    }
    tagName=localStorage.getItem('tagName');
    difficultyChange();
    if(localStorage.getItem('theme')==undefined){
        localStorage.setItem('theme', 'light');
    }
    document.querySelector('html').setAttribute('data-theme',localStorage.getItem('theme'));
}

function difficultyChange(){
    switch(localStorage.getItem('difficulty')){
        case 'easy':
            pipeGap=150;
            pipeXGap=350;
            acceleration=0.15;
            pipeSpeed=1.5;
            approach=-6;
            break;
        case 'hard':
            pipeGap=100;
            pipeXGap=250;
            acceleration=0.25;
            pipeSpeed=2.5;
            approach=-8;
            break;
        default:
            pipeGap=120;
            pipeXGap=300;
            acceleration=0.2;
            pipeSpeed=2;
            approach=-7;
            break;
    }
}

function showLeaders(){
    leaderboard.style.zIndex=2;
    pauseWindow.style.zIndex=-1;
    const leaderBoardMassive=JSON.parse(localStorage.getItem('leaderboard'));
    leaderBoardMassive.sort(function(a,b){return b.score-a.score});
    const list=document.createElement('ol');
    const exit =document.createElement('button');
    exit.textContent='Ok';
    exit.addEventListener('click',()=>{
        leaderboard.style.zIndex=-1;
        pauseWindow.style.zIndex=2;
        leaderboard.innerHTML='';
    });
    leaderboard.appendChild(list);
    const title=document.createElement('li');
    title.textContent='TOP 10 Players';
    title.classList.add('title');
    list.append(title);
    for(let i=0;i<Math.min(leaderBoardMassive.length,10);i++){
        const leader=document.createElement('li');
        const tn=document.createElement('a');
        const diff=document.createElement('a');
        const sc=document.createElement('a');
        tn.classList.add('tagName');
        tn.textContent=leaderBoardMassive[i].tagName;
        diff.classList.add('difficulty');
        diff.textContent=leaderBoardMassive[i].difficultyForLeader;
        sc.classList.add('score');
        sc.textContent=leaderBoardMassive[i].score;
        leader.append(tn,diff,sc);
        leader.classList.add('leader');
        list.appendChild(leader);
    }
    leaderboard.appendChild(exit);
}
function showLeaders2(){
    leaderboard.style.zIndex=3;
    helloWindow.style.zIndex=-1;
    const leaderBoardMassive=JSON.parse(localStorage.getItem('leaderboard'));
    leaderBoardMassive.sort(function(a,b){return b.score-a.score});
    const list=document.createElement('ol');
    const exit =document.createElement('button');
    exit.textContent='Ok';
    exit.addEventListener('click',()=>{
        leaderboard.style.zIndex=-1;
        helloWindow.style.zIndex=3;
        leaderboard.innerHTML='';
    });
    leaderboard.appendChild(list);
    const title=document.createElement('li');
    title.textContent='TOP 10 Players';
    title.classList.add('title');
    list.append(title);
    for(let i=0;i<Math.min(leaderBoardMassive.length,10);i++){
        const leader=document.createElement('li');
        const tn=document.createElement('a');
        const diff=document.createElement('a');
        const sc=document.createElement('a');
        tn.classList.add('tagName');
        tn.textContent=leaderBoardMassive[i].tagName;
        diff.classList.add('difficulty');
        diff.textContent=leaderBoardMassive[i].difficultyForLeader;
        sc.classList.add('score');
        sc.textContent=leaderBoardMassive[i].score;
        leader.append(tn,diff,sc);
        leader.classList.add('leader');
        list.appendChild(leader);
    }
    leaderboard.appendChild(exit);
}

function showSettings(){
    settingsWindow.style.zIndex=2;
    pauseWindow.style.zIndex=-1;
    const theme=document.createElement('div');
    const themeLight = document.createElement('div');
    const themeDark = document.createElement('div');
    themeLight.classList.add('themeLight');
    themeDark.classList.add('themeDark');
    themeLight.innerHTML='Switch to light theme';
    themeDark.innerHTML='Switch to dark theme';
    if(localStorage.getItem('theme')=='light'){
        themeLight.classList.add('choised');
    }
    else{
        themeDark.classList.add('choised');
    }
    themeLight.addEventListener('click',()=>{
        themeDark.classList.remove('choised');
        themeLight.classList.add('choised');
        localStorage.setItem('theme', 'light');
        document.querySelector('html').setAttribute('data-theme',localStorage.getItem('theme'));
        backgroundImage.src = '/img/background-day-big.jpg';
    });
    themeDark.addEventListener('click',()=>{
        themeLight.classList.remove('choised');
        themeDark.classList.add('choised');
        localStorage.setItem('theme', 'dark');
        document.querySelector('html').setAttribute('data-theme',localStorage.getItem('theme'));
        backgroundImage.src = '/img/background-night-big.jpg';
    });
    theme.classList.add('theme');
    theme.appendChild(themeLight);
    theme.appendChild(themeDark);
    const exit =document.createElement('button');
    exit.textContent='Save';
    exit.addEventListener('click',()=>{
        pauseWindow.style.zIndex=2;
        settingsWindow.style.zIndex=-1;
        settingsWindow.innerHTML='';
    });
    const playerTagName=document.createElement('input');
    playerTagName.type='text';
    playerTagName.name='tagName';
    playerTagName.value=tagName;
    playerTagName.addEventListener('change',()=>{
        localStorage.setItem('tagName',playerTagName.value);
        tagName=localStorage.getItem('tagName');
    });
    const tagNameLabel=document.createElement('label');
    tagNameLabel.textContent='Your Name: ';
    tagNameLabel.setAttribute('for','tagName');
    const playerInfoDiv=document.createElement('div');
    playerInfoDiv.classList.add('playerInfo')
    playerInfoDiv.appendChild(tagNameLabel);
    playerInfoDiv.appendChild(playerTagName);
    const difficulty=document.createElement('div');
    difficulty.classList.add('difficulty');
    const levelOne=document.createElement('div');
    levelOne.classList.add('levelOne');
    levelOne.textContent='Easy';
    levelOne.addEventListener('click',()=>{
        levelOne.classList.add('choised');
        levelTwo.classList.remove('choised');
        levelThree.classList.remove('choised');
        localStorage.setItem('difficulty','easy');
        difficultyChange();
    });
    const levelTwo=document.createElement('div');
    levelTwo.classList.add('levelTwo');
    levelTwo.textContent='Normal';
    levelTwo.addEventListener('click',()=>{
        levelOne.classList.remove('choised');
        levelTwo.classList.add('choised');
        levelThree.classList.remove('choised');
        localStorage.setItem('difficulty','normal');
        difficultyChange();
    });
    const levelThree=document.createElement('div');
    levelThree.classList.add('levelThree');
    levelThree.textContent='Hard';
    levelThree.addEventListener('click',()=>{
        levelOne.classList.remove('choised');
        levelTwo.classList.remove('choised');
        levelThree.classList.add('choised');
        localStorage.setItem('difficulty','hard');
        difficultyChange();
    });
    switch(localStorage.getItem('difficulty')){
        case 'easy':
            levelOne.classList.add('choised');
            break;
        case 'hard':
            levelThree.classList.add('choised');
            break;
        default:
            levelTwo.classList.add('choised');
            break;
    }
    difficulty.appendChild(levelOne);
    difficulty.appendChild(levelTwo);
    difficulty.appendChild(levelThree);
    settingsWindow.appendChild(playerInfoDiv);
    settingsWindow.appendChild(difficulty);
    settingsWindow.appendChild(theme);
    settingsWindow.appendChild(exit);
}

function showSettings2(){
    settingsWindow.style.zIndex=3;
    helloWindow.style.zIndex=-1;
    const theme=document.createElement('div');
    const themeLight = document.createElement('div');
    const themeDark = document.createElement('div');
    themeLight.classList.add('themeLight');
    themeLight.innerHTML='Switch to light theme';
    themeDark.innerHTML='Switch to dark theme';
    themeDark.classList.add('themeDark');
    if(localStorage.getItem('theme')=='light'){
        themeLight.classList.add('choised');
    }
    else{
        themeDark.classList.add('choised');
    }
    themeLight.addEventListener('click',()=>{
        themeDark.classList.remove('choised');
        themeLight.classList.add('choised');
        localStorage.setItem('theme', 'light');
        document.querySelector('html').setAttribute('data-theme',localStorage.getItem('theme'));
        backgroundImage.src = '/img/background-day-big.jpg';
    });
    themeDark.addEventListener('click',()=>{
        themeLight.classList.remove('choised');
        themeDark.classList.add('choised');
        localStorage.setItem('theme', 'dark');
        document.querySelector('html').setAttribute('data-theme',localStorage.getItem('theme'));
        backgroundImage.src = '/img/background-night-big.jpg';
    });
    theme.classList.add('theme');
    theme.appendChild(themeLight);
    theme.appendChild(themeDark);
    const exit =document.createElement('button');
    exit.textContent='Save';
    exit.addEventListener('click',()=>{
        helloWindow.style.zIndex=3;
        settingsWindow.style.zIndex=-1;
        settingsWindow.innerHTML='';
    });
    const playerTagName=document.createElement('input');
    playerTagName.type='text';
    playerTagName.name='tagName';
    playerTagName.value=tagName;
    playerTagName.addEventListener('change',()=>{
        localStorage.setItem('tagName',playerTagName.value);
        tagName=localStorage.getItem('tagName');
    });
    const tagNameLabel=document.createElement('label');
    tagNameLabel.textContent='Your Name: ';
    tagNameLabel.setAttribute('for','tagName');
    const playerInfoDiv=document.createElement('div');
    playerInfoDiv.classList.add('playerInfo')
    playerInfoDiv.appendChild(tagNameLabel);
    playerInfoDiv.appendChild(playerTagName);
    const difficulty=document.createElement('div');
    difficulty.classList.add('difficulty');
    const levelOne=document.createElement('div');
    levelOne.classList.add('levelOne');
    levelOne.textContent='Easy';
    levelOne.addEventListener('click',()=>{
        levelOne.classList.add('choised');
        levelTwo.classList.remove('choised');
        levelThree.classList.remove('choised');
        localStorage.setItem('difficulty','easy');
        difficultyChange();
    });
    const levelTwo=document.createElement('div');
    levelTwo.classList.add('levelTwo');
    levelTwo.textContent='Normal';
    levelTwo.addEventListener('click',()=>{
        levelOne.classList.remove('choised');
        levelTwo.classList.add('choised');
        levelThree.classList.remove('choised');
        localStorage.setItem('difficulty','normal');
        difficultyChange();
    });
    const levelThree=document.createElement('div');
    levelThree.classList.add('levelThree');
    levelThree.textContent='Hard';
    levelThree.addEventListener('click',()=>{
        levelOne.classList.remove('choised');
        levelTwo.classList.remove('choised');
        levelThree.classList.add('choised');
        localStorage.setItem('difficulty','hard');
        difficultyChange();
    });
    switch(localStorage.getItem('difficulty')){
        case 'easy':
            levelOne.classList.add('choised');
            break;
        case 'hard':
            levelThree.classList.add('choised');
            break;
        default:
            levelTwo.classList.add('choised');
            break;
    }
    difficulty.appendChild(levelOne);
    difficulty.appendChild(levelTwo);
    difficulty.appendChild(levelThree);
    settingsWindow.appendChild(playerInfoDiv);
    settingsWindow.appendChild(difficulty);
    settingsWindow.appendChild(theme);
    settingsWindow.appendChild(exit);
}
function restartGame(){
    pauseWindow.style.zIndex=-1;
    helloWindow.style.zIndex=-1;
    scoreInput.innerHTML=scoreInput.textContent.slice(0,12)+Number(score);
    velocity=0, score=0;
    birdY=canvas.height/2;
    firstPipeX=canvas.width;
    secondPipeX=canvas.width+300;
    thirdPipeX=canvas.width+600;
    fourPipeX=canvas.width+900;
    mainWindow.style.zIndex=2;
    mainWindow.classList.remove('blured');
    game();
}

document.body.addEventListener('keydown',(event)=>{
    event.stopPropagation();

    if(event.code=='Space'){
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
        y:firstPipeY,
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
        y:secondPipeY,
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
        y:thirdPipeY,
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
        y:fourPipeY,
        width:pipeWidth,
        height:canvas.height-fourPipeY-pipeGap
    };

    if(
        birdCollision.x+bird.width>firstTopPipe.x &&
        birdCollision.x<firstTopPipe.x+firstTopPipe.width &&
        birdCollision.y-5<firstTopPipe.y
    ){
        return true;
    }

    if(
        birdCollision.x+bird.width>secondTopPipe.x &&
        birdCollision.x<secondTopPipe.x+secondTopPipe.width &&
        birdCollision.y-5<secondTopPipe.y
    ){
        return true;
    }

    if(
        birdCollision.x+bird.width>thirdTopPipe.x &&
        birdCollision.x<thirdTopPipe.x+thirdTopPipe.width &&
        birdCollision.y-5<thirdTopPipe.y
    ){
        return true;
    }

    if(
        birdCollision.x+bird.width>fourTopPipe.x &&
        birdCollision.x<fourTopPipe.x+fourTopPipe.width &&
        birdCollision.y-5<fourTopPipe.y
    ){
        return true;
    }

    if(
        birdCollision.x+bird.width>firstBottomPipe.x &&
        birdCollision.x<firstBottomPipe.x+firstBottomPipe.width &&
        birdCollision.y-15>firstBottomPipe.y+bird.height
    ){
        return true;
    }

    if(
        birdCollision.x+bird.width>secondBottomPipe.x &&
        birdCollision.x<secondBottomPipe.x+secondBottomPipe.width &&
        birdCollision.y-15>secondBottomPipe.y+bird.height
    ){
        return true;
    }

    if(
        birdCollision.x+bird.width>thirdBottomPipe.x &&
        birdCollision.x<thirdBottomPipe.x+thirdBottomPipe.width &&
        birdCollision.y-15>thirdBottomPipe.y+bird.height
    ){
        return true;
    }

    if(
        birdCollision.x+bird.width>fourBottomPipe.x &&
        birdCollision.x<fourBottomPipe.x+fourBottomPipe.width &&
        birdCollision.y-15>fourBottomPipe.y+bird.height
    ){
        return true;
    }

    if(birdCollision.y<0||birdCollision.y>canvas.height-bird.height){
        return true;
    }
    return false;

}

function game(){
    context.mozImageSmoothingEnabled = false;
    context.webkitImageSmoothingEnabled = false;
    context.msImageSmoothingEnabled = false;
    context.imageSmoothingEnabled = false;
    context.clearRect(0,0,canvas.width,canvas.height);
    context.drawImage(backgroundImage,0,0,canvas.width,canvas.height);
    context.drawImage(bird,birdX,birdY);
    console.log(score);
    drawPipes();

    if(impact()){
        mainWindow.style.zIndex=1;
        pauseWindow.style.zIndex=2;
        mainWindow.classList.add('blured');
        const difficultyForLeader=localStorage.getItem('difficulty');
        struct.push({tagName,score,difficultyForLeader});
        localStorage.setItem('leaderboard', JSON.stringify(struct));
        scoreInput.innerHTML=scoreInput.textContent.slice(0,scoreInput.textContent.length-1)+Number(score);
        score=0;
        console.clear();
        return
    }
    
    scoreTmp++;
    if(score==0&&scoreTmp==firstPipeScore){
        scoreTmp=0;
        score++;
        
    }
    if(score>0&&scoreTmp==alsoPipeScore){
        scoreTmp=0;
        score++;
    }

    velocity+=acceleration;
    birdY+=velocity;

    requestAnimationFrame(game);
}
