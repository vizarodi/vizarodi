window.onload = () => {
/* Frontend Connection */
    let clock = document.getElementById("clock");
    let cyclesInput = document.getElementById("cycles-input");
    let startButton = document.getElementById("start-button");
    let stopButton = document.getElementById("stop-button");
    let workTimeInput = document.getElementById("work-time");
    let breakTimeInput = document.getElementById("break-time");
    let restTimeInput = document.getElementById("rest-time");

    /* this is to not spam the start button */
    let canPress = true;

/* sonidos?*/
    let clickSound = new Audio('./Sounds/click.mp3');
    let timeAlarm = new Audio('./Sounds/alarm.mp3');
    let resetAlarm = new Audio('./Sounds/stop.mp3');

    startButton.addEventListener('click', ()=>{
        clickSound.play();
    })
    stopButton.addEventListener('click', ()=>{
        clickSound.play();
    })

/* Clock */
let clockMinutes;
let clockSeconds;

function updateClock(){
    clockMinutes = formatNumbers(currentTime);
    clockSeconds = formatNumbers(seconds);
    clock.innerHTML = clockMinutes + ":" + clockSeconds;
}

function formatNumbers(time) {
    let formattedDigits;
    if(time < 10) {
        formattedDigits = "0" + time;
    } else {
        formattedDigits = time;
    }
    return formattedDigits;
}
/* Clicks */
startButton.onclick = () => {
    if(canPress != false){
        canPress = false;
        populateVariables();
        startPomodoro();
    }
}

stopButton.onclick = () => {
    stopPomodoro();
}

function stopPomodoro(){
    /*detener*/
    window.location.reload(); /* tanto me costaba esto?! que idiota que soy */
}

function startPomodoro(){
    console.log("started pomodoro");
    pomodoroController();
}

function populateVariables() {
    workTime = workTimeInput.value;
    breakTime = breakTimeInput.value;
    restTime = restTimeInput.value;
    cyclesGoal = cyclesInput.value;
    timesCompleted = 0;
}
/* Pomodoro */
    let workTime;
    let breakTime;
    let timesCompleted; 
    let cyclesGoal;
    let cyclesCompleted = 0;

    function pomodoroController(){
        if(isRestTime()){
            cyclesCompleted++;
            if(!goalReached()) {
                currentTime = restTime;
                timer();
                timesCompleted = 0;
            } else {
                console.log("goal reached!!")
            }
            return;
        }

        if(timesCompleted % 2 == 0){
            currentTime = workTime;
            timesCompleted++;
            timer();
            console.log("Time to work!! TC:" + timesCompleted);
        } else {
            timeAlarm.play();
            currentTime = breakTime;
            timesCompleted++;
            timer();
            console.log("Take a Break!! TC:" + timesCompleted)
        }
    }

    function isRestTime() {
        return timesCompleted == 7;
    }

    function goalReached() {
        return cyclesGoal == cyclesCompleted;
    }

/* timer */
    let currentTime = 1; /* minutos seteados */
    let seconds = 0;

    function timer() {
        if(currentTime > 0 || seconds > 0) {
            if (seconds == 0) {
                seconds = 59;
                currentTime--;
            } else {
                seconds--;
            }
            updateClock();
            console.log(currentTime, seconds);
            interval = setTimeout(timer, 1000);
        } else {
            pomodoroController();
        }
    }
    //timer();
};