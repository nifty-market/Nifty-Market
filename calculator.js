const clearbtn = document.getElementById("calc-clear");
const backspacebtn = document.getElementById("calc-backspace");
const resultDisplay = document.getElementById("calc-display-val");

let currentValue = 0;
let isCurrentFloat = false;

let values = [];
let operators = [];

function updateDisplay() {
  resultDisplay.textContent = currentValue;
}

function operation(op) {
  if (currentValue === 0) return;
  if (typeof currentValue === "string") currentValue = parseFloat(currentValue);

  values.push(currentValue);
  operators.push(op);
  currentValue = 0;
}

clearbtn.onclick = () => {
  console.log("clear");
  values = [];
  operators = [];
  isCurrentFloat = false;
  currentValue = 0;
  updateDisplay();
};

backspacebtn.onclick = () => {
  console.log("backspace");
  if (!isCurrentFloat) currentValue = Math.floor(currentValue / 10);
  else {
    if (currentValue.endsWith(".")) {
      isCurrentFloat = false;
    }
    currentValue = currentValue.slice(0, -1);
  }
  updateDisplay();
};

function buttonPressed(num) {
  //limit characters to 7
  if (currentValue.toString().length >= 7) {
    console.log("too many chars");
    return;
  }

  if (num === ".") {
    if (!isCurrentFloat) {
      isCurrentFloat = true;
      currentValue = currentValue + ".";
      console.log(currentValue);
    }
  } else {
    if (!isCurrentFloat) {
      currentValue = currentValue * 10 + num;
    } else {
      currentValue = currentValue + num + "";
    }
  }
  updateDisplay();
}

function calculate() {
  if (typeof currentValue === "string") currentValue = parseFloat(currentValue);

  values.push(currentValue);
  if (values.length <= 1) {
    return values[0];
  } else {
    let result = values[0];
    for (let i = 1; i < values.length; i++) {
      switch (operators[i - 1]) {
        case "+":
          result += values[i];
          break;
        case "-":
          result -= values[i];
          break;
        case "/":
          result /= values[i];
          break;
        case "*":
          result *= values[i];
          break;
        default:
          console.log(
            "Invalid operator passed into calculate: '" + operators[i - 1] + "'"
          );
      }
    }
    values = [];
    operators = [];
    isCurrentFloat = false;
    currentValue = result;
    updateDisplay();
  }
}