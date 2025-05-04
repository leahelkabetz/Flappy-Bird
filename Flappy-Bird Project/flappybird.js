
const body = document.getElementsByTagName('body');
const playerScore = document.getElementById('playerScore');
const heart1 = document.getElementById('heart1');
const heart2 = document.getElementById('heart2');
const heart3 = document.getElementById('heart3');
const bird = document.getElementById('bird');
const pipeUp = document.getElementById('pipesUp');
const pipeDown = document.getElementById('pipesDown');
const disconnect = document.getElementById('disconnect');
const gameOver = document.getElementById('gameOver');
const blurGameOver = document.getElementById('blurGameOver');

//audio
const audioCrashBird = new Audio("./audio/crashBird.mp3");
const audioGameOver = new Audio("./audio/gameOver.mp3");
const audioMusic = new Audio("./audio/musicFlappyBird.mp3");

//score
//מתקבל מערך מהלוקל
const players = JSON.parse(localStorage.getItem('players'));
let currentUser = localStorage.getItem('currentUser');
currentUser = JSON.parse(currentUser);
let intervalIdScore;
let score = 0;
const funcScore = () => {

    intervalIdScore = setInterval(() => {
        playerScore.innerText = `hi ${currentUser.userName}! Your heightscore is ${currentUser.heighscore}!!      Now your score is ${score++}`;

    }, 1000)
}
funcScore();


pipeUp.style.display = 'none';
pipeDown.style.display = 'none';
let checkIfCrash = true;
let intervalIdB;
let translateY = 0;
let lastPlace = 0;
let programLock = false;
let heartNum = 3;
const birdUp = (event) => {
audioMusic.play();

    if (heartNum == 0) return;
    if (!programLock) {
        //????
        let destU = lastPlace - 130;
        let highestU = lastPlace - 150;
        let destD = lastPlace + 130;
        let highestD = lastPlace + 150;
        let isUp = true;



        //בעת לחיצה על החץ העליון
        if (event.key == 'ArrowUp') {
            programLock = true;
            intervalIdB = setInterval(() => {
                if (translateY > highestU && isUp) {
                    bird.style.transform = `translateY(${translateY--}px)`;//עליה
                } else if (translateY == highestU) {
                    isUp = false;
                    bird.style.transform = `translateY(${translateY++}px)`;//ירידה
                }
                else if (translateY < destU && !isUp) {
                    bird.style.transform = `translateY(${translateY++}px)`;//ירידה
                } else if (translateY == destU && !isUp) {//המקום הרצוי
                    lastPlace = translateY;
                    clearInterval(intervalIdB);
                    programLock = false;//אפשר לקבל עוד
                }
            }, 0)

        }

        //בעת לחיצה על החץ התחתון
        if (event.key == 'ArrowDown') {
            programLock = true;
            intervalIdB = setInterval(() => {
                //console.log(translateY);
                //console.log('isUp:', isUp);
                if (translateY < highestD && isUp) {
                    bird.style.transform = `translateY(${translateY++}px)`;
                } else if (translateY == highestD) {
                    isUp = false;
                    bird.style.transform = `translateY(${translateY--}px)`;
                }
                else if (translateY > destD && !isUp) {
                    bird.style.transform = `translateY(${translateY--}px)`;
                } else if (translateY == destD && !isUp) {
                    lastPlace = translateY;
                    clearInterval(intervalIdB);
                    programLock = false;

                }
            }, 0)
        }
    }

}

let intervalIdA;
let translateX = 0;
let intervalId;
let intervalIdC;
const pipesCreate = () => {
    const pipeUpElement = document.createElement('img');
    pipeUpElement.src = pipeUp.src;//התמונה
    pipeUpElement.id = pipeUp.id;//עיצוב

    const pipeDownElement = document.createElement('img');
    pipeDownElement.src = pipeDown.src;
    pipeDownElement.id = pipeDown.id;
    //הגרלת הגובה עבור הצינורות
    let RU = Math.floor(Math.random() * 300) + 10;
    // console.log(RU);
    pipeUpElement.height = RU/*`(${RU}vh)`*/;
    // console.log(pipeUpElement.height);
    let countWithRandom = (window.innerHeight - 250 - RU);
    // console.log(countWithRandom);
    pipeDownElement.height = countWithRandom/*`(${countWithRandom}vh)`*/;

    document.body.append(pipeUpElement);//הצגת הצינורות

    document.body.append(pipeDownElement);
    intervalIdC = setInterval(() => {
        crash(bird, pipeUpElement);
        crash(bird, pipeDownElement);
    }, 0)
    pipeMoveVeryNice(pipeUpElement, pipeDownElement);

}

//פונקציית צינורות זזים
const pipeMoveVeryNice = (pipeUpElement, pipeDownElement) => {
    let positionMove = 0;
    intervalId = setInterval(() => {
        if (heartNum == 0) return;
        pipeUpElement.style.transform = `translateX(${positionMove--}px)`;
        pipeDownElement.style.transform = `translateX(${positionMove--}px)`;
    }, 0)
}
//יצירת צינורות
const inventionPipes = () => {
    intervalIdA = setInterval(() => {
        pipesCreate();
    }, 1600)
}
//התנגשות
const crash = (bird, pipe) => {
    const rectB = bird.getBoundingClientRect();//מיקום האובייקטים
    const rectP = pipe.getBoundingClientRect();
    if (pipe.id === 'pipesUp') {
        let rangeHeight = (rectP.y + pipe.height);
        if (rectB.y <= rangeHeight && (rectB.x + bird.width) >= rectP.x && (rectB.x + bird.width) < (rectP.x + pipe.width) && checkIfCrash) {
            loss();
        }
    }
    else if (pipe.id === 'pipesDown') {
        if (rectB.y + bird.height >= rectP.y && (rectB.x + bird.width) >= rectP.x && (rectB.x + bird.width) < rectP.x + pipe.width && checkIfCrash) {
            loss();
        }
    }

}

const loss = () => {
    audioCrashBird.play();
    if (heart3.classList.contains('hide')) {
        if (heart2.classList.contains('hide')) {
            heart1.classList.add("hide");
        }
        else {
            heart2.classList.add("hide");
        }
    }
    else {
        heart3.classList.add("hide");
    }
    heartNum--;
    checkIfCrash = false;
    if (heartNum > 0) {
        // wait 3 sec
        // while()
        bird.classList.add("blink_me");
        // bird.style.opacity = `50%`;
        setTimeout(() => { checkIfCrash = true; bird.classList.remove("blink_me"); }, 3000);
        // checkIfCrash = true;
    } 
    else {
        audioMusic.pause();
        audioGameOver.play();
        clearInterval(intervalIdA);
        clearInterval(intervalIdScore);
        blurGameOver.classList.add("blurGameOver");
        gameOver.classList.remove("hide");
        gameOver.classList.add("gameOver");
        //שמירת שיא אישי עבור כל שחקן
        if (score > currentUser.heighscore) {
            players.forEach(e => {
                if (e.email == currentUser.email) {
                    e.heighscore = score;//לעדכן את המערך
                    currentUser.heighscore = score;//מעדכן את השחקן הנוכחי
                    localStorage.setItem('players', JSON.stringify(players));//להחזיר את המערך
                    localStorage.setItem('currentUser', JSON.stringify(currentUser));//שלהחזיר את השחקן הנוכחי
                }
            });
        }

    }
}
inventionPipes();//פונקציה שמזמנת צינורות ושולחת אותם ליצירה
document.addEventListener('keydown', birdUp);//לחיצה על החיצים

