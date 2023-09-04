const CURRENT_VALUE = document.getElementById("__currentValue__")
const PREVIOUS_VALUE = document.getElementById("__previousValue__")
const SELECTED_OPERATOR = document.getElementById("__selectedOperator__")
const ACTIVE_BUTTONS = document.querySelectorAll(".active")

const ENTER_BUTTON = document.querySelectorAll("[data-type='enter']")
const CLEAR_BUTTON = document.querySelectorAll("[data-type='clear']")
const REMOVE_BUTTON = document.querySelectorAll("[data-type='remove']")
const OPERATOR_BUTTONS = document.querySelectorAll("[data-type='operator']")
const NUMBER_BUTTONS = document.querySelectorAll("[data-type='number']")

let INPUT = CURRENT_VALUE

// READY
console.log("<Script started>")

// FUNCTIONS
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

function clearDisplay() {
    INPUT = CURRENT_VALUE
    SELECTED_OPERATOR.textContent = ""
    PREVIOUS_VALUE.textContent = ""
    CURRENT_VALUE.textContent = ""
    return
};

function addText(target, value){
    const current_value = target.textContent
    if (current_value.length < 12){
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

function sum(a, b) {
    return a + b
};

function subtract(a, b) {
    return a - b
};

function multiply (a, b) {
    return a * b
};

function divide(a, b) {
    return a / b
};

// EVENTS
NUMBER_BUTTONS.forEach((button) => {
    button.addEventListener("click", (event) => {
        const element = event.target
        const element_value = element.getAttribute("data-value")
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
        if ((INPUT === CURRENT_VALUE) && (CURRENT_VALUE.textContent.length >= 1) && (PREVIOUS_VALUE.textContent.length === 0)) {
            addText(SELECTED_OPERATOR, element_value)
            PREVIOUS_VALUE.textContent = CURRENT_VALUE.textContent
            CURRENT_VALUE.textContent = ""
            INPUT = CURRENT_VALUE
            return
        } else if ((INPUT === SELECTED_OPERATOR) && (SELECTED_OPERATOR.textContent.length === 0)) {
            addText(SELECTED_OPERATOR, element_value)
            PREVIOUS_VALUE.textContent = CURRENT_VALUE.textContent
            CURRENT_VALUE.textContent = ""
            INPUT = CURRENT_VALUE
            return
        } else {
            return
        };
    });
});

ENTER_BUTTON.forEach((button) => {
    button.addEventListener("click", (event) => {
        const element = event.target
        const element_type = element.getAttribute("data-type")
        const element_value = element.getAttribute("data-value")
        if ((PREVIOUS_VALUE.textContent.length >= 1) && (CURRENT_VALUE.textContent.length >= 1)){
            const operator = SELECTED_OPERATOR.textContent
            const value_a = parseInt(PREVIOUS_VALUE.textContent)
            const value_b = parseInt(CURRENT_VALUE.textContent)
            const value_c = calculate(operator, value_a,value_b)
            clearDisplay()
            INPUT = SELECTED_OPERATOR
            CURRENT_VALUE.textContent = value_c
            return
        };
    });
});

CLEAR_BUTTON.forEach((button) => {
    button.addEventListener("click", (event) => {
        clearDisplay()
        return
    });
});

REMOVE_BUTTON.forEach((button) => {
    button.addEventListener("click", (event) => {
        if((INPUT === CURRENT_VALUE || INPUT === PREVIOUS_VALUE)){
            removeText(INPUT)
            return
        };
    });
});

// function processEvent(event) {
//     const element = event.target
//     const element_type = element.getAttribute("data-type")
//     const element_value = element.getAttribute("data-value")
//     if (element_type === ""){
//         return
//     } else if ((element_type === "number") && (INPUT === CURRENT_VALUE || INPUT === PREVIOUS_VALUE)) {
//         addText(INPUT, element_value)
//         return
//     } else if ((element_type === "operator") && (INPUT === CURRENT_VALUE) && (CURRENT_VALUE.textContent.length >= 1) && (PREVIOUS_VALUE.textContent.length === 0)) {
//         addText(SELECTED_OPERATOR, element_value)
//         PREVIOUS_VALUE.textContent = CURRENT_VALUE.textContent
//         CURRENT_VALUE.textContent = ""
//         INPUT = CURRENT_VALUE
//         return
//     } else if ((element_type === "operator") && (INPUT === SELECTED_OPERATOR) && (SELECTED_OPERATOR.textContent.length === 0)) {
//         addText(SELECTED_OPERATOR, element_value)
//         PREVIOUS_VALUE.textContent = CURRENT_VALUE.textContent
//         CURRENT_VALUE.textContent = ""
//         INPUT = CURRENT_VALUE
//         return
//     } else if ((element_type === "enter") && (PREVIOUS_VALUE.textContent.length >= 1) && (CURRENT_VALUE.textContent.length >= 1)) {
//         const operator = SELECTED_OPERATOR.textContent
//         const value_a = parseInt(PREVIOUS_VALUE.textContent)
//         const value_b = parseInt(CURRENT_VALUE.textContent)
//         const value_c = calculate(operator, value_a,value_b)
//         clearDisplay()
//         INPUT = SELECTED_OPERATOR
//         CURRENT_VALUE.textContent = value_c
//         return
//     } else if ((element_type === "remove") && (INPUT === CURRENT_VALUE || INPUT === PREVIOUS_VALUE)) {
//         removeText(INPUT)
//         return
//     } else if (element_type === "clear") {
//         clearDisplay()
//         return
//     } else {
//         return
//     };
// };