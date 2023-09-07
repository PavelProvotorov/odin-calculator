// VARIABLES
const MAX_LENGTH = 18
const MAX_PRECISION = 12
// ---- >
const ENTER_BUTTON = document.querySelectorAll("[data-type='enter']")
const CLEAR_BUTTON = document.querySelectorAll("[data-type='clear']")
const CLEAR_ENTRY_BUTTON = document.querySelectorAll("[data-type='clear_entry']")
const REMOVE_BUTTON = document.querySelectorAll("[data-type='remove']")
const OPERATOR_BUTTONS = document.querySelectorAll("[data-type='operator']")
const NUMBER_BUTTONS = document.querySelectorAll("[data-type='number']")
// ---- >
const CURRENT_VALUE = document.getElementById("__currentValue__")
const PREVIOUS_VALUE = document.getElementById("__previousValue__")
const SELECTED_OPERATOR = document.getElementById("__selectedOperator__")
const ACTIVE_BUTTONS = document.querySelectorAll(".active")
// ---- >
let INPUT = CURRENT_VALUE
let STORED_OPERATOR = null
let STORED_VALUE = null

// READY
console.log("<Script started>")

// FUNCTIONS

function calculateOnStoredInput() {
    const operator = STORED_OPERATOR
    const value_a = parseFloat(CURRENT_VALUE.textContent)
    const value_b = parseFloat(STORED_VALUE)
    const value_c = calculate(operator, value_a, value_b)
    clearDisplay()
    INPUT  = SELECTED_OPERATOR
    CURRENT_VALUE.textContent = value_c
};

function calculateOnNewInput() {
    const operator = SELECTED_OPERATOR.textContent
    const value_a = parseFloat(PREVIOUS_VALUE.textContent)
    const value_b = parseFloat(CURRENT_VALUE.textContent)
    const value_c = calculate(operator, value_a,value_b)
    clearDisplay()
    STORED_VALUE = value_b
    STORED_OPERATOR  = operator
    INPUT  = SELECTED_OPERATOR
    CURRENT_VALUE.textContent = value_c
};

function handleSubsequentOperatorClick(value) {
    const operator = SELECTED_OPERATOR.textContent
    const value_a = parseFloat(PREVIOUS_VALUE.textContent)
    const value_b = parseFloat(CURRENT_VALUE.textContent)
    const value_c = calculate(operator, value_a,value_b)
    clearDisplay()
    STORED_VALUE = value_b
    STORED_OPERATOR  = operator
    INPUT  = CURRENT_VALUE
    SELECTED_OPERATOR.textContent = value
    PREVIOUS_VALUE.textContent = value_c
};

function handleOperatorClick(value) {
    addText(SELECTED_OPERATOR, value)
    PREVIOUS_VALUE.textContent = CURRENT_VALUE.textContent
    CURRENT_VALUE.textContent = ""
    INPUT = CURRENT_VALUE
};

function isInputStored() {
    return (
        STORED_VALUE != null &&
        STORED_OPERATOR != null && 
        !isInputEmpty(CURRENT_VALUE)
    )
};

function isInputNew() {
    return (
        !isInputEmpty(PREVIOUS_VALUE) && 
        !isInputEmpty(CURRENT_VALUE)
    )
};

function isInputEmpty(input) {
    if (input.textContent.length === 0){
        return true
    } else {
        return false
    };
};

function clearDisplay() {
    INPUT = CURRENT_VALUE
    SELECTED_OPERATOR.textContent = ""
    PREVIOUS_VALUE.textContent = ""
    CURRENT_VALUE.textContent = ""
};

function clearStorage() {
    STORED_OPERATOR  = null
    STORED_VALUE = null
};

function checkError() {
    const value = CURRENT_VALUE.textContent
    if(value === "ERROR"){
        clearDisplay()
        clearStorage()
    };
};

function addText(target, value){
    const current_value = target.textContent
    if ((current_value === "0") && (value != ".")) {
        return target.textContent = value
    } else if (current_value.includes(".") && (value === ".")){
        return target.textContent
    } else if (current_value.length < MAX_LENGTH){
        return target.textContent += value
    };
};

function removeText(target) {
    const current_value = target.textContent
    if (current_value.length >= 1){
        const new_value = current_value.substring(0, current_value.length - 1)
        return target.textContent = new_value
    };
};

function calculate(operator ,value_a, value_b) {
    switch(operator) {
        case "+":
            return sum(value_a, value_b)
        case "-":
            return subtract(value_a, value_b)
        case "x":
            return multiply(value_a, value_b)
        case "/":
            return divide(value_a, value_b)
        default:
            return "ERROR"
    };
};

function sum(a, b) {
    return (a + b).toPrecision(MAX_PRECISION).replace(/\.?0+$/, '');
};

function subtract(a, b) {
    return (a - b).toPrecision(MAX_PRECISION).replace(/\.?0+$/, '');
};

function multiply (a, b) {
    return (a * b).toPrecision(MAX_PRECISION).replace(/\.?0+$/, '');
};

function divide(a, b) {
    if (a === 0 && b === 0){
        return "ERROR"
    } else {
        return (a / b).toPrecision(MAX_PRECISION).replace(/\.?0+$/, '');
    };
};

// EVENTS
NUMBER_BUTTONS.forEach((button) => {
    button.addEventListener("click", (event) => {
        const element = event.target
        const element_value = element.getAttribute("data-value")
        checkError()
        if(INPUT !== SELECTED_OPERATOR){
            addText(INPUT, element_value)
            return
        };
    });
});

OPERATOR_BUTTONS.forEach((button) => {
    button.addEventListener("click", (event) => {
        const element = event.target
        const element_value = element.getAttribute("data-value")
        checkError()

        if (INPUT === CURRENT_VALUE && !isInputEmpty(CURRENT_VALUE) && isInputEmpty(PREVIOUS_VALUE)) {
            handleOperatorClick(element_value)
            return
        } else if (INPUT === SELECTED_OPERATOR && isInputEmpty(SELECTED_OPERATOR) && !isInputEmpty(CURRENT_VALUE)) {
            handleOperatorClick(element_value)
            return
        } else if (INPUT === CURRENT_VALUE && !isInputEmpty(CURRENT_VALUE) && !isInputEmpty(PREVIOUS_VALUE) && !isInputEmpty(SELECTED_OPERATOR)){
            handleSubsequentOperatorClick(element_value)
        } else {
            return
        };
    });
});

ENTER_BUTTON.forEach((button) => {
    button.addEventListener("click", (event) => {
        checkError()

        if (isInputNew()){
            calculateOnNewInput()
            return
        } else if (isInputStored()){
            calculateOnStoredInput()
        } else {
            return
        };
    });
});

CLEAR_BUTTON.forEach((button) => {
    button.addEventListener("click", (event) => {
        clearDisplay()
        clearStorage()
        return
    });
});

CLEAR_ENTRY_BUTTON.forEach((button) => {
    button.addEventListener("click", (event) => {
        if (INPUT === CURRENT_VALUE){
            CURRENT_VALUE.textContent = ""
            return
        } else {
            return
        };
    });
});

REMOVE_BUTTON.forEach((button) => {
    button.addEventListener("click", (event) => {
        if(INPUT !== SELECTED_OPERATOR){
            removeText(INPUT)
            return
        } else {
            return
        };
    });
});