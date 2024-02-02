console.log('hii');
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-07-26T17:01:17.194Z',
    '2020-07-28T23:36:17.929Z',
    '2020-08-01T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance_value');
const labelSumIn = document.querySelector('.summary_value_in');
const labelSumOut = document.querySelector('.summary_value_out');
const labelInterest = document.querySelector('.summary_value_interest');
const labelTimer = document.querySelector('.timer');
const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');
const btnLogin = document.querySelector('.login_button');
const btnTransfer = document.querySelector('.form_transfer_btn');
const inputTransferTo = document.querySelector('.form_transfer_to');
const inputTransferAmount = document.querySelector('.form_transfer_amount');
const inputUsername = document.querySelector('.login_input_user');
const inputPin = document.querySelector('.login_input_pin');
const btnLoan = document.querySelector('.form_btn_loan');
const loanAmount = document.querySelector('.form_input_loan');
const btnClose = document.querySelector('.form_btn_close');
const closeUserInput = document.querySelector('.form_input_user_close');
const closePin = document.querySelector('.form_input_pin_close');

const formatMovementDate = function (date, locale) {
  const calcdayPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  const dayPassed = calcdayPassed(new Date(), date);
  console.log(dayPassed);
  if (dayPassed === 0) return 'Today';
  if (dayPassed === 1) return 'Yesterday';
  if (dayPassed <= 7) return `${dayPassed} days ago`;

  return new Intl.DateTimeFormat(locale).format(date);
};
const formatCurr = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};
const displayMovements = function (acc) {
  containerMovements.innerHTML = '';
  acc.movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(acc.movementsDates[i]);

    const displayDate = formatMovementDate(date, acc.locale);
    const formattedMov = formatCurr(mov, acc.locale, acc.currency);

    const html = `
          <div class="movements_row">
          <div class="movements_type movements_type_${type}">${
      i + 1
    } ${type}</div>
                    <div class="movements_date">${displayDate}</div>

          <div class="movements_value">${formattedMov}</div>
        </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
console.log(accounts);
const createUserName = function (accs) {
  accs.forEach(function (acc) {
    acc.userName = acc.owner
      .toLowerCase()
      .split(' ')
      .map((name) => name[0])
      .join('');
  });
};
createUserName(accounts);
//balance
const printBalance = function (acc) {
  const balance = acc.movements.reduce((accm, mov) => accm + mov, 0);
  acc.balance = balance;
  labelBalance.textContent = formatCurr(acc.balance, acc.locale, acc.currency);
};
const totalIn = function (acc) {
  const deposit = acc.movements
    .filter((mov) => mov > 0)
    .reduce((mov, accm) => mov + accm, 0);
  labelSumIn.textContent = formatCurr(deposit, acc.locale, acc.currency);
};

const totalOut = function (acc) {
  const withdrew = Math.abs(
    acc.movements.filter((mov) => mov < 0).reduce((mov, accm) => mov + accm, 0)
  );
  labelSumOut.textContent = formatCurr(
    Math.abs(withdrew),
    acc.locale,
    acc.currency
  );
};
const interest = function (accounts) {
  const interestValue = accounts.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * accounts.interestRate) / 100)
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelInterest.textContent = formatCurr(
    interestValue,
    accounts.locale,
    accounts.currency
  );
};

const updateUI = function (acc) {
  displayMovements(acc);
  printBalance(acc);
  totalIn(acc);
  totalOut(acc);
  interest(acc);
};

const startLogOutTimer = function () {
  //set time to 5 minutes
  let time = 120;
  //call the timer every second
  const timer = setInterval(function () {
    const mint = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = time % 60;
    labelTimer.textContent = `${mint}:${sec}`;
    //Decrease 1s
    time--;
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }
  }, 1000);

  //in each call, print the remaining time to UI
};

let currentAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find((acc) => acc.userName === inputUsername.value);
  console.log(currentAccount);
  const now = new Date();
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    // weekday: 'long',
  };
  console.log(currentAccount.locale);
  labelDate.textContent = new Intl.DateTimeFormat(
    currentAccount.locale,
    options
  ).format(now);
  if (currentAccount?.pin === Number(inputPin.value)) {
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;

    containerApp.style.opacity = 100;

    inputPin.blur();
    startLogOutTimer();
    inputUsername.value = inputPin.value = '';
  }
  updateUI(currentAccount);
});
//TRANSFER SECTION
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const recieverAcc = accounts.find(
    (acc) => acc.userName === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    amount > 0 &&
    currentAccount.balance >= amount &&
    recieverAcc?.userName !== currentAccount.userName
  ) {
    currentAccount.movements.push(-amount);
    recieverAcc.movements.push(amount);
  }
  currentAccount.movementsDates.push(new Date().toISOString());
  recieverAcc.movementsDates.push(new Date());
  updateUI(currentAccount);
});

//LOAN SECTION
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Math.floor(loanAmount.value);
  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    setTimeout(function () {
      currentAccount.movements.push(amount);
      currentAccount.movementsDates.push(new Date().toISOString());

      updateUI(currentAccount);
    }, 2500);
  }
  loanAmount.value = '';
});
//CLOSE ACCOUNT SECTION
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    closeUserInput.value === currentAccount.userName &&
    +closePin.value === currentAccount.pin
  ) {
    containerApp.style.opacity = 0;
  }
});
