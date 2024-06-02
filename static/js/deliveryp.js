function calculatePrice() {

    var recipientName = document.getElementById('recipientName').value;
    var recipientAddress = document.getElementById('recipientAddress').value;
    var destinationCity = document.getElementById('destinationCity').value;
    var deliveryDate = document.getElementById('deliveryDate').value;
    var chickenWeight = parseFloat(document.getElementById('chickenWeight').value);
  

    if (!recipientName || !recipientAddress || !destinationCity || !deliveryDate || isNaN(chickenWeight) || chickenWeight <= 0) {
      alert('Please fill in all the fields with valid values.');
      return;
    }
  
    var basePricePerKilo = 30000; 
    var additionalFee = 5000; 
    var totalPrice = chickenWeight * basePricePerKilo + additionalFee;
  

    var formattedPrice = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalPrice);
  

    var priceResultElement = document.getElementById('priceResult');
    priceResultElement.innerHTML = `
      <p>Dear ${recipientName},</p>
      <p>Your chicken delivery to ${destinationCity} on ${deliveryDate}:</p>
      <p>Weight: ${chickenWeight} kg</p>
      <p>Total Price: ${formattedPrice}</p>
    `;
}
