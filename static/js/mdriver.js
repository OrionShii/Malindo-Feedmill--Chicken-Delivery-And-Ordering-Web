document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('addButton');
    const tableBody = document.querySelector('tbody');
    let driverData = JSON.parse(localStorage.getItem('driverData')) || [];

    function saveDriverData() {
        localStorage.setItem('driverData', JSON.stringify(driverData));
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
        const driverName = prompt("Enter Driver Name:");
        const driverID = prompt("Enter Driver ID:");
        const carPlat = prompt("Enter Driver Car Plat:");
        const carBrand = prompt("Enter Driver Car Brand:");
        const capacity = prompt("Enter Driver Capacity:");

        if (driverName && driverID && carPlat && carBrand && capacity) {
            const newDriver = {
                driverName,
                driverID,
                carPlat,
                carBrand,
                capacity
            };

            // Update the UI
            const newRow = createRow(newDriver);
            tableBody.appendChild(newRow);

            // Update the data
            driverData.push(newDriver);
            saveDriverData();
        } else {
            alert("Please provide all details.");
        }
    }

    function deleteRow(button) {
        const row = button.closest('tr');
        const index = Array.from(tableBody.children).indexOf(row);

        // Remove the row from the UI
        tableBody.removeChild(row);

        // Remove the driver data
        driverData.splice(index, 1);

        // Save the updated data
        saveDriverData();
    }

    function createRow(driver) {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${driver.driverName}</td>
            <td>${driver.driverID}</td>
            <td>${driver.carPlat}</td>
            <td>${driver.carBrand}</td>
            <td>${driver.capacity}</td>
            <td><button class="deleteButton">Delete</button></td>
        `;
        return newRow;
    }

    function initializeTable() {
        tableBody.innerHTML = '';
        driverData.forEach(driver => {
            const newRow = createRow(driver);
            tableBody.appendChild(newRow);
        });
    }

    initializeTable();
});
