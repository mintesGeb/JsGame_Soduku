// ("use strict");
const myArray = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9],
];
const myWrongAns = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 0, 3, 4, 9],
  [1, 0, 0, 3, 4, 2, 5, 6, 0],
  [8, 5, 9, 7, 6, 1, 0, 2, 0],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 0, 1, 5, 3, 7, 2, 1, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 0, 0, 4, 8, 1, 1, 7, 9],
];

function testArrWithRef(miniArr) {
  let refArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  if (miniArr.length !== refArr.length) {
    // console.log("prob: different length");
    return false;
  }

  for (let i = 0; i < miniArr.length; i++) {
    if (!refArr.includes(miniArr[i])) {
      // console.log("prob: content issue");
      return false;
    } else {
      refArr = refArr.filter((num) => num !== miniArr[i]);
    }
  }
  return true;
}

function rowTester(arr) {
  let test;
  let count = 0;

  arr.forEach((miniArr) => {
    test = testArrWithRef(miniArr);
  });

  return test;
}

function columnTester(arr) {
  let test;

  for (let i = 0; i < arr.length; i++) {
    let newArr = [];
    arr.forEach((miniArr) => {
      newArr.push(miniArr[i]);
    });
    test = testArrWithRef(newArr);

    if (!test) return false;
  }

  return test;
}

function regionTest(arr) {
  let test;
  let sqRt = Math.sqrt(arr.length);
  let a = 0;
  while (a < arr.length) {
    let b = 0;
    while (b < arr.length) {
      let newArr = [];

      for (let i = a; i < a + sqRt; i++) {
        for (let j = b; j < b + sqRt; j++) {
          newArr.push(arr[i][j]);
        }
      }
      test = testArrWithRef(newArr);

      if (!test) {
        return false;
      } else {
        b += sqRt;
      }
    }
    a += sqRt;
  }

  return true;
}
// console.log(testArrWithRef([1, 2, 4, 3, 5, 6, 7, 9, 8]));
// console.log(rowTester(myArray));
// console.log(columnTester(myArray));
// console.log(regionTest(myArray));

function testAnswer(arr) {
  if (rowTester(arr) && columnTester(arr) && regionTest(arr)) {
    return "Finished!";
  }
  return "Try again!";
}
// console.log(testAnswer(myArray));
// console.log("-----------");
// console.log(testAnswer(myWrongAns));

// module.exports = {
//   testAnswer: testAnswer,
// };

// const myArray = [
//   [5, 3, 4, 6, 7, 8, 9, 1, 2],
//   [6, 7, 2, 1, 9, 5, 3, 4, 8],
//   [1, 9, 8, 3, 4, 2, 5, 6, 7],
//   [8, 5, 9, 7, 6, 1, 4, 2, 3],
//   [4, 2, 6, 8, 5, 3, 7, 9, 1],
//   [7, 1, 3, 9, 2, 4, 8, 5, 6],
//   [9, 6, 1, 5, 3, 7, 2, 8, 4],
//   [2, 8, 7, 4, 1, 9, 6, 3, 5],
//   [3, 4, 5, 2, 8, 6, 1, 7, 9],
// ];

let sodukuGrid = document.getElementById("soduku-grid");
let wrong = 0;
let hint = 0;
let timer = document.getElementById("timer");
let gameStatus = true;
let outOf = 0;
let percentage;
let difficulty = false;

window.onload = () => {
  document.getElementById("play-again").style.display = "none";
  document.querySelector("#start-game").style.display = "none";
  document.getElementById("difficulty-msg").style.display = "none";
  document.getElementById("back").style.display = "none";

  document.getElementById("easy").onclick = () => {
    document.getElementById("easy").style.opacity = "100%";
    document.getElementById("medium").style.opacity = "20%";
    document.getElementById("hard").style.opacity = "20%";
    difficulty = "easy";
  };
  document.getElementById("medium").onclick = () => {
    document.getElementById("medium").style.opacity = "100%";
    document.getElementById("easy").style.opacity = "20%";
    document.getElementById("hard").style.opacity = "20%";
    difficulty = "medium";
  };
  document.getElementById("hard").onclick = () => {
    document.getElementById("hard").style.opacity = "100%";
    document.getElementById("medium").style.opacity = "20%";
    document.getElementById("easy").style.opacity = "20%";
    difficulty = "hard";
  };

  document.getElementById("start-btn").onclick = () => {
    if (!difficulty) {
      document.getElementById("difficulty-msg").style.display = "block";
      setTimeout(() => {
        document.getElementById("difficulty-msg").style.display = "none";
      }, 2000);
    } else {
      document.getElementById("difficulty").style.display = "none";
      document.querySelector("#start-game").style.display = "block";
      document.querySelector("#initial-msg").style.display = "none";

      countdown(timer, difficulty);
      creategrid(myArray, sodukuGrid, difficulty);
    }
  };

  document.getElementById("incomplete-msg").style.display = "none";
  document.getElementById("congratulation-msg").style.display = "none";
  document.getElementById("gameover-msg").style.display = "none";
  document.getElementById("hint-msg").style.display = "none";

  document.getElementById("submit").onclick = () => {
    console.log("done");
    const userAnswer = checkAnswer(sodukuGrid);
    console.log(userAnswer);
    if (userAnswer.whites === 0) {
      if (userAnswer.reds) {
        incompleteMsg(
          "You have " + userAnswer.reds + " wrong answers. Please Correct them"
        );
      } else {
        document.getElementById("submit").style.display = "none";
        document.getElementById("hint").disabled = true;
        document.getElementById("play-again").style.display = "block";

        console.log(testAnswer(userAnswer.mainArray));
        document.getElementById("congratulation-msg").style.display = "block";
        percentage = calcPercentage(userAnswer);
        console.log(percentage);
        timeFreeze(document.getElementById("congratulation-msg"));

        let percentageP = document.createElement("p");
        percentageP.innerHTML = `Score: ${percentage}`;
        percentageP.style.color = "black";
        document.getElementById("congratulation-msg").appendChild(percentageP);

        document.getElementById("play-again").onclick = () => {
          location.reload();
        };
      }
    } else {
      incompleteMsg("You have " + userAnswer.whites + " incomplete boxes.");
    }
  };
};
function calcPercentage(ans) {
  let wrongSqueeze = wrong * 10;
  let hintValue = ans.oranges * 10;
  return 100 - (wrongSqueeze + hintValue);
}

function incompleteMsg(msg) {
  document.getElementById("incomplete-msg").style.display = "block";
  document.getElementById("incomplete-msg").innerHTML = `${msg}`;

  setTimeout(() => {
    document.getElementById("incomplete-msg").style.display = "none";
    document.getElementById("incomplete-msg").innerHTML = "";
  }, 3000);
}

function creategrid(arr, loc, difficultyLevel = "medium") {
  console.log(difficultyLevel);
  arr.forEach((miniArr) => {
    miniArr.forEach((number) => {
      let input = document.createElement("input");
      input.value = `${number}`;
      input.setAttribute("class", `${number} cube`);
      input.style.fontSize = "1.75rem";

      loc.appendChild(input);
    });
    let p = document.createElement("br");
    // p.innerHTML = "\n";
    loc.appendChild(p);
  });
  // console.log(loc.childNodes);
  let difficultyFactor = 0;

  if (difficultyLevel === "easy") difficultyFactor = 0.75;
  else if (difficultyLevel === "medium") difficultyFactor = 1;
  else if (difficultyLevel === "hard") difficultyFactor = 1.3;
  else difficultyFactor = 1;

  for (let i = 0; i < loc.childNodes.length / difficultyFactor; i++) {
    let random = Math.floor(Math.random() * loc.childNodes.length);

    loc.childNodes[random].disabled = true;
  }
  loc.childNodes.forEach((element) => {
    if (element.disabled === false) {
      outOf++;
      element.value = "-";
      element.style.color = "white";
      valueCheck(element);
    }
  });
  console.log(outOf);
}

function valueCheck(element) {
  let ref;

  element.addEventListener("click", () => {
    ref = element.getAttribute("class").split(" ")[0];

    document.getElementById("hint").onclick = () => {
      if (hint < 3) {
        giveHint(element, ref);
      } else {
        document.getElementById("hint-msg").style.display = "block";
      }
    };
  });

  element.addEventListener("keydown", (e) => {
    element.value = "";
    if (inputValidation(e.key, ref)) {
      element.style.color = "green";
    } else {
      if (wrong >= 3) {
        wrong++;
        element.style.color = "red";
        document.getElementById("Wrongs").value = wrong;
        gameover(sodukuGrid);
      } else {
        wrong++;
        element.style.color = "red";
        document.getElementById("Wrongs").value = wrong;
      }
    }
  });
}

function inputValidation(userInput, reference) {
  if (userInput != reference) {
    return false;
  }
  return true;
}

function gameover(loc) {
  gameStatus = false;
  loc.childNodes.forEach((element) => {
    if (element.value && element.style.color !== "red") {
      if (element.style.color !== "orange" && element.style.color !== "green") {
        element.style.color = "blue";
      }
      element.disabled = true;
    }
    document.getElementById("gameover-msg").style.display = "block";
  });
  timeFreeze(document.getElementById("gameover-msg"));
}

function timeFreeze(displayDiv) {
  let p = document.createElement("p");
  p.innerHTML = `Time: ${timer.innerHTML}`;
  p.style.color = "black";
  timer.style.display = "none";
  displayDiv.appendChild(p);
}

function giveHint(element, reference) {
  let remainingHint = document.getElementById("remaining-hint");
  hint++;
  remainingHint.innerHTML = Number(remainingHint.innerHTML) - 1;
  element.value = reference;
  element.style.color = "orange";
  element.disabled = true;
}
function checkAnswer(loc) {
  let mainArray = [];
  let temp = [];
  let whites = 0;
  let oranges = 0;
  let reds = 0;
  loc.childNodes.forEach((element) => {
    if (element.style.color === "white") {
      whites++;
    }
    if (element.style.color === "red") {
      reds++;
    }
    if (element.style.color === "orange") {
      oranges++;
    }
    if (element.value) {
      temp.push(Number(element.value));
    } else {
      mainArray.push(temp);
      temp = [];
    }
  });
  return { reds, whites, oranges, mainArray };
}
let mytry = checkAnswer(sodukuGrid);

console.log(mytry);
console.log(testAnswer(mytry));

function countdown(display, difficultyLevel = "medium") {
  if (difficultyLevel === "easy") min = 5;
  else if (difficultyLevel === "medium") min = 15;
  else if (difficultyLevel === "hard") min = 25;
  else min = 15;

  let sec = 01;
  let timer = setInterval(() => {
    // console.log(`${min}:${sec--}`);
    display.innerHTML = `${min}:${sec--}`;
    if (min != 0 && sec <= 0) {
      min--;
      sec = 60;
    } else if (min <= 0 && sec <= 0) {
      // console.log(`${min}:${sec--}`);
      display.innerHTML = `${min}:${sec--}`;
      clearInterval(timer);
      if (gameStatus) {
        gameover(sodukuGrid);
      }
    }
  }, 1000);
}
