
let loggedInUser = JSON.parse(
    localStorage.getItem("loggedInUser")
);

if (!loggedInUser) {
    window.location.href = "index.html";
}

let storageKey = "transactions_" + loggedInUser.email;

const expenseForm = document.getElementById("expenseForm");

const amount = document.getElementById("amount");
const description = document.getElementById("description");
const category = document.getElementById("category");
const date = document.getElementById("date");
const type = document.getElementById("type");

const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");

const tableBody = document.getElementById("tableBody");

const search = document.getElementById("search");
const filter = document.getElementById("filter");

let transactions =
    JSON.parse(localStorage.getItem(storageKey)) || [];

let editIndex = -1;

let doughnutChart;
let pieChart;

showData();
updateSummary();
updateCharts();

expenseForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let transaction = {
        amount: Number(amount.value),
        description: description.value,
        category: category.value,
        date: date.value,
        type: type.value
    };

    if (editIndex === -1) {
        transactions.push(transaction);
    } else {
        transactions[editIndex] = transaction;
        editIndex = -1;
    }

    localStorage.setItem(
        storageKey,
        JSON.stringify(transactions)
    );

    showData();
    updateSummary();
    updateCharts();
    expenseForm.reset();
});

function showData() {
    tableBody.innerHTML = "";

    transactions.forEach(function (item, index) {
        tableBody.innerHTML += `
        <tr>
            <td>₹${item.amount}</td>
            <td>${item.description}</td>
            <td>${item.category}</td>
            <td>${item.date}</td>
            <td>${item.type}</td>
            <td>
                <button class="btn btn-warning btn-sm"
                    onclick="editData(${index})">Edit</button>

                <button class="btn btn-danger btn-sm"
                    onclick="deleteData(${index})">Delete</button>
            </td>
        </tr>
        `;
    });
}

function updateSummary() {
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(function (item) {
        if (item.type === "income") {
            totalIncome += item.amount;
        } else {
            totalExpense += item.amount;
        }
    });
    if (totalExpense >= totalIncome){
        balance.textContent = "₹0";
    }else{
        balance.textContent = "₹" + (totalIncome - totalExpense);
    }

    // balance.textContent = "₹" + (totalIncome - totalExpense);
    income.textContent = "₹" + totalIncome;
    expense.textContent = "₹" + totalExpense;
}

function deleteData(index) {
    transactions.splice(index, 1);

    localStorage.setItem(
        storageKey,
        JSON.stringify(transactions)
    );

    showData();
    updateSummary();
    updateCharts();
}

function editData(index) {
    editIndex = index;

    amount.value = transactions[index].amount;
    description.value = transactions[index].description;
    category.value = transactions[index].category;
    date.value = transactions[index].date;
    type.value = transactions[index].type;
}

search.addEventListener("input", function () {
    let value = search.value.toLowerCase();

    tableBody.innerHTML = "";

    transactions.forEach(function (item, index) {
        if (item.description.toLowerCase().includes(value)) {
            tableBody.innerHTML += `
            <tr>
                <td>₹${item.amount}</td>
                <td>${item.description}</td>
                <td>${item.category}</td>
                <td>${item.date}</td>
                <td>${item.type}</td>
                <td>
                    <button class="btn btn-warning btn-sm"
                        onclick="editData(${index})">Edit</button>

                    <button class="btn btn-danger btn-sm"
                        onclick="deleteData(${index})">Delete</button>
                </td>
            </tr>
            `;
        }
    });
});

filter.addEventListener("change", function () {
    tableBody.innerHTML = "";

    transactions.forEach(function (item, index) {
        if (
            filter.value === "All" ||
            item.type === filter.value
        ) {
            tableBody.innerHTML += `
            <tr>
                <td>₹${item.amount}</td>
                <td>${item.description}</td>
                <td>${item.category}</td>
                <td>${item.date}</td>
                <td>${item.type}</td>
                <td>
                    <button class="btn btn-warning btn-sm"
                        onclick="editData(${index})">Edit</button>

                    <button class="btn btn-danger btn-sm"
                        onclick="deleteData(${index})">Delete</button>
                </td>
            </tr>
            `;
        }
    });
});

let welcomeUser = document.getElementById("welcomeUser");

if (loggedInUser && welcomeUser) {
    welcomeUser.textContent = "Welcome, " + loggedInUser.name;
}

function updateCharts() {

let totalIncome = 0;
let totalExpense = 0;

transactions.forEach(function (item) {
    if (item.type === "income") {
        totalIncome += Number(item.amount);
    } else if (item.type === "expense") {
        totalExpense += Number(item.amount);
    }
});

const doughnutCanvas = document.getElementById("doughnutChart");

if (doughnutCanvas) {

    if (doughnutChart) {
        doughnutChart.destroy();
    }

    doughnutChart = new Chart(doughnutCanvas, {
        type: "doughnut",

        data: {
            labels: ["Income", "Expense"],

            datasets: [{
                data: [totalIncome, totalExpense],
                backgroundColor: ["#28a", "#dc3545"],
                borderWidth: 2
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: true
        }
    });
}

// expense by category ahnn calculate cheyunnath
let categories = {};

transactions.forEach(function (item) {

    if (item.type === "expense") {
        if (categories[item.category]) {
            categories[item.category] += Number(item.amount);
        } else {
            categories[item.category] = Number(item.amount);
        }
    }
});
console.log("Pie chart categories:", categories);
console.log("All transactions:", transactions);
const pieCanvas = document.getElementById("pieChart");

if (pieCanvas) {

    if (pieChart) {
        pieChart.destroy();
    }

    pieChart = new Chart(pieCanvas, {
        type: "pie",

        data: {
            labels: Object.keys(categories),

            datasets: [{
                data: Object.values(categories),

                backgroundColor: [
                    "#007bff",
                    "#ffc107",
                    "#28a884",
                    "#dc3545",
                    "#6f42c1"
                ],

                borderWidth: 2
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: true
        }
    });
}
}

let logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
        localStorage.removeItem("loggedInUser");

        alert("Logout Successful");

        window.location.href = "home.html";
    });
}

