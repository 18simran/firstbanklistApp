console.log('hii');
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
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
const labelInterest = document.querySelector('.summary_value_out');
const labelTimer = document.querySelector('.timer');
const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');
const btnLogin = document.querySelector('.login_button');
const btnTransfer = document.querySelector('.operation_transfer');
const btnRequest = document.querySelector('.operation_request');
const btnClose = document.querySelector('.operation_close');
const inputCloseUsername = document.querySelector('.login_input_user');
const inputClosePin = document.querySelector('.login_input_pin');

const displayMovements = function (movements) {
  // containerMovements.innerHTML = '' ;
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
          <div class="movements_row">
          <div class="movements_type movements_type_${type}">${
      i + 1
    } ${type}</div>
          
          <div class="movements_value">${mov}</div>
        </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
displayMovements(account1.movements);
