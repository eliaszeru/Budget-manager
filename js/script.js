let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// Add a new transaction
document.getElementById('transaction-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;
    const type = document.getElementById('type').value;

    const transaction = {
        id: Date.now(),
        description,
        amount,
        category,
        type
    };
    
    transactions.push(transaction);
    saveTransactions();
    updateDisplay();
    document.getElementById('transaction-form').reset();
});

// Save transactions to local storage
function saveTransactions() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Calculate and display totals
function calculateTotals() {
    let totalIncome = 0;
    let totalExpenses = 0;

    transactions.forEach(transaction => {
        if (transaction.type === 'income') {
            totalIncome += transaction.amount;
        } else if (transaction.type === 'expense') {
            totalExpenses += transaction.amount;
        }
    });

    document.getElementById('total-income').textContent = $${totalIncome.toFixed(2)};
    document.getElementById('total-expenses').textContent = $${totalExpenses.toFixed(2)};
    document.getElementById('balance').textContent = $${(totalIncome - totalExpenses).toFixed(2)};
}

// Display all transactions
function displayTransactions() {
    const transactionList = document.getElementById('transaction-list');
    transactionList.innerHTML = '';

    transactions.forEach(transaction => {
        const item = document.createElement('div');
        item.className = 'transaction';
        item.innerHTML = `
            <span>${transaction.description} - $${transaction.amount.toFixed(2)} (${transaction.category})</span>
            <button onclick="deleteTransaction(${transaction.id})">Delete</button>
        `;
        transactionList.appendChild(item);
    });
}

// Delete a transaction
function deleteTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    saveTransactions();
    updateDisplay();
}

// Update the entire display
function updateDisplay() {
    calculateTotals();
    displayTransactions();
}

// Initial display update
updateDisplay();