const display = document.querySelector(".displayDiv");
const buttonDigits = document.querySelectorAll(".buttonDigit");
const buttonOperations = document.querySelectorAll(".buttonOps");
const buttonEqual = document.querySelector("#equal");
const buttonBackspace = document.querySelector("#backspace");
const buttonClear = document.querySelector("#clear");
const buttonSign = document.querySelector("#sign");

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
        case "add":
            return add(a,b);
        case "substract":
            return substract(a,b);
        case "multiply":
            return multiply(a,b);
        case "divide":
            return divide(a,b);
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
    console.log(number);
    console.log(nDisplay);
}

buttonDigits.forEach((buttonDigit) => {
    buttonDigit.addEventListener("click", () =>{
        addDigits(buttonDigit.id);
    });
});

buttonOperations.forEach((buttonOperation) => {
    buttonOperation.addEventListener("click", () =>{
        //This means this is the first operation, we wait until next input. operator is logged until next operation or equal.
        if (operator == ""){
            operator = buttonOperation.id;
            previousInput = input;
        } //We are chaining operations, so we display the previous calculation
        else {
            input = operate(operator,previousInput,input);
            operator = buttonOperation.id;
            previousInput = input;
        }
        updateDisplay(input);
        readyNewInput = true;
    });
});
buttonEqual.addEventListener("click", () =>{
    //We were waiting for another number. Keep displaying same input as before and erase last operator
    if (readyNewInput) operator = "";
    //We introduced a new number and had an operation on queue
    else {
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