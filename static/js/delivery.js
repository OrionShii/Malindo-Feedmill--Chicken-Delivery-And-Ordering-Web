function calculatePrice() {
    const senderCity = document.getElementById('senderCity').value;
    const senderAddress = document.getElementById('senderAddress').value;
    const destinationCity = document.getElementById('destinationCity').value;
    const destinationAddress = document.getElementById('destinationAddress').value;
    const deliveryDate = document.getElementById('deliveryDate').value;
    const quantity = parseInt(document.getElementById('packageQuantity').value);
    const weight = parseInt(document.getElementById('packageWeight').value);

    const price = quantity * weight * 5000; 

    const formattedPrice = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);

    const resultElement = document.getElementById('priceResult');
    resultElement.innerHTML = `
        <p>Kota Pengirim: ${senderCity}</p>
        <p>Alamat Pengirim: ${senderAddress}</p>
        <p>Kota Tujuan: ${destinationCity}</p>
        <p>Alamat Tujuan: ${destinationAddress}</p>
        <p>Tanggal Pengiriman: ${deliveryDate}</p>
        <p>Total Barang: ${quantity}</p>
        <p>Berat Barang: ${weight} kg</p>
        <p>Harga Paket: ${formattedPrice}</p>
    `;
}
