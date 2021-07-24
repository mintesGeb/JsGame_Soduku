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
console.log(testAnswer(myArray));
console.log("-----------");
console.log(testAnswer(myWrongAns));

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

function creategrid(arr, loc) {
  arr.forEach((miniArr) => {
    miniArr.forEach((number) => {
      let input = document.createElement("input");
      input.value = `${number}`;
      input.setAttribute("class", "cube");
      input.style.fontSize = "1.75rem";

      loc.appendChild(input);
    });
    let p = document.createElement("br");
    // p.innerHTML = "\n";
    loc.appendChild(p);
  });
  // console.log(loc.childNodes);
  for (let i = 0; i < loc.childNodes.length / 1.5; i++) {
    let random = Math.floor(Math.random() * loc.childNodes.length);

    loc.childNodes[random].disabled = true;
  }
  loc.childNodes.forEach((element) => {
    if (element.disabled === false) {
      // element.value = "";
      element.style.color = "white";
      valueCheck(element);
    }
  });
}
// function creategrid(arr, loc) {
//   arr.forEach((miniArr) => {
//     miniArr.forEach((number) => {
//       let span = document.createElement("span");
//       span.innerHTML = `${number}\t`;
//       span.style.fontSize = "1.75rem";
//       loc.appendChild(span);
//     });
//     let p = document.createElement("p");
//     p.innerHTML = "\n";
//     loc.appendChild(p);
//   });
// }
let sodukuGrid = document.getElementById("soduku-grid");
creategrid(myArray, sodukuGrid);

function valueCheck(element) {
  let wrong = 0;
  let ref = element.value;
  element.addEventListener("click", () => {
    console.log(ref);
    element.value = "";
  });

  element.addEventListener("keydown", (e) => {
    console.log(e.key);
    myList = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    console.log();
    if (myList.includes(parseInt(e.key))) {
      if (e.key != ref) {
        wrong++;
        setTimeout(() => {
          element.style.color = "red";
          document.getElementById("Wrongs").value = wrong;
        }, 100);
      } else {
        element.style.color = "green";
      }
    }
  });
}

function checkAnswer(loc) {
  let mainArray = [];
  let temp = [];
  loc.childNodes.forEach((element) => {
    if (element.value) {
      temp.push(Number(element.value));
    } else {
      mainArray.push(temp);
      temp = [];
    }
  });
  return mainArray;
}
let mytry = checkAnswer(sodukuGrid);
console.log(mytry);

console.log(testAnswer(mytry));
