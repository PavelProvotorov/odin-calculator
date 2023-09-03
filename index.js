console.log("<Script started>")

const CURRENT_VALUE = document.getElementById("__currentValue__")
const PREVIOUS_VALUE = document.getElementById("__previousValue__")
const SELECTED_OPERATOR = document.getElementById("__selectedOperator__")
const ACTIVE_BUTTONS = document.querySelectorAll(".active")

// READY

// FUNCTIONS
function add(a, b) {
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
    });
});

// NOTE: Max legth is 12 symbols