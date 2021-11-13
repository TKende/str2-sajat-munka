function currentTime() {
    let date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    let ctime = h + ":" + m + ":" + s
    document.getElementById('time').innerText = ctime;

    setTimeout(currentTime, 1000);
}

currentTime();