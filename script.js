$(document).ready(function () {
  let imagesRoot = "assets/images/";
  let images = [
    "wheel-robot.png",
    "dog-robot.png",
    "flying-robot.png",
    "excited-robot.png",
    "invader-zim-robot.png",
    "vector-robot.png",
  ];

  let robotimg = images.concat(images);
  let selectedCard = [];
  let matchedCard = [];
  let flipCounter = [];

  flipcards();

  //match clicked card//

  function selectCard(robotimg) {
    //add selected card to selectedCard
    selectedCard.push(robotimg);
    // check 2 open cards
    if (selectedCard.length == 2) {
      if (
        selectedCard[0].find("img").attr("src") ===
        selectedCard[1].find("img").attr("src")
      ) {
        // is it a match
        match(); // check match function
        console.log("matched!");
        checkWinGame();
        // if not a match
      } else {
        noMatchedCard();
        console.log("not matched");
      }
    }
  }

  function match() {
    if (!$(this).hasClass("card flipped") && selectedCard.length == 2) {
      setTimeout(function () {
        selectedCard = [];
      }, 1500);
      checkWinGame();
    }
  }
  // no matching cards
  function noMatchedCard() {
    //reset cards after 3 s
    setTimeout(function () {
      selectedCard.forEach((card) =>
        card.removeClass("card flipped").addClass("card")
      );
      //emty/reset openCards array
      selectedCard = [];
    }, 1500);
  }

  //game won if all cards are found in pairs
  function checkWinGame() {
    if (selectedCard.length == 12) {
      alert(Yey, Congratulations);
      matchedCard = [];
      restart();
    }
  }

  //cards shuffle//
  function shuffle(robotimg) {
    let counter = robotimg.length,
      temp,
      index;
    // While there are elements in the array
    while (counter > 0) {
      // Pick a random index
      index = Math.floor(Math.random() * counter);
      // Decrease counter by 1
      counter--;
      // And swap the last element with it
      temp = robotimg[counter];
      robotimg[counter] = robotimg[index];
      robotimg[index] = temp;
    }
    $(".card-front").each(function (index) {
      $(this).attr("src", imagesRoot + robotimg[index]);
    });
    console.log(robotimg);
  }
  shuffle(robotimg);

  //count the flips
  function flipcards() {
    let flipCounter = 1;
    $(".card").click(function () {
      $(this).each(function () {
        $("#flips").html(flipCounter++);
      });
    });
  }

  function restart() {
    flipcards();
    flipCounter = 0;
    $(".card" > ".card-front").hide();
    $(this).addClass("card flipped");
    window.location.reload();
  }

  $(".card").click(function () {
    if (!$(this).hasClass("card flipped") && selectedCard.length !== 2) {
      $(this).addClass("card flipped");
      $(this > ".card-back").hide(); //child of//
      // console.log(this);
      selectCard($(this));
    }
  });
  flipcards();

  //start the timer and shuffle cards on start button
  $("#startButton").on("click", function () {
    count();
    function count() {
      let count = 59;
      let TimeOut = setInterval(function () {
        $("#time-remaining").text(count--);
        if (count === -1) {
          alert("Time's Up, Try Again!");
          clearInterval(TimeOut);
          restart();
        }
      }, 1000);
    }
    shuffle(robotimg);
    //restart();
  });
});
