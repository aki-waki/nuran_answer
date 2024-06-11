document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('userForm');
    const userTable = document.getElementById('userTable').getElementsByTagName('tbody')[0];
    const clearFormBtn = document.getElementById('clearForm');
    const feedback = document.getElementById('feedback');

    userForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const firstName = event.target.firstName.value;
        const lastName = event.target.lastName.value;
        const age = parseInt(event.target.age.value);

        if (!firstName || !lastName || !age) {
            feedback.textContent = 'Please fill out all fields.';
            return;
        }

        if (age < 18) {
            feedback.textContent = 'User must be 18 years or older.';
            return;
        }

        feedback.textContent = '';
        addUserToTable(firstName, lastName, age);
        saveUserToLocalStorage(firstName, lastName, age);
        userForm.reset();
    });

    clearFormBtn.addEventListener('click', () => {
        userForm.reset();
        feedback.textContent = '';
    });

    loadUsersFromLocalStorage();

    document.querySelectorAll('.sort').forEach(button => {
        button.addEventListener('click', () => {
            const column = button.getAttribute('data-column');
            sortTable(column);
        });
    });

    function addUserToTable(firstName, lastName, age) {
        const row = userTable.insertRow();
        row.insertCell(0).textContent = firstName;
        row.insertCell(1).textContent = lastName;
        row.insertCell(2).textContent = age;
    }

    function saveUserToLocalStorage(firstName, lastName, age) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push({ firstName, lastName, age });
        localStorage.setItem('users', JSON.stringify(users));
    }

    function loadUsersFromLocalStorage() {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.forEach(user => {
            addUserToTable(user.firstName, user.lastName, user.age);
        });
    }

    function sortTable(column) {
        const rows = Array.from(userTable.rows);
        const sortedRows = rows.sort((a, b) => {
            const aText = a.querySelector(`td:nth-child(${columnIndex(column) + 1})`).textContent;
            const bText = b.querySelector(`td:nth-child(${columnIndex(column) + 1})`).textContent;
            return aText.localeCompare(bText, undefined, { numeric: true });
        });

        while (userTable.firstChild) {
            userTable.removeChild(userTable.firstChild);
        }

        sortedRows.forEach(row => {
            userTable.appendChild(row);
        });
    }

    function columnIndex(column) {
        switch (column) {
            case 'firstName':
                return 0;
            case 'lastName':
                return 1;
            case 'age':
                return 2;
            default:
                return 0;
        }
    }
});


