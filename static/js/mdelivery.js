function populateDeliveryTable() {
    const tableBody = document.getElementById('deliveryTableBody');
    const storedData = JSON.parse(localStorage.getItem('deliveryData')) || [];

    tableBody.innerHTML = '';

    storedData.forEach((delivery) => {
        const row = document.createElement('tr');


        for (const key in delivery) {
            const cell = document.createElement('td');

            if (key === 'statusPengiriman') {

                const updateStatusButton = document.createElement('button');
                updateStatusButton.textContent = 'Update Status';
                updateStatusButton.classList.add('updateStatusButton');
                updateStatusButton.addEventListener('click', () => updateStatus(delivery.noResi));
                cell.appendChild(updateStatusButton);
            } else {

                cell.textContent = delivery[key];
            }


            row.appendChild(cell);
        }


        const actionCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('deleteButton');
        deleteButton.addEventListener('click', () => deleteDelivery(delivery));
        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);


        tableBody.appendChild(row);
    });
}

function updateStatus(noResi) {
    const statusOptions = ['Waiting for Shipment', 'Package in Delivery', 'Package Accepted'];


    const storedData = JSON.parse(localStorage.getItem('deliveryData')) || [];
    const delivery = storedData.find(item => item.noResi === noResi);

    if (delivery) {

        const currentStatus = delivery.statusPengiriman;

        const newStatusInput = prompt(`Enter New Status (${statusOptions.join(', ')}):`);

        if (statusOptions.some(option => option.toLowerCase() === newStatusInput.toLowerCase())) {

            delivery.statusHistory = delivery.statusHistory || [];
            delivery.statusHistory.push({
                timestamp: new Date().toLocaleString(),
                status: newStatusInput
            });

            delivery.statusPengiriman = newStatusInput;

            const statusHistoryText = delivery.statusHistory.map(entry => `${entry.timestamp}: ${entry.status}`).reverse().join('\n');
            alert(`Status History for Delivery ${noResi}:\n${statusHistoryText}`);

            const realStatusElement = document.querySelector(`[data-noresi="${noResi}"] .real-status`);
            realStatusElement.textContent = `Real Status: ${newStatusInput}`;

            localStorage.setItem('deliveryData', JSON.stringify(storedData));
        } else {
            alert('Invalid status. Please enter a valid status.');
        }
    } else {
        alert('Error: Delivery not found.');
    }
}

function deleteDelivery(delivery) {
    const storedData = JSON.parse(localStorage.getItem('deliveryData')) || [];

    const index = storedData.findIndex(item => item.noResi === delivery.noResi);

    if (index !== -1) {
        storedData.splice(index, 1);
        localStorage.setItem('deliveryData', JSON.stringify(storedData));
        populateDeliveryTable();
    }
}

function addDelivery(newDelivery) {
    const storedData = JSON.parse(localStorage.getItem('deliveryData')) || [];

    newDelivery.tanggalPengiriman = new Date().toLocaleDateString();

    storedData.push(newDelivery);
    localStorage.setItem('deliveryData', JSON.stringify(storedData));
    populateDeliveryTable();
}

document.getElementById('addButton').addEventListener('click', () => {
    const newDelivery = {
        noResi: prompt('Enter No Resi:'),
        namaPenerima: prompt('Enter Nama Penerima:'),
        alamatPenerima: prompt('Enter Alamat Penerima:'),
        hoHpPenerima: prompt('Enter Ho HP Penerima:'),
        kotaTujuan: prompt('Enter Kota Tujuan:'),
        driver: prompt('Enter Driver:'),
        kendaraanDriver: prompt('Enter Kendaraan Driver:'),
        hoHpDriver: prompt('Enter Ho HP Driver:'),
        tanggalPengiriman: new Date().toLocaleDateString(),
        statusPengiriman: 'Waiting for Shipment',
    };

    addDelivery(newDelivery);
});

populateDeliveryTable();
