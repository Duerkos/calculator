const display = document.querySelector(".displayDiv");

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
function updateDisplay(number){
    display.textContent = number;
}


