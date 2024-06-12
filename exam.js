document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('userForm');
    const userTable = document.getElementById('userTable').getElementsByTagName('tbody')[0];

// Handler for the form submission event
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Preventing page reloading
        
// Getting the values of the form fields
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const age = parseInt(document.getElementById('age').value);

// Check that all fields are filled in and the age is 18 years or older
        if (firstName && lastName && age >= 18) {
            const userData = { firstName, lastName, age };
            addUserToTable(userData); // Adding the user to the table
            saveUserData(userData); // Saving user data in local storage
            form.reset(); // Resetting the form
        } else {
            alert('Please fill all fields and ensure age is 18 or older.'); // Error Message
        }
    });

// Function for adding a user to a table
    function addUserToTable(userData) {
        const newRow = userTable.insertRow(); // Creating a new row in the table

        const firstNameCell = newRow.insertCell(0);
        const lastNameCell = newRow.insertCell(1);
        const ageCell = newRow.insertCell(2);

// Filling in the table cells with user data
        firstNameCell.textContent = userData.firstName;
        lastNameCell.textContent = userData.lastName;
        ageCell.textContent = userData.age;
    }

// Function for saving user data in local storage
    function saveUserData(userData) {
        let users = JSON.parse(localStorage.getItem('users')) || []; // Getting the current data from the local storage
        users.push(userData); // Adding new data
        localStorage.setItem('users', JSON.stringify(users)); // Saving the updated data in the local storage
    }

// Function for downloading data from local storage
    function loadUserData() {
        const users = JSON.parse(localStorage.getItem('users')) || []; // Getting data from local storage
        users.forEach(addUserToTable); // Adding each entry to the table
    }

    loadUserData(); // Loading data when the page loads
});
