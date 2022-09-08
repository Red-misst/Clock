var currentTime = "";


setInterval(() => {
  const d = new Date();
  // console.log(d);
  const time = {};
  time.hours = ((d.getHours() <= 9) ? "0" : "") + d.getHours();
  time.minutes = ((d.getMinutes() <= 9) ? "0" : "") + d.getMinutes();
  time.seconds = ((d.getSeconds() <= 9) ? "0" : "") + d.getSeconds();

  if (document.querySelector(".hour-system").innerText == "24HR") {
    if (time.hours == 12) {
      $(".clock").text("12" + ":" + time.minutes + ":" + time.seconds + " PM");
    } else if (time.hours > 12) {
      $(".clock").text("0" + (time.hours - 12) + ":" + time.minutes + ":" + time.seconds + " PM");
    } else {
      if (time.hours == 00) {
        $(".clock").text("12:" + time.minutes + ":" + time.seconds + " AM");
      } else {
        $(".clock").text(time.hours + ":" + time.minutes + ":" + time.seconds + " AM");
      }
    }
  } else {
    $(".clock").text(time.hours + ":" + time.minutes + ":" + time.seconds);
  }
  currentTime = time;
}, 100);


//toggle btn 24hr and 12 hr system
$(".hour-system").click((event, time) => {
  toggle(event);
});

//stopwatch
let stopwatchHours = 0;
let stopwatchMinutes = 0;
let stopwatchSeconds = 0;
let stopwatchMilliseconds = 0;
var splitTime ="";
let isPaused = true;

$(".stopwatch .start").click((event) => {
  if (event.currentTarget.innerText == "start") {

    $(".stopwatch .start").text("splits")
    isPaused = false;
    var stepTime = setInterval(() => {
      if (!isPaused) {
        //prints the digits on screen
        var stopwatchTime = ((stopwatchHours < 10) ? "0" : "") + stopwatchHours + ":" +
          ((stopwatchMinutes < 10) ? "0" : "") + stopwatchMinutes + ":" +
          ((stopwatchSeconds < 10) ? "0" : "") + stopwatchSeconds + ":" +
          ((stopwatchMilliseconds < 10) ? "0" : "") + stopwatchMilliseconds
        if (stopwatchMilliseconds <= 99) {
          if (stopwatchMilliseconds < 99) {
            $(".stopwatch-display").text(stopwatchTime)
          } else {
            stopwatchSeconds++;
            $(".stopwatch-display").text(stopwatchTime)
            stopwatchMilliseconds = 0;
            if (stopwatchSeconds < 60) {
              $(".stopwatch-display").text(stopwatchTime)
            } else if (stopwatchSeconds == 60) {
              stopwatchMinutes++;
              stopwatchSeconds = 0;
              $(".stopwatch-display").text(stopwatchTime)
              if (stopwatchMinutes < 60) {
                $(".stopwatch-display").text(stopwatchTime)
              } else if (stopwatchMinutes == 60) {
                stopwatchHours++;
                stopwatchMinutes = 0
                $(".stopwatch-display").text(stopwatchTime)
              }
            }

          }
          stopwatchMilliseconds++;
        }
         splitTime = stopwatchTime;
      }
    }, 10);
  } else {
    console.log(splitTime)
    $(".stopwatch .splits").append("<p>" + splitTime + "</p>");
  }

})



$(".stopwatch .reset").click((event) => {
  stopwatchHours = 0;
  stopwatchMinutes = 0;
  stopwatchSeconds = 0;
  stopwatchMilliseconds = 0;
  isPaused = true;
  $(".stopwatch .splits").html("");
  $(".stopwatch-display").text("00:00:00:00")
  $(".stopwatch .start").text("start")
  $(".stopwatch .stop").text("stop")
  document.querySelector(".stopwatch .start").disabled = false;
})


$(".stopwatch .stop").click((event) => {
  var y = document.querySelector(".stopwatch .start").innerText
  if (y == "splits") {
    toggle(event);
    if (event.currentTarget.innerText == "resume") {
      event.preventDefault();
      isPaused = true;
      document.querySelector(".stopwatch .start").disabled = true;
    } else if (event.currentTarget.innerText == "stop") {
      event.preventDefault();
      isPaused = false;
      document.querySelector(".stopwatch .start").disabled = false;
    }
  }
})






function toggle() {
  var targetText = event.currentTarget.innerText;
  if (targetText == "AM/PM") {
    $(".hour-system").text("24HR")
  } else if (targetText == "24HR") {
    $(".hour-system").text("AM/PM")
  } else if (targetText == "start") {
    $(".stopwatch .start").text("split")
  } else if (targetText == "stop") {
    $(".stopwatch .stop").text("resume")
  } else if (targetText == "resume") {
    $(".stopwatch .stop").text("stop")
  }
}
