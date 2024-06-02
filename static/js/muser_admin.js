// Function to populate the table with user and admin data from local storage
function populateUserAdminTable() {
    const tableBody = document.getElementById('userAdminTableBody');
    const storedData = JSON.parse(localStorage.getItem('usersAndAdmins')) || [];

    // Clear existing data
    tableBody.innerHTML = '';

    // Loop through the stored user and admin data and create table rows
    storedData.forEach((userOrAdmin) => {
        const row = document.createElement('tr');

        // Add table cells for each property
        for (const key in userOrAdmin) {
            const cell = document.createElement('td');
            cell.textContent = userOrAdmin[key];
            row.appendChild(cell);
        }

        // Add a cell for actions (e.g., delete)
        const actionCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('deleteButton');
        deleteButton.addEventListener('click', () => deleteUserAdmin(userOrAdmin));
        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);

        // Add the row to the table body
        tableBody.appendChild(row);
    });
}

// Function to delete a user or admin
function deleteUserAdmin(userOrAdmin) {
    const storedData = JSON.parse(localStorage.getItem('usersAndAdmins')) || [];
    
    // Find the index based on a unique identifier, e.g., email
    const index = storedData.findIndex(item => item.email === userOrAdmin.email);

    if (index !== -1) {
        storedData.splice(index, 1);
        localStorage.setItem('usersAndAdmins', JSON.stringify(storedData));
        populateUserAdminTable(); // Update the table after deletion
    }
}


// Function to add a new user or admin
function addUserAdmin(newUserOrAdmin) {
    const storedData = JSON.parse(localStorage.getItem('usersAndAdmins')) || [];
    storedData.push(newUserOrAdmin);
    localStorage.setItem('usersAndAdmins', JSON.stringify(storedData));
    populateUserAdminTable(); // Update the table after addition
}

// Example usage
document.getElementById('addButton').addEventListener('click', () => {
    // Prompt user for new user or admin details (you might use a form for this)
    const newUserOrAdmin = {
        jenisAccount: prompt('Enter jenis account (User/Admin):'),
        fullName: prompt('Enter full name:'),
        email: prompt('Enter email:'),
        noHp: prompt('Enter phone number:'),
        address: prompt('Enter address:'), // Added address property
    };

    addUserAdmin(newUserOrAdmin);
});

// Initial population of the table
populateUserAdminTable();
