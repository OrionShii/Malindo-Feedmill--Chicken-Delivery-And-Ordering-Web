// Sample user data (can be retrieved from a database or API)
const users = [
    { name: "Orion", email: "Sonbit1234@gmail.com", phone: "0812946728936", address: "Jln. Kemayoran", level: "Admin" },
    { name: "Amar", email: "amar234@gmail.com", phone: "06106012370", address: "Samping Lawson", level: "Admin" }
    // Add more user data as needed
  ];
  
  // Function to display users in the table
  function displayUsers() {
    const tbody = document.querySelector('.user-table tbody');
  
    // Clear existing data
    tbody.innerHTML = '';
  
    // Populate the table with user data
    users.forEach(user => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.phone}</td>
        <td>${user.address}</td>
        <td>${user.level}</td>
        <td>
          <button class="delete-btn">Delete</button>
        </td>
      `;
      tbody.appendChild(row);
    });
  }
  
  // Add event listener for the "Add User" button
  const addBtn = document.querySelector('.add-btn');
  addBtn.addEventListener('click', () => {
    const newUser = {
      name: "Asrul",
      email: "AmaySen22@gmail.com",
      phone: "088241567",
      address: "Tangerang",
      level: "User"
    };
  
    // Add the new user to the users array
    users.push(newUser);
  
    // Display the updated list of users
    displayUsers();
  });
  
  // Add event listener for the "Delete" button (event delegation)
  document.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-btn')) {
      // Get the index of the user to delete
      const row = event.target.closest('tr');
      const index = Array.from(row.parentNode.children).indexOf(row);
  
      // Remove the user from the users array
      users.splice(index, 1);
  
      // Display the updated list of users
      displayUsers();
    }
  });
  
  // Display users when the page loads
  displayUsers();
  