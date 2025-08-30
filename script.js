document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expense-form');
    const expenseListBody = document.getElementById('expense-list-body');
    const totalExpensesSpan = document.getElementById('total-expenses');

    let expenses = [];
    let totalExpenses = 0;

    // Function to render expenses to the table
    function renderExpenses() {
        expenseListBody.innerHTML = '';
        totalExpenses = 0;

        expenses.forEach((expense, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${expense.description}</td>
                <td>Rs. ${expense.amount.toFixed(2)}</td>
                <td>${expense.category}</td>
                <td><button class="delete-btn" data-index="${index}">Delete</button></td>
            `;
            expenseListBody.appendChild(row);
            totalExpenses += expense.amount;
        });

        totalExpensesSpan.textContent = `Rs. ${totalExpenses.toFixed(2)}`;
    }

    // Handle form submission
    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const description = document.getElementById('description').value;
        const amount = parseFloat(document.getElementById('amount').value);
        const category = document.getElementById('category').value;

        if (description && amount > 0 && category) {
            const newExpense = {
                description,
                amount,
                category
            };
            expenses.push(newExpense);
            
            // Clear the form fields
            expenseForm.reset();
            
            // Re-render the expenses list
            renderExpenses();
        } else {
            alert('Please fill out all fields correctly.');
        }
    });

    // Handle delete button clicks
    expenseListBody.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const index = e.target.getAttribute('data-index');
            expenses.splice(index, 1);
            renderExpenses();
        }
    });

    // Initial render
    renderExpenses();
});
