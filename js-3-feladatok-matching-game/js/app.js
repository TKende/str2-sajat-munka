let found = 0;
let numbeofflips = 0;
let start = false;
let allcards = document.querySelectorAll('.flip-card');


function flip(event) {
    if (!start) {
        start = true;
        startgame();
    }
    let element = event.currentTarget;
    if (element.classList.contains('flip-card')) {
        element.classList.add("flipped")
    }

};

function listener(event) {
    let element = event.currentTarget;
    if (!(element.classList.contains('flipped'))) {
        flip(event);
        numbeofflips += 1;
        if (numbeofflips >= 2) {
            setTimeout(checkIfFound, 650)
            numbeofflips = 0;
        }
    }
}

function checkIfFound() {
    let flippedcards = document.querySelectorAll('.flipped:not(.done)')
    let n1 = parseInt(flippedcards[0].id.match(/\d+$/)[0])
    let n2 = parseInt(flippedcards[1].id.match(/\d+$/)[0])
    console.log(n1, n2)
    if (Math.floor(n1 / 2) === Math.floor(n2 / 2)) {
        flippedcards[0].classList.add('done')
        flippedcards[1].classList.add('done')
        found += 1;
        console.log('found')
        checkwin();
    } else {
        console.log('not found')
        flipback()
    }
}

function checkwin() {
    if (found >= 5) {
        setTimeout(location.reload(), 5000)
    }
}

function flipback() {

    let flippedcards = document.querySelectorAll('.flipped:not(.done)')
    for (let i = 0; i < flippedcards.length; i++) {
        console.log(flippedcards[i].id)
        flippedcards[i].classList.remove('flipped')
    }
}

function addListener() {
    document.querySelectorAll('.flip-card').forEach(item => {
        item.setAttribute("onclick", "listener(event)")
    })
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
}

function addPictures() {
    let order = Array.from(Array(10).keys());
    order = shuffleArray(order)
    let pictures = document.getElementsByClassName("flip-card");
    for (let i = 0; i < 10; i++) {
        pictures[i].id = `pic${order[i]}`;

    }
}

function timer() {
    let minute = 4;
    let sec = 60;
    let timeleft = minute * 60 + sec;
    setInterval(function() {
        document.getElementById("clock").innerHTML = minute + " : " + sec;
        sec--;
        if (sec == 00) {
            minute--;
            sec = 60;
            if (minute == 0) {
                minute = 5;
            }
        }
    }, 1000);
    if (timeleft < 0) {
        document.querySelectorAll('.flip-card').forEach(item => {
            item.setAttribute("onclick", "")
        })
        location.reload()
    }
}



addListener()

function startgame() {
    addPictures()
    timer()
}