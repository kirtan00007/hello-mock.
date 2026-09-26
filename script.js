var budget = 0;
var expenses = [];
var savedBudget = localStorage.getItem("budget");
var savedExpenses = localStorage.getItem("expenses");
if (savedBudget) {
  budget = Number(savedBudget);
}
if (savedExpenses) {
  expenses = JSON.parse(savedExpenses);
}

var budgetForm = document.getElementById("budgetForm");
var budgetInput = document.getElementById("budgetInput");

var expenseForm = document.getElementById("expenseForm");
var expenseTitle = document.getElementById("expenseTitle");
var expenseAmount = document.getElementById("expenseAmount");

var resetBtn = document.getElementById("resetBtn");

var totalBudgetEl = document.getElementById("totalBudget");
var totalExpensesEl = document.getElementById("totalExpenses");
var budgetLeftEl = document.getElementById("budgetLeft");

var expenseTable = document.getElementById("expenseTable");


budgetForm.addEventListener("submit", function (e) {
  e.preventDefault();

  var value = Number(budgetInput.value);

  if (!value || value <= 0) {
    alert("Please enter a valid budget amount");
    return;
  }

  budget = budget + value;
  localStorage.setItem("budget", budget);

  budgetInput.value = "";

  updateSummary();
});


expenseForm.addEventListener("submit", function (e) {
  e.preventDefault();

  var title = expenseTitle.value;
  var amount = Number(expenseAmount.value);

  if (!title || !amount || amount <= 0) {
    alert("Please enter valid expense details");
    return;
  }

  var newExpense = {
    id: Date.now(),
    title: title,
    amount: amount,
  };

  expenses.push(newExpense);
  localStorage.setItem("expenses", JSON.stringify(expenses));

  expenseTitle.value = "";
  expenseAmount.value = "";

  updateSummary();
  showExpenses();
});

function removeExpense(id) {
  var newExpenses = [];

  for (var i = 0; i < expenses.length; i++) {
    if (expenses[i].id !== id) {
      newExpenses.push(expenses[i]);
    }
  }

  expenses = newExpenses;
  localStorage.setItem("expenses", JSON.stringify(expenses));

  updateSummary();
  showExpenses();
}


resetBtn.addEventListener("click", function () {
  budget = 0;
  expenses = [];

  localStorage.removeItem("budget");
  localStorage.removeItem("expenses");

  updateSummary();
  showExpenses();
});

 
function updateSummary() {
  var total = 0;

  for (var i = 0; i < expenses.length; i++) {
    total = total + expenses[i].amount;
  }

  totalBudgetEl.innerHTML = budget;
  totalExpensesEl.innerHTML = total;
  budgetLeftEl.innerHTML = budget - total;
}

function showExpenses() {
  expenseTable.innerHTML = `
    <tr>
      <th>Expense Name</th>
      <th>Amount</th>
      <th>Action</th>
    </tr>
  `;

  for (var i = 0; i < expenses.length; i++) {
    var row = document.createElement("tr");

    row.innerHTML = `
      <td>${expenses[i].title}</td>
      <td>${expenses[i].amount}</td>
      <td><button onclick="removeExpense(${expenses[i].id})">Remove</button></td>
    `;

    expenseTable.appendChild(row);
  }
}
 updateSummary();
 showExpenses();