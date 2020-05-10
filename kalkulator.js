const calculator = {
     displayNumber: '0',
     operator: null,
     firstNumber: null,
     waitingForSecondNumber: false
};

function updateDisplay() {
     document.querySelector("p").innerText = calculator.displayNumber;
}

function clearCalculator() {
     calculator.displayNumber = '0';
     calculator.operator = null;
     calculator.firstNumber = null;
     calculator.waitingForSecondNumber = false;
}

function inputDigit(digit) {
     if (calculator.waitingForSecondNumber && calculator.displayNumber === calculator.firstNumber) {
          calculator.displayNumber = digit; // untuk perubahan nilai, jika klik operator maka display number sebelumnya akan hilang.
     } else {
          if (calculator.displayNumber === '0') {
               calculator.displayNumber = digit;
          } else {
               calculator.displayNumber += digit;
          }
     }
}

// button function
window.addEventListener('click', function (event) {

     // mendapatkan objek elemen yang diklik
     const target = event.target;

     if (target.getAttribute('id') == 'CE') {
          clearCalculator();
          updateDisplay();
     } else if (target.getAttribute('id') == 'inverseNumber') {
          inverseNumber(target.innerText);
          updateDisplay()
     } else {
          if (target.classList.contains('operator')) {
               handleOperator(target.innerText);
               updateDisplay();
          } else if (target.classList.contains('total')) {
               perfomCalculator();
               updateDisplay();
               return;
          } else if (target.classList.contains('col')) {
               inputDigit(target.innerText);
               updateDisplay();
          }
     }

});

function inverseNumber() {
     if (calculator.displayNumber === '0') return;
     else {
          calculator.displayNumber *= -1;
     }
}

function handleOperator(op) {
     if (!calculator.waitingForSecondNumber) {
          calculator.operator = op;
          calculator.waitingForSecondNumber = true;
          calculator.firstNumber = calculator.displayNumber;
     }
}

function perfomCalculator() {
     // Check apakah operator sudah di klik / belu,
     if (calculator.operator == null) {
          alert('Operator belum di tetapkan!');
          return;
     }

     let hasil = 0;
     if (calculator.operator == '+') {
          hasil = parseInt(calculator.displayNumber) + parseInt(calculator.firstNumber);
     } else {
          hasil = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber);
     }

     const dataBaru = {
          firstNumber: calculator.firstNumber,
          secondNumber: calculator.displayNumber,
          operator: calculator.operator,
          hasil: hasil
     }

     putHistory(dataBaru);
     calculator.displayNumber = dataBaru.hasil;
     renderHistory();
}

