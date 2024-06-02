const initialData = [
    {
        trackingNumber: 'JNR25HS246',
        senderName: 'PT. Malindo Feedmill',
        recipientAddress: 'Jalan Gatot Subroto No 12, Blok C12',
        destinationCity: 'Jakarta Selatan',
        deliveryDriver: 'Udin',
        driverVehicle: 'BMW',
        driverPhoneNumber: '087654321',
        deliveryDate: '2023-12-01 T 10:00:00',
        estimatedArrival: '2023-12-05 T 12:00:00',
        deliveryStatus: 'Pending Shipment',
    }
];

localStorage.setItem('deliveryInfo', JSON.stringify(initialData));

function displayDeliveryTable() {
    const tableBody = document.getElementById('tableBodyId');
    const storedData = JSON.parse(localStorage.getItem('deliveryInfo')) || [];

    tableBody.innerHTML = '';

    storedData.forEach((delivery) => {
        const row = document.createElement('tr');

        for (const property in delivery) {
            const cell = document.createElement('td');

            if (property === 'deliveryStatus') {
                const trackButton = document.createElement('button');
                trackButton.textContent = 'Track My Package';
                trackButton.classList.add('trackButton');
                trackButton.addEventListener('click', () => trackDeliveryStatus(delivery));
                cell.appendChild(trackButton);
            } else {
                cell.textContent = delivery[property];
            }

            row.appendChild(cell);
        }

        tableBody.appendChild(row);
    });
}

function trackDeliveryStatus(delivery) {
    const statusHistory = generateRandomStatusHistory();

    alert(`Tracking Delivery:\n\nCurrent Status: ${delivery.deliveryStatus}\n\nStatus History:\n\n${formatStatusHistory(statusHistory)}`);
}

function formatStatusHistory(history) {
    return history.map((entry, index) => `${index + 1}. Status: ${entry.status}, Description: ${entry.description}`).join('\n');
}

function generateRandomStatusHistory() {
    const statusHistory = [];

    const randomScenario = Math.floor(Math.random() * 3);

    switch (randomScenario) {
        case 0:
            statusHistory.push({
                status: 'Pending Shipment',
                description: 'Preparing the package for shipment.',
            });
            statusHistory.push({
                status: 'In Transit',
                description: 'Package is on its way to the destination.',
            });
            statusHistory.push({
                status: 'Delivered',
                description: 'Package has been successfully delivered and accepted.',
            });
            break;
        case 1:
            statusHistory.push({
                status: 'Pending Shipment',
                description: 'Preparing the package for shipment.',
            });
            statusHistory.push({
                status: 'In Transit',
                description: 'Package is on its way to the destination.',
            });
            break;
        case 2:
            statusHistory.push({
                status: 'Pending Shipment',
                description: 'Preparing the package for shipment.',
            });
            break;
        default:
            break;
    }

    return statusHistory;
}

document.getElementById('addButton').style.display = 'none';

displayDeliveryTable();
