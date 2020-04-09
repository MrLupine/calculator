const calculatorButtons = document.querySelectorAll(".calculator__button")
calculatorButtons.forEach(button => {
	button.addEventListener("mouseup", (e) => calcFunction(e.target.dataset.type, ))
})

const buttonPress = (e) => {
	const currentButton = document.querySelector(`[data-type='${e.key}']`);
	if (currentButton) {
		if (currentButton.classList.contains("calculator__button--function")) {
			currentButton.classList.toggle("calculator__button--function-active")
		} else if (currentButton.classList.contains("calculator--equals")) {
			currentButton.classList.toggle("calculator--equals-active")
		} else {
			currentButton.classList.toggle("calculator__button--active");
		}
	}
}

document.addEventListener("keydown", (e) => {
	buttonPress(e)
	calcFunction(e.key);
})

document.addEventListener("keyup", (e) => {
	buttonPress(e)
})

const calculator = {
	readout: "", 
	operand: "",
	inputs: [],
	total: "",
}

function calcFunction(input) {
	const decimalPoint = document.getElementById("readout-decimal-point")
	const readout = document.getElementById("readout");
	const operands = ["+", "-", "*", "/"]
	const inputs = [".", "=", "Enter", "Backspace", "plus-minus"]

	const decimalPointCheck = () => (readout.innerHTML.includes("."))
	const decimalPointReplace = () => (!decimalPointCheck()) ? decimalPoint.innerHTML = `<span class="calculator__readout--decimal-point-spacing">.</span>` : decimalPoint.innerHTML = ""
	const inputNum = () => calculator.inputs.push(Number(calculator.readout))	
	const maxReadout = (number) => (calculator.readout.length < number || (calculator.readout.length <= (number + 1) && calculator.readout.includes(".")));	
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
	const updateDomReadout = x => {
		const spanTagCreation = () => {
			readout.innerHTML = readout.innerHTML.replace(/\./, `<span class="calculator__readout--decimal-point-spacing">.</span>`);
			readout.innerHTML = readout.innerHTML.replace(/1/g, `<span class="calculator__readout--one-spacing">1</span>`);
		}
		calculator.readout = `${x}`
		readout.innerHTML = calculator.readout;
		spanTagCreation();
	}

	const inputNumber = () => {
		if (maxReadout(9)) {
			if (calculator.readout === "" && input === "0") {
				return
			}
			updateDomReadout(calculator.readout + `${input}`);
			CalcWordsFlip();
		}
	}
	const inputDecimal = () => {
		if (!decimalPointCheck()) {
			if (calculator.readout === "" && input === ".") {
				updateDomReadout(calculator.readout + "0.");
			} else {
				updateDomReadout(calculator.readout + ".");
			}
		}
	}
	const inputOperand = () => {
		if (!calculator.operand && calculator.readout) {
			inputNum();
			calculator.readout = "";
		}
		if (!calculator.inputs.length && !calculator.readout) {
			calculator.inputs.push(Number(calculator.total));
		} 
		if  (calculator.operand && calculator.readout) {
			inputNum()
			updateDomReadout(operator(calculator.operand, calculator.inputs[0], calculator.inputs[1]))
			calculator.inputs = [(Number(calculator.readout))];
			calculator.readout = "";
		}
		calculator.operand = input;
	}
	const inputPercentage = () => {
		if (calculator.inputs[0]) {
			updateDomReadout(calculator.inputs[0]/100 * calculator.readout);
		} else {
			updateDomReadout(calculator.readout / 100);
		}
	}
	const inputPlusMinus = () => {
		plusOrMinus = () => (!calculator.readout) ? "-0" : calculator.readout[0] === "-" ? calculator.readout.slice(1) : !maxReadout(8) ? `-${calculator.readout.slice(0, -1)}` : `-${calculator.readout}`;
		updateDomReadout(plusOrMinus());
	}
	const inputEnter = () => {
		if (!calculator.inputs[1] && !calculator.operand) {
			return;
		} else {
			inputNum();
			updateDomReadout(calculator.total = operator(calculator.operand, calculator.inputs[0], calculator.inputs[1]))
			calculator.readout = calculator.operand = "";
			calculator.inputs = [];
		}
	}
	const inputBackspace = () => {
		if (calculator.readout) {
			updateDomReadout(calculator.readout.slice(0, -1));
			if (!calculator.readout) {
				readout.innerHTML = "0"
			}
		} else {
			calculator.readout = calculator.operand = "";
			calculator.inputs = [];
			readout.innerHTML = "0";
			calculator.total = ""
		}
	}
	
	const inputChecker = () => !isNaN(input) ? "num" : operands.includes(`${input}`) ? "operand" : inputs.includes(`${input}`) ? input : null

	const calcButtonMap = {
		"num": () => {
			inputNumber()
		},
		"operand": () => {
			inputOperand()
		},
		".": () => {
			inputDecimal()
		},
		"Enter": () => {
			inputEnter()
		},
		"=": () => {
			inputEnter()
		},
		"Backspace": () => {
			inputBackspace()
		},
		"plus-minus": () => {
			inputPlusMinus()
		},
	}

	if (inputChecker()){
		calcButtonMap[`${inputChecker()}`]();
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
