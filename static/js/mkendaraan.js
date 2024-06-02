// Sample vehicle data (can be retrieved from a database or API)
const vehicles = [
    { id: "V001", noPlat: "B 1234 ABC", brand: "Toyota", capacity: "Besar" },
    { id: "V002", noPlat: "B 5678 XYZ", brand: "Honda", capacity: "Sedang" }
    // Add more vehicle data as needed
  ];
  
  // Function to display vehicles in the table
  function displayVehicles() {
    const tbody = document.querySelector('.vehicle-table tbody');
  
    // Clear existing data
    tbody.innerHTML = '';
  
    // Populate the table with vehicle data
    vehicles.forEach(vehicle => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${vehicle.id}</td>
        <td>${vehicle.noPlat}</td>
        <td>${vehicle.brand}</td>
        <td>${vehicle.capacity}</td>
        <td>
          <button class="delete-btn">Delete</button>
        </td>
      `;
      tbody.appendChild(row);
    });
  }
  
  // Function to add a new vehicle
  function addVehicle() {
    // Implement logic to add a new vehicle here or redirect to an add vehicle page
    alert('Implement logic to add a new vehicle');
  }
  
  // Add event listener for the "Add Vehicle" button
  const addBtn = document.querySelector('.add-btn');
  addBtn.addEventListener('click', addVehicle);
  
  // Add event listener for the "Delete" button (event delegation)
  document.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-btn')) {
      // Implement logic to delete vehicle here
      const row = event.target.closest('tr');
      row.remove();
      // Add logic to delete vehicle from the database or API
    }
  });
  
  // Display vehicles when the page loads
  displayVehicles();
  