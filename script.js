let timeW = 25 * 60;
let timeB = 5 * 60;
let timerId = 0;

function setTime(id, num) {
  window.clearTimeout(timerId);
  timerId = 0;
  let time = Number(document.getElementById(id).innerHTML);
  if (time !== 1) {
    time += num;
  } else if (time === 1 && num !== -1) {
    time += num;
  }
  document.getElementById(id).innerHTML = time;
  document.getElementById('Timer').innerHTML = time;
  if (id === 'session') {
    document.getElementById('textTime').innerHTML = 'WORK';
    timeW = time * 60;
  } else {
    timeB = time * 60;
    document.getElementById('textTime').innerHTML = 'BREAK';
  }
} 

function soundBreak() {
  const audioB = new Audio(); 
  audioB.src = './assets/audio/break.mp3'; 
  audioB.autoplay = true; 
}

function soundWork() {
  const audioW = new Audio();
  audioW.src = './assets/audio/work.mp3'; 
  audioW.autoplay = true; 
}

function runTimer() {
  const valueTime = document.getElementById('Timer').innerHTML;
  const value = document.getElementById('textTime').innerHTML;
  const arr = valueTime.split(':');
  let min = Number(arr[0]);
  let sec = Number(arr[1]);
  const countSec = min * 60 + sec;
//   let end = false;

  if (value === 'WORK') {
    const perc = 100 - (countSec * 100 / timeW);
    document.getElementById('steam').style.visibility = 'hidden';
    document.getElementById('coffee').style.background = `linear-gradient(to top, #4f1e00 0%, #4f1e00 ${perc}%, #d1a086 1%, #d1a086 100%)`;
  } else {
    const perc = (countSec * 100) / timeB;
    document.getElementById('coffee').style.background = `linear-gradient(to top, #4f1e00 0%, #4f1e00 ${perc}%, #d1a086 1%, #d1a086 100%)`;
    document.getElementById('steam').style.visibility = 'visible';
  }
  if (min === 0 && sec === 0) {
    //   var value = document.getElementById('textTime').innerHTML;
    if (value === 'WORK') {
      soundBreak();
      min = document.getElementById('break').innerHTML;
      document.getElementById('textTime').innerHTML = 'BREAK';
    } else {
      soundWork();
      min = document.getElementById('session').innerHTML;
      document.getElementById('textTime').innerHTML = 'WORK';
    }
  }
  if (sec > 0) {
    sec--;
  } else {
    sec = 59;
    if (min > 0) {
      min--;
    }
    // else {
    //   end = true;
    // }
}
  if (sec < 10) sec = +`0${sec}`;
  if (min < 10) min = +`0${min}`;

  document.getElementById('Timer').innerHTML = `${min}:${sec}`;
  timerId = setTimeout(runTimer, 1000);
  return timerId;
}

function ifTimer() {
  if (timerId > 0) {
    window.clearTimeout(timerId);
    timerId = 0;
  } else { 
    runTimer(); 
  }
}
