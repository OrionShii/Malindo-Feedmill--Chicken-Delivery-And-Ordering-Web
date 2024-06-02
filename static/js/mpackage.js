document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('addButton');
    const tableBody = document.querySelector('tbody');
    let packageData = JSON.parse(localStorage.getItem('packageData')) || [];

    function savePackageData() {
        localStorage.setItem('packageData', JSON.stringify(packageData));
    }

    addButton.addEventListener('click', function () {
        addRow();
    });

    tableBody.addEventListener('click', function (event) {
        const target = event.target;

        // Check if the clicked element is a delete button
        if (target.classList.contains('deleteButton')) {
            deleteRow(target);
        }
    });

    function addRow() {
        const packageName = prompt("Enter Package Name:");
        const customerName = prompt("Enter Customer Name:");
        const customerAddress = prompt("Enter Customer Address:");
        const kotaTujuan = prompt("Enter Kota Tujuan:");
        const totalYangDibeli = prompt("Enter Total Yang Dibeli:");
        const totalHarga = prompt("Enter Total Harga:");
        const purchaseDate = new Date().toLocaleDateString();
        const status = prompt("Enter Status (e.g., Waiting for Payment):");

        if (packageName && customerName && customerAddress && kotaTujuan && totalYangDibeli && totalHarga && status) {
            const newPackage = {
                packageName,
                customerName,
                customerAddress,
                kotaTujuan,
                totalYangDibeli,
                totalHarga,
                purchaseDate,
                status
            };

            // Update the UI
            const newRow = createRow(newPackage);
            tableBody.appendChild(newRow);

            // Update the data
            packageData.push(newPackage);
            savePackageData();
        } else {
            alert("Please provide all details.");
        }
    }

    function deleteRow(button) {
        const row = button.closest('tr');
        const index = Array.from(tableBody.children).indexOf(row);

        // Remove the row from the UI
        tableBody.removeChild(row);

        // Remove the package data
        packageData.splice(index, 1);

        // Save the updated data
        savePackageData();
    }

    function createRow(package) {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${package.packageName}</td>
            <td>${package.customerName}</td>
            <td>${package.customerAddress}</td>
            <td>${package.kotaTujuan}</td>
            <td>${package.totalYangDibeli}</td>
            <td>${package.totalHarga}</td>
            <td>${package.purchaseDate}</td>
            <td>
                <select class="statusDropdown" onchange="changeStatus(this.value)">
                    <option value="Waiting for Payment" ${package.status === 'Waiting for Payment' ? 'selected' : ''}>Waiting for Payment</option>
                    <option value="Payment Completed" ${package.status === 'Payment Completed' ? 'selected' : ''}>Payment Completed</option>
                    <option value="Waiting for Shipment" ${package.status === 'Waiting for Shipment' ? 'selected' : ''}>Waiting for Shipment</option>
                </select>
            </td>
            <td><button class="deleteButton" onclick="deleteRow(this)">Delete</button></td>
        `;
        return newRow;
    }
    
    
    function initializeTable() {
        tableBody.innerHTML = '';
        packageData.forEach(pkg => {
            const newRow = createRow(pkg);
            tableBody.appendChild(newRow);
        });
    }

    initializeTable();
});
