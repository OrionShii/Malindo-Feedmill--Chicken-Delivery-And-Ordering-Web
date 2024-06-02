// Sample delivery status data (can be retrieved from a database or API)
let deliveryStatuses = [
    { id: 1, idPaket: 101, noResi: 'R12345', alamatPenerima: '123 Main St', namaPenerima: 'Alice', tanggalPembelian: '2023-11-01', status: 'In Transit' },
    { id: 2, idPaket: 102, noResi: 'R67890', alamatPenerima: '456 Elm St', namaPenerima: 'Bob', tanggalPembelian: '2023-11-05', status: 'Pending' }
    // Add more delivery status data as needed
  ];
  
  // Function to display delivery statuses in the table
  function displayDeliveryStatuses() {
    const tbody = document.querySelector('.status-table tbody');
  
    // Clear existing data
    tbody.innerHTML = '';
  
    // Populate the table with delivery status data
    deliveryStatuses.forEach(status => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${status.idPaket}</td>
        <td>${status.noResi}</td>
        <td>${status.alamatPenerima}</td>
        <td>${status.namaPenerima}</td>
        <td>${status.tanggalPembelian}</td>
        <td>${status.status}</td>
        <td>
          <button class="delete-btn" data-id="${status.id}">Delete</button>
        </td>
      `;
      tbody.appendChild(row);
    });
  }
  
  // Function to add a new delivery status
  function addDeliveryStatus(newStatus) {
    deliveryStatuses.push(newStatus);
    displayDeliveryStatuses();
  }
  
  // Function to delete a delivery status
  function deleteDeliveryStatus(statusId) {
    deliveryStatuses = deliveryStatuses.filter(status => status.id !== statusId);
    displayDeliveryStatuses();
  }
  
  // Add event listener for the "Add Status" button
  const addBtn = document.querySelector('.add-btn');
  addBtn.addEventListener('click', () => {
    const newStatus = {
      id: deliveryStatuses.length + 1, // Generate unique ID
      idPaket: 103, // Example value, update with actual data
      noResi: 'R54321', // Example value, update with actual data
      alamatPenerima: '789 Oak St', // Example value, update with actual data
      namaPenerima: 'Charlie', // Example value, update with actual data
      tanggalPembelian: '2023-11-10', // Example value, update with actual data
      status: 'Complete' // Example value, update with actual data
    };
    addDeliveryStatus(newStatus);
  });
  
  // Add event listener for the "Delete" button (event delegation)
  document.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-btn')) {
      const statusId = parseInt(event.target.dataset.id);
      deleteDeliveryStatus(statusId);
    }
  });
  
  // Display delivery statuses when the page loads
  displayDeliveryStatuses();
  