const display = document.querySelector(".displayDiv");
const body = document.querySelector("body");
const buttonDigits = document.querySelectorAll(".buttonDigit");
const buttonOperations = document.querySelectorAll(".buttonOps");
const buttonEqual = document.getElementById("Enter");
const buttonBackspace = document.getElementById("Backspace");
const buttonClear = document.getElementById("Delete");
const buttonSign = document.getElementById("Alt");
const buttons = document.querySelectorAll("button");

let input = "0";
let previousInput = "0";
let operator = "";
let readyNewInput = true;

function add(a,b){return Number(a)+Number(b);} 
function substract(a,b){return Number(a)-Number(b);}
function multiply(a,b){return a*b;}
function divide(a,b){return a/b;}

function operate(operator,a,b){
    switch (operator){
        case "+":
            return add(a,b);
        case "-":
            return substract(a,b);
        case "*":
            return multiply(a,b);
        case "/":
            if (b == "0") return "Don't /0!"
            else return divide(a,b);
    }
}

function addDigits(digit){
    if (readyNewInput) {
        if (input != "-") {
            input = digit;
            readyNewInput = false;
        } else {
            input += digit;
            readyNewInput = false;
        }

    }else if(!(input.includes(".") && digit == ".")) input += digit;
    updateDisplay(input);
}

function updateDisplay(number){
    let nDisplay = String(number);
    if (nDisplay.length == 0) nDisplay = "0";
    else if (nDisplay.length > 16) nDisplay = Number(nDisplay).toPrecision(11);
    display.textContent = nDisplay;
}

function prepareOperator(newOperator){
    //This means this is the first operation, we wait until next input. operator is logged until next operation or equal.
    if (operator == ""){
        operator = newOperator;
        previousInput = input;
    } //We are chaining operations, so we display the previous calculation
    else {
        input = operate(operator,previousInput,input);
        operator = newOperator;
        previousInput = input;
    }
    updateDisplay(input);
    readyNewInput = true;
}

buttonDigits.forEach((buttonDigit) => {
    buttonDigit.addEventListener("click", () =>{
        addDigits(buttonDigit.id);

    });
});

buttons.forEach((button) => {
    button.addEventListener("transitionend", () =>{
        button.classList.remove("active");
    });
});

buttonOperations.forEach((buttonOperation) => {
    buttonOperation.addEventListener("click", () =>{
        prepareOperator(buttonOperation.id);
            previousInput = input;
    });
});
buttonEqual.addEventListener("click", () =>{
    //We were waiting for another number. Keep displaying same input as before and erase last operator
    if (readyNewInput) operator = "";
    //We introduced a new number and had an operation on queue
    else if (operator != ""){
        input = operate(operator,previousInput,input);
        operator = "";
        updateDisplay(input);
        readyNewInput = true;
    }
});

buttonBackspace.addEventListener("click", () =>{
  if(!readyNewInput){
      input = input.slice(0,length-1);
      updateDisplay(input);
  }
});


buttonClear.addEventListener("click", () =>{
  input = "0";
  previousInput = "0";
  operator= "";
  readyNewInput = true;
  updateDisplay(input);
});

buttonSign.addEventListener("click", () =>{
    if (readyNewInput) {
        if (input == "-") input = 0;
        else input = "-";
    }
    else if(input.charAt(0) == "-")input = input.slice(1);
    else input = "-" + input;
    updateDisplay(input);
});

body.addEventListener("keydown", (e) =>{
    let buttonPress = document.getElementById(e.key);
    if (buttonPress){
        buttonPress.click();
        buttonPress.classList.add("active")
    }
});
