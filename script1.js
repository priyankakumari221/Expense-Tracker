// Load stored data
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let reminders = JSON.parse(localStorage.getItem("reminders")) || [];
let budget = JSON.parse(localStorage.getItem("budget")) || 0;

// Navigation
function showPage(pageId) {
    let pages = document.querySelectorAll(".page");
    pages.forEach(page => page.classList.add("hidden"));
    document.getElementById(pageId).classList.remove("hidden");
}

// Save Budget
document.getElementById("budgetForm").addEventListener("submit", function(e) {
    e.preventDefault();
    budget = parseFloat(document.getElementById("monthlyBudget").value);
    localStorage.setItem("budget", JSON.stringify(budget));
    updateSummary();
    alert("Budget Saved!");
});

// Add Expense
document.getElementById("expenseForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let expense = {
        title: document.getElementById("title").value,
        amount: parseFloat(document.getElementById("amount").value),
        category: document.getElementById("category").value
    };

    expenses.push(expense);
    localStorage.setItem("expenses", JSON.stringify(expenses));

    this.reset();
    displayExpenses();
    updateSummary();
});

// Display Expenses
function displayExpenses() {
    let table = document.getElementById("expenseTable");
    table.innerHTML = "";

    expenses.forEach((expense, index) => {
        let row = `
            <tr>
                <td>${expense.title}</td>
                <td>₹ ${expense.amount}</td>
                <td>${expense.category}</td>
                <td><button onclick="deleteExpense(${index})">Delete</button></td>
            </tr>
        `;
        table.innerHTML += row;
    });
}

// Delete Expense
function deleteExpense(index) {
    expenses.splice(index, 1);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    displayExpenses();
    updateSummary();
}

// Add Reminder
document.getElementById("reminderForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let reminder = {
        title: document.getElementById("reminderTitle").value,
        date: document.getElementById("reminderDate").value
    };

    reminders.push(reminder);
    localStorage.setItem("reminders", JSON.stringify(reminders));

    this.reset();
    displayReminders();
});

// Display Reminders
function displayReminders() {
    let list = document.getElementById("reminderList");
    list.innerHTML = "";

    reminders.forEach((reminder, index) => {
        let li = document.createElement("li");
        li.innerHTML = `
            ${reminder.title} - ${reminder.date}
            <button onclick="deleteReminder(${index})">Delete</button>
        `;
        list.appendChild(li);
    });
}

// Delete Reminder
function deleteReminder(index) {
    reminders.splice(index, 1);
    localStorage.setItem("reminders", JSON.stringify(reminders));
    displayReminders();
}

// Update Budget Summary
function updateSummary() {
    let total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    let remaining = budget - total;
    let percent = budget ? ((total / budget) * 100).toFixed(2) : 0;

    document.getElementById("totalSpent").textContent = total;
    document.getElementById("remainingAmount").textContent = remaining;
    document.getElementById("percentageUsed").textContent = percent;
}

// Initial Load
displayExpenses();
displayReminders();
updateSummary();
