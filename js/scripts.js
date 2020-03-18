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

let sum = 0

const calculatorButtons = {
	calculator--divide: "/",
	calculator--multiply: "*",
	calculator--minus: "-",
	calculator--plus: "+",
	calculator--one: "1",
	calculator--two: "2",
	calculator--three: "3",
	calculator--four: "4",
	calculator--five: "5",
	calculator--six: "6",
	calculator--seven: "7",
	calculator--eight: "8",
	calculator--nine: "9",
	calculator--zero: "0",
	calculator--decimal-point: ".",
	calculator--percentage: "%"
	calculator--plus-minus: "-"
}

document.addEventListener("click", (e) => {
	console.log(e.target);
})