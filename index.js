// NOTE: The min length of __calculatorOutput__ children <div> elements is 1, due to the use of the "&nbsp" entity

const CURRENT_VALUE = document.getElementById("__currentValue__")
const PREVIOUS_VALUE = document.getElementById("__previousValue__")
const SELECTED_OPERATOR = document.getElementById("__selectedOperator__")
const ACTIVE_BUTTONS = document.querySelectorAll(".active")

let INPUT = PREVIOUS_VALUE

// READY
console.log("<Script started>")

// FUNCTIONS

function clearDisplay() {
    INPUT = PREVIOUS_VALUE
    SELECTED_OPERATOR.innerHTML = "&nbsp;"
    PREVIOUS_VALUE.innerHTML = "&nbsp;"
    CURRENT_VALUE.innerHTML = "&nbsp;"
    return
};

function addText(target, value){
    const current_value = target.textContent
    if (current_value.length <= 12){
        target.textContent += value
        return
    } else {
        return
    };
};

function removeText(target) {
    const current_value = target.textContent
    if (current_value.length >= 2){
        const new_value = current_value.substring(0, current_value.length - 1)
        target.textContent = new_value
        return
    } else {
        return
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

function calculate(operator) {
    return operator
}

// EVENTS
ACTIVE_BUTTONS.forEach((button) => {
    button.addEventListener("click", (event) => {
        const element = event.target
        const element_type = element.getAttribute("data-type")
        const element_value = element.getAttribute("data-value")
        if (element_type === ""){
            return
        } else if ((element_type === "number") && (INPUT === CURRENT_VALUE || INPUT === PREVIOUS_VALUE)) {
            addText(INPUT, element_value)
            return
        } else if ((element_type === "operator") && (INPUT === PREVIOUS_VALUE)) {
            addText(SELECTED_OPERATOR, element_value)
            INPUT = CURRENT_VALUE
            return
        } else if ((element_type === "clear") && (INPUT === CURRENT_VALUE || INPUT === PREVIOUS_VALUE)) {
            clearDisplay()
            return
        } else if ((element_type === "remove") && (INPUT === CURRENT_VALUE || INPUT === PREVIOUS_VALUE)) {
            removeText(INPUT)
            return
        } else if ((element_type === "enter") && (PREVIOUS_VALUE.textContent.length >= 2) && (CURRENT_VALUE.textContent.length >= 2)) {
            clearDisplay()
            return
        } else {
            return
        };
    });
});