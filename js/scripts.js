/*const readout = document.getElementsByClassName("calculator__readout")
const ac = document.getElementsByClassName("calculator--ac")
const plusMinus = document.getElementsByClassName("calculator--plus-minus")
const percentage = document.getElementsByClassName("calculator--percentage")
const divide = document.getElementsByClassName("calculator--divide")
const numSeven = document.getElementsByClassName("calculator--seven")
const numEight = document.getElementsByClassName("calculator--eight")
const numNine = document.getElementsByClassName("calculator--nine")
const multiply = document.getElementsByClassName("calculator--multiply")
const numFour = document.getElementsByClassName("calculator--four")
const numFive = document.getElementsByClassName("calculator--five")
const numSix = document.getElementsByClassName("calculator--six")
const minus = document.getElementsByClassName("calculator--minus")
const numOne = document.getElementsByClassName("calculator--one")
const numTwo = document.getElementsByClassName("calculator--two")
const numThree = document.getElementsByClassName("calculator--three")
const numZero = document.getElementsByClassName("calculator--plus")
const decimalPoint = document.getElementsByClassName("calculator--decimal-point")
const equals = document.getElementsByClassName("calculator--equals")

.addEventListener("click", )
*/

const calculator = {
	readout: "0", 
	operand: "",
	sum: [],
}

const calculatorButtonMap = {
	zero: 0,
	one: 1,
	two: 2,
	three: 3,
	four: 4,
	five: 5,
	six: 6,
	seven: 7,
	eight: 8,
	nine: 9,
	plus: "+",
	minus: "-",
	multiply: "*",
	divide: "/",
	percentage: "%",
	decimalPoint: ".",
}

const calculatorButtons = document.querySelectorAll(".calculator__button")
calculatorButtons.forEach(button => {
	button.addEventListener("click", (e) => readoutFunction(e))
})

function readoutFunction(e) {
	const readout = document.getElementById("readout");
	const datatype = e.target.dataset.type;
	if (!isNaN(calculatorButtonMap[datatype]) && maxReadout()) {
		if (calculator.readout === "0") {
			calculator.readout = `${calculatorButtonMap[datatype]}`;
		} else {
			calculator.readout += `${calculatorButtonMap[datatype]}`;
		}
		readout.innerHTML = calculator.readout;
		spanTagCreation();
	} else {
		calculator.operand = calculatorButtonMap[button];
		const readoutOperand = [calculator.readout, calculator.operand];
		calculator.sum.push(...readoutOperand);
		calculator.readout = "0";
	}
}

const maxReadout = () => (calculator.readout.includes(".") && calculator.readout.length <= 9) ? true : (calculator.readout.length <= 8) ? true : false;

function spanTagCreation() {
	readout.innerHTML = readout.innerHTML.replace(/\./, `<span class="calculator__readout--decimal-point-spacing">.</span>`);
	readout.innerHTML = readout.innerHTML.replace(/1/g, `<span class="calculator__readout--one-spacing">1</span>`);
}

document.addEventListener("keydown", (e) => {
})

document.getElementById("solar--panel").addEventListener('mouseover', () => {
	const readout = document.getElementById("readout")
	const readoutDP = document.getElementById("readout-decimal-point");
	readout.style.opacity = "0";
	readoutDP.style.opacity = "0";
})

document.getElementById("solar--panel").addEventListener('mouseout', () => {
	const readout = document.getElementById("readout");
	const readoutDP = document.getElementById("readout-decimal-point");
	readout.style.opacity = "1.0";
	readoutDP.style.opacity = "1.0";
})

const operator = (operand, x, y) => {
	const add = (x, y) => x + y;
	const minus = (x, y) => x - y;
	const multiply = (x, y) => x * y
	const divide = (x, y) => (y === 0) ? "undefined" : x / y;

	switch (operand) {
		case "+": 
			return add(x, y)
			break;
		case "-": 
			return minus(x, y)
			break;
		case "*": 
			return multiply(x, y)
			break;
		case "/": 
			return divide(x, y)
			break;
		default:
			"error"
	}
}



