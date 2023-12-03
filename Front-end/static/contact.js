var myVar = setInterval(myTimer, 1000);

function myTimer() {
    var d = new Date();
    var t = d.toLocaleDateString()+' '+d.toLocaleTimeString();
    document.getElementById('time').innerHTML = t;
}

function myStopFunction() {
    clearInterval(myVar);
}