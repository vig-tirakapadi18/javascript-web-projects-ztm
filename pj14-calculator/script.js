const calcDisplay = document.querySelector("h1");
const inputBtns = document.querySelectorAll("button");
const clearBtn = document.getElementById("clear-btn");

let firstValue = 0;
let operatorValue = "";
let awaitingNextValue = false;

const calculate = {
    "/": (firstNumber, secondNumber) => firstNumber / secondNumber,
    "*": (firstNumber, secondNumber) => firstNumber * secondNumber,
    "+": (firstNumber, secondNumber) => firstNumber + secondNumber,
    "-": (firstNumber, secondNumber) => firstNumber - secondNumber,
    "=": (firstNumber, secondNumber) => secondNumber
};

const useOperator = (operator) => {
    const currentValue = Number(calcDisplay.textContent);

    if (operatorValue && awaitingNextValue) {
        operatorValue = operator;
        return;
    }

    if (!firstValue) {
        firstValue = currentValue;
    } else {
        const calculation = calculate[operatorValue](firstValue, currentValue);
        calcDisplay.textContent = calculation;
        firstValue = calculation;
    }

    awaitingNextValue = true;
    operatorValue = operator;
};

const addDecimal = () => {
    if (awaitingNextValue) return;

    if (!calcDisplay.textContent.includes(".")) {
        calcDisplay.textContent = `${calcDisplay.textContent}.`;
    }
};

const resetAll = () => {
    firstValue = 0;
    operatorValue = "";
    awaitingNextValue = false;
    calcDisplay.textContent = "0";
};

const sendNumberValue = (num) => {
    if (awaitingNextValue) {
        calcDisplay.textContent = num;
        awaitingNextValue = false;
    } else {
        const displayValue = calcDisplay.textContent;
        calcDisplay.textContent = displayValue === "0" ? num : displayValue + num;
    }
};

inputBtns.forEach((inputBtn) => {
    if (inputBtn.classList.length === 0) {
        inputBtn.addEventListener("click", () => sendNumberValue(inputBtn.value));
    } else if (inputBtn.classList.contains("operator")) {
        inputBtn.addEventListener("click", () => useOperator(inputBtn.value));
    } else if (inputBtn.classList.contains("decimal")) {
        inputBtn.addEventListener("click", addDecimal);
    }
});

clearBtn.addEventListener("click", resetAll);
