class InvalidOpError extends Error {
    constructor(operation) {
      super(`Invalid operation: ${operation}`);
      this.name = InvalidOpError;
    }
}
  
function calc(operation, num1, num2) {
    if (isNaN(Number(num1))) {
        throw new TypeError(`${num1} is invalid`);
    }
    if (isNaN(Number(num2))) {
        throw new TypeError(`${num2} is invalid`);
    }
    const first = Number(num1);
    const second = Number(num2);
    let calculation;
  
    switch (operation) {
      case '+':
        calculation = first + second;
        break;
      case '-':
        calculation = first - second;
        break;
      case '*':
        calculation = first * second;
        break;
      case '/':
        calculation = first / second;
        break;
      default:
        throw new InvalidOpError(operation);
    }
    if (Number.isFinite(calculation)) {
      return calculation;
    }
    throw new Error('Invalid result!');
}
  
function error(button, func) {
    document.getElementById(button).addEventListener('click', err => {
        err.preventDefault();
        func();
    });
}

function globalError(){
    try { 
        console.log('Error Triggered');
        abooM('Error Triggered'); 
    } catch(err) {
        if (window.onerror){
            console.error('ReferenceError: ' + err.message);
        } else {
            console.log('No errors');
        }
    }
}
  
document.addEventListener('DOMContentLoaded', () => {
    const string1 = document.getElementById('num1');
    const string2 = document.getElementById('num2');
    const operation = document.getElementById('operation');
    const calculation = document.getElementById('calculation');
    const calcForm = document.getElementById('calcForm');

    calcForm.addEventListener('submit', err => {
        err.preventDefault();
        try {
            calculation.innerText = calc(operation.value, string1.value, string2.value);
        } catch (err) {
            calculation.innerText = "ERR!";
        console.error(`Caught error: ${err.message}`);
        } finally {
        console.log('Demo');
        }
    });
    
    error('console_log', () => console.log(`Calculated result: ${calculation.innerText}`));
    error('console_error', () => console.error(`Operator error: ${operation.value}`));
    error('console_dir', () => console.dir(calcForm.children));
    error('console_dirxml', () => console.dirxml(calcForm));
    error('console_group', () => console.group());
    error('console_groupEnd', () => console.groupEnd());
    error('console_table', () => console.table({ string1: string1.value, operation: operation.value, string2: string2.value, calculation: calculation.innerText }));
    error('console_time', () => console.time());
    error('console_timeEnd', () => console.timeEnd());
    error('console_trace', () => console.trace());
    error('global_error', () => globalError());
});