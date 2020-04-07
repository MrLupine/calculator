const calculatorButtons = document.querySelectorAll(".calculator__button")
calculatorButtons.forEach(button => {
	button.addEventListener("mouseup", (e) => calcFunction(e.target.dataset.type, e))
})

document.addEventListener("keydown", (e) => {
	calcFunction(e.key, e);
})

const calculator = {
	readout: "", 
	operand: "",
	inputs: [],
}

function calcFunction(input) {
	const decimalPoint = document.getElementById("readout-decimal-point")
	const readout = document.getElementById("readout");
	const operands = ["+", "-", "*", "/"]

	const decimalPointCheck = () => (readout.innerHTML.includes("."))
	const decimalPointReplace = () => (!decimalPointCheck()) ? decimalPoint.innerHTML = `<span class="calculator__readout--decimal-point-spacing">.</span>` : decimalPoint.innerHTML = ""
	const inputNum = () => calculator.inputs.push(Number(calculator.readout))	
	const maxReadout = () => (calculator.readout.includes(".") && calculator.readout.length <= 9) ? true : (calculator.readout.length <= 8);	
	const maxReadoutHTML = () => (readout.innerHTML.includes(".") && readout.innerHTML.length <= 10) ? true : (readout.innerHTML.length <= 9);
	const operandCheck = () => (operands.includes(`${input}`));
	const operator = (operand, x, y) => {
		const add = (x, y) => x + y;
		const minus = (x, y) => x - y;
		const multiply = (x, y) => x * y
		const divide = (x, y) => (y === 0) ? "undefined" : x / y;
		const totalLimiter = (x) => {
			const value = x.toString()
			let indexOf = (indexItem) => value.indexOf(`${indexItem}`)
			if (value.includes(".") && indexOf(".") < 9 && value.length > 10) {
				if (indexOf("0.") === 0 && !Number(value.slice(2, 10))) {
					const exponent = `${Math.abs(Math.log10(value))}`;
					return x.toExponential(6 - exponent.length);
				} else {
					return x.toFixed(9 - indexOf("."));
				}
			} else if (value.length > 9) {
				return x.toExponential(4);
			} else {
				return x;
			}
		}

		switch (operand) {
			case "+": 
				return totalLimiter(add(x, y))
				break;
			case "-": 
				return totalLimiter(minus(x, y))
				break;
			case "*": 
				return totalLimiter(multiply(x, y))
				break;
			case "/": 
				return totalLimiter(divide(x, y))
				break;
			default:
				"error"
		}
	}
	const CalcWordsFlip = () => {
		if (calculator.readout === "5318008" || calculator.readout === "0.1134") {
			const calculator = document.getElementById("calculator");
			const resetFlip = () => calculator.style.transform = "";
			calculator.style.transform = "rotate(180deg)";
			setTimeout(resetFlip, 6000);
		}
	}
	const spanTagCreation = () => {
		readout.innerHTML = readout.innerHTML.replace(/\./, `<span class="calculator__readout--decimal-point-spacing">.</span>`);
		readout.innerHTML = readout.innerHTML.replace(/1/g, `<span class="calculator__readout--one-spacing">1</span>`);
	}
	const updateDomReadout = (x) => {
		calculator.readout = `${x}`
		readout.innerHTML = calculator.readout;
	}

	if (!isNaN(input) && maxReadout()) {
		if (calculator.readout === "0" && input === 0) {
			return
		}
		updateDomReadout(calculator.readout + `${input}`);
		CalcWordsFlip();
	} else if (input === "." && !decimalPointCheck()) {
		if (calculator.readout === "" && input === ".") {
			updateDomReadout(calculator.readout + "0.");
		} else {
			updateDomReadout(calculator.readout + ".");
		}
	} else if (operandCheck(input)) {
		if (!calculator.operand && calculator.readout) {
			inputNum();
			calculator.operand = input;
			calculator.readout = "";
		} else if (calculator.operand && !calculator.readout) {
			calculator.operand = input;
		} else if (!calculator.inputs.length && !calculator.readout) {
			calculator.inputs.push(Number(readout.innerHTML));
			calculator.operand = input;
			calculator.readout = "";
		} else {
			inputNum()
			updateDomReadout(operator(calculator.operand, calculator.inputs[0], calculator.inputs[1]))
			calculator.operand = input;
			calculator.inputs = [(Number(calculator.readout))];
			calculator.readout = "";
		}
	} else if (input === "%") {
		if (calculator.inputs[0]) {
			updateDomReadout(calculator.inputs[0]/100 * calculator.readout);
		} else {
			updateDomReadout(calculator.readout / 100);
		}
	} else if (input === "=" || input === "Enter") {
		if (!calculator.inputs[1] && !calculator.operand) {
			return;
		} else {
			inputNum();
			updateDomReadout(operator(calculator.operand, calculator.inputs[0], calculator.inputs[1]))
			calculator.readout = "";
			calculator.operand = "";
			calculator.inputs = [];
		}
	} else if (input === "ac" || input === "Backspace") {
		if (calculator.readout && input === "Backspace") {
			updateDomReadout(calculator.readout.slice(0, -1));
		} else if (calculator.readout && input === "ac") {
			updateDomReadout("")
		} else {
			calculator.readout = ""; 
			calculator.operand = "";
			calculator.inputs = [];
			readout.innerHTML = "0";
		}
	}
	if (maxReadoutHTML()) {
		spanTagCreation();
	}
	decimalPointReplace();
}

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
