"use strict";

// Simply Bank App

const account1 = {
  userName: "Cecil Ireland",
  transactions: [500, 250, -300, 5000, -850, -110, -170, 1100],
  interest: 1.5,
  pin: 1111,
};

const account2 = {
  userName: "Amani Salt",
  transactions: [2000, 6400, -1350, -70, -210, -2000, 5500, -30],
  interest: 1.3,
  pin: 2222,
};

const account3 = {
  userName: "Corey Martinez",
  transactions: [900, -200, 280, 300, -200, 150, 1400, -400],
  interest: 0.8,
  pin: 3333,
};

const account4 = {
  userName: "Kamile Searle",
  transactions: [530, 1300, 500, 40, 190],
  interest: 1,
  pin: 4444,
};

const account5 = {
  userName: "Oliver Avila",
  transactions: [630, 800, 300, 50, 120],
  interest: 1.1,
  pin: 5555,
};

const accounts = [account1, account2, account3, account4, account5];

const bankDeposit = accounts
  .flatMap((el) => el.transactions)
  .filter((el) => el > 0)
  .reduce((acc, el) => acc + el);

const bankWithdrawal = accounts
  .flatMap((el) => el.transactions)
  .filter((el) => el <= -300).length;

const bankWithdrawal1 = accounts
  .flatMap((el) => el.transactions)
  .reduce((count, trans) => (trans <= -300 ? count + 1 : count), 0);

const { deposits, withdrawals } = accounts
  .flatMap((el) => el.transactions)
  .reduce(
    (acc, trans) => {
      acc[trans > 0 ? "deposits" : "withdrawals"] += trans;
      return acc;
    },
    { deposits: 0, withdrawals: 0 }
  );

/////

// работа с массивами в javascript -> Работа с Массивами в JavaScript

const text = "работа с массивами в javascript";
const text1 = "работа с массивами в javascript ПРОСТЫМ языком для новичков";

const toTitle = function (text) {
  const exeptions = ["с", "в", "для", "и"];

  const titleCase = text
    .toLowerCase()
    .split(" ")
    .map((word) =>
      exeptions.includes(word) ? word : word[0].toUpperCase() + word.slice(1)
    ).join(' ');

};
toTitle(text);

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".total__value--in");
const labelSumOut = document.querySelector(".total__value--out");
const labelSumInterest = document.querySelector(".total__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerTransactions = document.querySelector(".transactions");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");
//
//
//
//
//
const displayTransactions = function (transactions, sort = false) {
  containerTransactions.innerHTML = " ";
  const transac = sort
    ? transactions.slice().sort((x, y) => x - y)
    : transactions;

  transac.forEach((trans, index) => {
    const transType = trans > 0 ? "deposit" : "withdrawal";

    const transactionsRow = `<div class="transactions__row">
          <div class="transactions__type transactions__type--${transType}">
            ${index + 1} ${transType}
          </div>
          <div class="transactions__date">2 дня назад</div>
          <div class="transactions__value">${trans}$</div>
        </div>`;

    containerTransactions.insertAdjacentHTML("afterbegin", transactionsRow);
  });
};

const createNickName = function (accounts) {
  accounts.forEach(
    (acc) =>
      (acc.nickname = acc.userName
        .toLowerCase()
        .split(" ")
        .map((item) => item[0])
        .join(""))
  );
};
createNickName(accounts);

function displayBalance(account) {
  const balance = account.transactions.reduce((accum, trans) => accum + trans);
  labelBalance.textContent = balance + "$";
  account.balance = balance;
}

const displayTotal = function (account) {
  const deposit = account.transactions
    .filter((trans) => trans > 0)
    .reduce((accum, trans) => accum + trans, 0);

  labelSumIn.textContent = `${deposit}$`;

  const withdrawal = account.transactions
    .filter((trans) => trans < 0)
    .reduce((acc, trans) => acc + trans, 0);

  labelSumOut.textContent = withdrawal + "$";

  const interestTotal = account.transactions
    .filter((trans) => trans > 0)
    .map((deposit) => (deposit * account.interest) / 100)
    .filter((interest) => interest >= 5)
    .reduce((acc, interest) => acc + interest, 0);

  labelSumInterest.textContent = `${interestTotal}$`;
};
const updateUi = function (account) {
  // Display trans
  displayTransactions(account.transactions);
  // Display balance
  displayBalance(account);
  //Display total
  displayTotal(account);
};
let currentAccount;

//Обработчики

btnLogin.addEventListener("click", function (event) {
  event.preventDefault();

  currentAccount = accounts.find(
    (account) => account.nickname === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Diplay UI
    labelWelcome.textContent = `Добрый день,  ${
      currentAccount.userName.split(" ")[0]
    } !`;
    updateUi(currentAccount);
    containerApp.style.opacity = 100;
    // Clear Input
    inputLoginUsername.value = "";
    inputLoginPin.value = "";
    inputLoginPin.blur();
  }
});

btnTransfer.addEventListener("click", function (event) {
  event.preventDefault();

  const transferAmount = Number(inputTransferAmount.value);
  const recipientNickname = inputTransferTo.value;
  const recipientAccount = accounts.find(
    (account) => account.nickname === recipientNickname
  );
  inputTransferTo.value = "";
  inputTransferAmount.value = "";
  if (
    recipientAccount &&
    transferAmount > 0 &&
    currentAccount.balance >= transferAmount &&
    recipientAccount?.nickname != currentAccount.nickname
  ) {
    currentAccount.transactions.push(-transferAmount);
    recipientAccount.transactions.push(transferAmount);
    updateUi(currentAccount);
  }
});

btnClose.addEventListener("click", function (event) {
  event.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.nickname &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const currentAccountIndex = accounts.findIndex(
      (account) => account.nickname === currentAccount.nickname
    );
    accounts.splice(currentAccountIndex, 1);
    containerApp.style.opacity = 0;
  }
  labelWelcome.textContent = "Войдите в свой аккаунт";
  inputCloseUsername.value = "";
  inputClosePin.value = "";
});

btnLoan.addEventListener("click", function (event) {
  event.preventDefault();
  const loanAmount = Number(inputLoanAmount.value);
  if (
    loanAmount > 0 &&
    currentAccount.transactions.some(
      (trans) => trans >= (loanAmount * 10) / 100
    )
  ) {
    currentAccount.transactions.push(loanAmount);
    updateUi(currentAccount);
  }
  inputLoanAmount.value = "";
});

let transactionsSorted = false;
btnSort.addEventListener("click", function (event) {
  event.preventDefault();
  displayTransactions(currentAccount.transactions, !transactionsSorted);
  transactionsSorted = !transactionsSorted;
});
