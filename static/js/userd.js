// Sample delivery status data (can be retrieved from a database or API)
let deliveryStatus = [
    // Sample data
    {
      status: "Completed",
      resi: "12345",
      address: "123 Main St",
      recipient: "John Doe",
      courier: "Express Delivery",
      phone: "123-456-7890",
      purchaseDate: "2023-11-01",
      deliveryDate: "2023-11-07",
    },
    {
        status: "In Transit",
        resi: "12345",
        address: "123 Main St",
        recipient: "Oyy Doe",
        courier: "Express Delivery",
        phone: "123-456-7890",
        purchaseDate: "2023-11-01",
        deliveryDate: "-",
      },
    // Add more status data as needed
  ];
  
  // Function to display delivery status in the table
  function displayDeliveryStatus() {
    const statusBody = document.getElementById('status-body');
    statusBody.innerHTML = '';
  
    deliveryStatus.forEach(status => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${status.status}</td>
        <td>${status.resi}</td>
        <td>${status.address}</td>
        <td>${status.recipient}</td>
        <td>${status.courier}</td>
        <td>${status.phone}</td>
        <td>${status.purchaseDate}</td>
        <td>${status.deliveryDate}</td>
        <td>
          <button class="delete-btn" onclick="deleteStatus('${status.resi}')">Delete</button>
        </td>
      `;
      statusBody.appendChild(row);
    });
  }
  
  // Function to add new delivery status
  function addDeliveryStatus(newStatus) {
    deliveryStatus.push(newStatus);
    displayDeliveryStatus();
  }
  
  // Function to add a new status (triggered by button click)
  function addNewStatus() {
    const newStatus = {
      status: "Pending",
      resi: "67890",
      address: "456 Elm St",
      recipient: "Jane Smith",
      courier: "Express Delivery",
      phone: "456-789-0123",
      purchaseDate: "2023-11-10",
      deliveryDate: "2023-11-15"
    };
    addDeliveryStatus(newStatus);
  }
  
  // Function to delete a status
  function deleteStatus(resi) {
    deliveryStatus = deliveryStatus.filter(status => status.resi !== resi);
    displayDeliveryStatus();
  }
  
  // Display delivery status when the page loads
  displayDeliveryStatus();
  