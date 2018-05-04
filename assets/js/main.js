// Questions and answers Array
var questions = [
    {
      question: 'The day on which the Sun’s direct rays cross the celestial equator is called?',
      answers: [
        { answer: 'A. the solstice', value: false },
        { answer: 'B. the equinox', value: true },
        { answer: 'C. the ecliptic', value: false },
        { answer: 'D. Easter', value: false }
      ]
    },
    {
      question: 'Who invented the telescope?',
      answers: [
        { answer: 'A. Johannes Kepler', value: false },
        { answer: 'B. Galileo', value: false },
        { answer: 'C. Hans Lippershey', value: true },
        { answer: 'D. Archimedes', value: false }
      ]
    },
    {
      question: 'Which of these objects is the farthest from the Sun?',
      answers: [
        { answer: 'A. 90377 Sedna', value: true },
        { answer: 'B. Saturn', value: false },
        { answer: 'C. Kuiper belt', value: false },
        { answer: 'D. Neptune', value: false }
      ]
    },
    {
      question: 'What term describes the alignment of three celestial bodies?',
      answers: [
        { answer: 'A. symbology', value: false },
        { answer: 'B. suzerainty', value: false },
        { answer: 'C. sizzle', value: false },
        { answer: 'D. syzygy', value: true }
      ]
    },
    {
      question: "What is the visible part of the Sun called?",
      answers: [
        { answer: 'A. the stratosphere', value: false },
        { answer: 'B. the photosphere', value: true },
        { answer: 'C. the atmosphere', value: false },
        { answer: 'D. the lithosphere', value: false }
      ]
    },
    {
      question: ' To weigh roughly two-thirds less than what you do on Earth, which planet would you be on?',
      answers: [
        { answer: 'A. Uranus', value: false },
        { answer: 'B. Mars', value: true },
        { answer: 'C. Venus', value: false },
        { answer: 'D. Jupiter', value: false }
      ]
    },
    {
      question: 'What makes a planet a dwarf planet?',
      answers: [
        { answer: 'A. size and shape', value: true },
        { answer: 'B. distance from the Sun', value: false },
        { answer: 'C. smell', value: false },
        { answer: 'D. color', value: false }
      ]
    },
    {
      question: 'What two motions do all planets have?',
      answers: [
        { answer: 'A. Wiggle and wobble', value: false },
        { answer: 'B. orbit and spin', value: true },
        { answer: 'C. twist and shout', value: false },
        { answer: 'D. rock and roll', value: false }
      ]
    },
    {
      question: 'Approximately how many miles are there in a light year?',
      answers: [
        { answer: 'A. 5.9 trillion', value: true },
        { answer: 'B. 5.9 billion', value: false },
        { answer: 'C. 5.9 million', value: false },
        { answer: 'D. 590,000', value: false }
      ]
    },
    {
      question: 'Which is the name of a radio source that is very far from Earth?',
      answers: [
        { answer: 'A. tracer', value: false },
        { answer: 'B. quasar', value: true },
        { answer: 'C. phaser', value: false },
        { answer: 'D. taser', value: false }
      ]
    }
  
  ];
  
  // Global variables
  var game;
  var counter = 0;
  var clock;
  var timer = 10;
  var correctCounter = 0;
  var incorrectCounter = 0;
  var unansweredCounter = 0;
  
  $(document).ready(function () {
    // Start the game when that start button is clicked
    $('.answers').css('visibility', 'hidden');
    $('body').on('click', '.start-btn', function (event) {
      event.preventDefault();
      startGame();
      $('.answers').css('visibility', 'visible');
    });
  
    $('body').on('click', '.answer', function (event) {
      // console.log($(this));
      chosenAnswer = $(this).text();
      var answerCounter = questions[counter].answers;
  
      var answer = $('.answer');
      for (var i = 0; i < answerCounter.length; i++) {
        if (chosenAnswer === answerCounter[i].answer && answerCounter[i].value === true) {
          clearInterval(clock);
          var right = $(this).attr('class', 'right-answer answer');
          rightAnswer();
        } else if (chosenAnswer === answerCounter[i].answer && answerCounter[i].value === false) {
          clearInterval(clock);
          $(this).attr('class', 'wrong-answer answer');
          $('.first-answer').css('background-color', 'green');
          $('.first-answer').css('color', 'white');
          wrongAnswer();
        }
      }
    });
  
    $('body').on('click', '.reset-button', function (event) {
      event.preventDefault();
      resetGame();
    });
  });
  
  function rightAnswer() {
    correctCounter++;
    $('.time').html(timer);
    $('.right').html('<p>Right answers: ' + correctCounter + '</p><br>');
    setTimeout(questionCounter, 2000);
  }
  
  function wrongAnswer() {
    incorrectCounter++;
    $('.time').html(timer);
    $('.wrong').html('<p>Wrong answers: ' + incorrectCounter + '</p>');
    setTimeout(questionCounter, 2000);
  }
  
  function unanswered() {
    unanswered++;
    $('.main').append("<p class='times-up'>Time's up!</p>");
    $('.right-answer').css('background-color', 'green');
    $('.times-up')
      .delay(2000)
      .fadeOut(400);
    setTimeout(questionCounter, 2000);
  }
  
  // Start the game
  function startGame() {
    $('.start-page').css('display', 'none');
    $('.questions-page').css('visibility', 'visible');
    $('.timer').html('<p>Time left: <span class="time">10</span></p>');
  
    $('.question').html(questions[counter].question);
    var showingAnswers =
      '<p class="answer first-answer">' +
      questions[counter].answers[0].answer +
      '</p><p class="answer">' +
      questions[counter].answers[1].answer +
      '</p><p class="answer">' +
      questions[counter].answers[2].answer +
      '</p><p class="answer">' +
      questions[counter].answers[3].answer +
      '</p>';
  
    $('.answers').html(showingAnswers);
  
    timerHolder();
  }
  
  function questionCounter() {
    if (counter < 9) {
      counter++;
      startGame();
      timer = 10;
      timerHolder();
    } else {
      console.log("finish game");
      finishGame();
    }
  }
  
  // Timer function
  function timerHolder() {
    clearInterval(clock);
    clock = setInterval(seconds, 1000);
    function seconds() {
      if (timer === 0) {
        clearInterval(clock);
        unanswered();
      } else if (timer > 0) {
        timer--;
      }
      $('.time').html(timer);
    }
  }
  
  // Finishing the game
  function finishGame() {
    var final = $('.main')
      .html("<p>Score Card:<p><br><br>")
      .append('<p>Correct Answers: ' + correctCounter + '</p><br>')
      .append('<p>Wrong Answers: ' + incorrectCounter + '</p>');
    $(final).attr('<div>');
    $(final).attr('class', 'final');
    $('.final').append('<p><a class="btn btn-primary btn-lg reset-button" href="#">Restart the game!</a></p>');
  }
  
  // Reset the game
  function resetGame() {
    counter = 0;
    correctCounter = 0;
    incorrectCounter = 0;
    unansweredCounter = 0;
    timer = 10;
    startGame();
    timerHolder();
  }
  