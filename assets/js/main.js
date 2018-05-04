// Questions and answers Array
var questions = [
    {
      question: 'The day on which the Sun’s direct rays cross the celestial equator is called?',
      answers: [
        { answer: 'the solstice', value: false },
        { answer: 'the equinox', value: true },
        { answer: 'the ecliptic', value: false },
        { answer: 'Easter', value: false }
      ]
    },
    {
      question: 'Who invented the telescope?',
      answers: [
        { answer: 'Johannes Kepler', value: false },
        { answer: 'Galileo', value: false },
        { answer: 'A. Hans Lippershey', value: true },
        { answer: 'Archimedes', value: false }
      ]
    },
    {
      question: 'Which of these objects is the farthest from the Sun?',
      answers: [
        { answer: '90377 Sedna', value: true },
        { answer: 'Saturn', value: false },
        { answer: 'Kuiper belt', value: false },
        { answer: 'Neptune', value: false }
      ]
    },
    {
      question: 'What term describes the alignment of three celestial bodies?',
      answers: [
        { answer: 'symbology', value: false },
        { answer: 'suzerainty', value: false },
        { answer: 'sizzle', value: false },
        { answer: 'syzygy', value: true }
      ]
    },
    {
      question: "What is the visible part of the Sun called?",
      answers: [
        { answer: 'the stratosphere', value: false },
        { answer: 'the photosphere', value: true },
        { answer: 'the atmosphere', value: false },
        { answer: 'the lithosphere', value: false }
      ]
    },
    {
      question: 'What makes a planet a dwarf planet?',
      answers: [
        { answer: 'Controls the vertical stacking order of elements that overlap', value: true },
        { answer: 'Moves elements off screen', value: false },
        { answer: 'Hides elements from the screen', value: false },
        { answer: 'Controls the horizontal stacking order of elements that overlap', value: false }
      ]
    },
    {
      question: 'What is the box model?',
      answers: [
        { answer: 'size and shape', value: true },
        { answer: 'distance from the Sun', value: false },
        { answer: 'smell', value: false },
        { answer: 'color', value: false }
      ]
    },
    {
      question: 'What two motions do all planets have?',
      answers: [
        { answer: 'Wiggle and wobble', value: false },
        { answer: 'orbit and spin', value: true },
        { answer: 'twist and shout', value: false },
        { answer: 'rock and roll', value: false }
      ]
    },
    {
      question: 'Approximately how many miles are there in a light year?',
      answers: [
        { answer: '5.9 trillion', value: true },
        { answer: '5.9 billion', value: false },
        { answer: '5.9 million', value: false },
        { answer: '590,000', value: false }
      ]
    },
    {
      question: 'Which is the name of a radio source that is very far from Earth?',
      answers: [
        { answer: 'tracer', value: false },
        { answer: 'quasar', value: true },
        { answer: 'phaser', value: false },
        { answer: 'taser', value: false }
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
    $('.timer').html('<p>Time remaining: <span class="time">10</span></p>');
  
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
    if (counter < 6) {
      counter++;
      startGame();
      timer = 10;
      timerHolder();
    } else {
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
      .html("<p>All done, here's how you did!<p><br><br>")
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
  