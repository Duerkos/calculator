const display = document.querySelector(".displayDiv");
let input = "";

function add(a,b){return a+b;} 
function substract(a,b){return a-b;}
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
            return divide(a,b);
    }
}

function addDigits(digit){
    input = input + digit;
    updateDisplay(input);
}

function updateDisplay(number){
    display.textContent = number;
}
const buttonDigits = document.querySelectorAll(".buttonDigit");
const buttonOperations = document.querySelectorAll(".buttonOps");

buttonDigits.forEach((buttonDigit) => {
    buttonDigit.addEventListener("click", () =>{
        addDigits(buttonDigit.id);
});

});
