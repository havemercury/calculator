const display = document.getElementById('display');
const buttons = document.querySelectorAll('div.btn');
const loggedInputs = document.querySelector('#log');
const multReg = /(0|[1-9]\d*)(\.\d+)? \* (0|[1-9]\d*)(\.\d+)?/g;
const divideReg = /(0|[1-9]\d*)(\.\d+)? \/ (0|[1-9]\d*)(\.\d+)?/g;
const addReg = /(0|[1-9]\d*)(\.\d+)? \+ (0|[1-9]\d*)(\.\d+)?/g;
const subtractReg = /(0|[1-9]\d*)(\.\d+)? - (0|[1-9]\d*)(\.\d+)?/g;
const calcReg = /(0|[1-9]\d*)(\.\d+)? \S (0|[1-9]\d*)(\.\d+)?/g;
const aReg = /(0|[1-9]\d*)(\.\d+)? /g;
const bReg = / (0|[1-9]\d*)(\.\d+)?/g;

function showSelected() {
  this.classList.add('selected');
  const buttonId = this.id;
  displayInput(buttonId);
}

function removeSelected() {
  this.classList.remove('selected');
}

function showSelectedKey(event) {
  const key = document.querySelector(`.btn[data-code="${event.code}"]`);
  if (!key) return;
  const buttonId = key.id;
  key.classList.add('selected');
  displayInput(buttonId);
}

const displayInput = buttonId => {
  switch (buttonId) {
    case 'clear':
      clear();
      break;
    case 'delete':
      display.value = display.value.substring(0, display.value.length - 1);
      break;
    case 'one':
      insertNum('1');
      break;
    case 'two':
      insertNum('2');
      break;
    case 'three':
      insertNum('3');
      break;
    case 'four':
      insertNum('4');
      break;
    case 'five':
      insertNum('5');
      break;
    case 'six':
      insertNum('6');
      break;
    case 'seven':
      insertNum('7');
      break;
    case 'eight':
      insertNum('8');
      break;
    case 'nine':
      insertNum('9');
      break;
    case 'zero':
      insertNum('0');
      break;
    case 'decimal':
      insertNum('.');
      break;
    case 'add':
      logInput('+');
      break;
    case 'subtract':
      logInput('-');
      break;
    case 'multiply':
      logInput('*');
      break;
    case 'divide':
      logInput('/');
      break;
    case 'equals':
      if (log.textContent === '') return;
      if (log.textContent.charAt(log.textContent.length - 2) === '=') return;
      logInput('=');
      calculate();
  }
};

const logInput = sign => {
  if (log.textContent.charAt(log.textContent.length - 2) === '=') {
    log.textContent = log.textContent.substring(0, display.value.length - 3);
  }
  loggedInputs.textContent += `${display.value} ${sign} `;
  display.value = '';
};

const clear = () => {
  document.getElementById('log').innerHTML = '';
  display.value = '0';
};

const insertNum = str => {
  if (log.textContent.charAt(log.textContent.length - 2) === '=') clear();

  const dd = /\.\.+/g;
  let ddMatches = display.value.match(dd);

  if (ddMatches) {
    let fixedDecimals = display.value.replace(ddMatches, '.');
    display.value = fixedDecimals;
  }

  const spacedDecimals = /\d\.\d\.+/g;
  let mdMatch = display.value.match(spacedDecimals);

  if (mdMatch) {
    let fixedDecimals2 = display.value.replace(/.([^.]*)$/, '$1');
    display.value = fixedDecimals2;
  }

  if (display.value === '0' || display.value === '') {
    display.value = str;
  } else {
    display.value += str;
  }
};

const calculate = () => {
  let calcStr = loggedInputs.textContent.slice(0, -3);

  const dd = /\.\.+/g;
  let ddMatches = calcStr.match(dd);

  if (ddMatches) {
    calcStr = calcStr.replace(ddMatches, '.');
    loggedInputs.textContent = calcStr;
  }

  const oneOp = /[\+\-\*\\]+/g;
  const twoOps = /[\+\-\*\\]  [\+\-\*\\]+/g;
  const threeOps = /[\+\-\*\\]  [\+\-\*\\]  [\+\-\*\\]+/g;
  let hasOneOp = calcStr.match(oneOp);
  let moreThanOneOp = calcStr.match(twoOps);
  let moreThanTwoOp = calcStr.match(threeOps);

  if (moreThanTwoOp) {
    calcStr = calcStr.replace(moreThanOneOp, '');
    loggedInputs.textContent = calcStr;
  }

  if (moreThanOneOp && hasOneOp[1] != '-') {
    console.log(hasOneOp[0]);
    calcStr = calcStr.replace(hasOneOp[0], '');
    loggedInputs.textContent = calcStr;
  }

  display.value = eval(calcStr);
};

buttons.forEach(button => {
  button.addEventListener('click', showSelected);
  button.addEventListener('transitionend', removeSelected);
});

window.addEventListener('keydown', showSelectedKey);
