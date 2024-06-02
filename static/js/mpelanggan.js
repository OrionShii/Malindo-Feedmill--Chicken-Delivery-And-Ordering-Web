// Sample pelanggan data (dapat diambil dari database atau API)
let pelanggan = [
    { name: "Pelanggan 1", email: "pelanggan1@example.com", phone: "123-456-7890", address: "123 Main St", user: "User1" },
    { name: "Pelanggan 2", email: "pelanggan2@example.com", phone: "456-789-0123", address: "456 Elm St", user: "User2" }
    // Tambahkan data pelanggan lain jika diperlukan
  ];
  
  // Function untuk menampilkan pelanggan dalam tabel
  function displayPelanggan() {
    const tbody = document.querySelector('.user-table tbody');
  
    // Menghapus data yang ada sebelumnya
    tbody.innerHTML = '';
  
    // Mengisi tabel dengan data pelanggan
    pelanggan.forEach(user => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.phone}</td>
        <td>${user.address}</td>
        <td>${user.user}</td>
        <td><button class="delete-btn">Delete</button></td>
      `;
      tbody.appendChild(row);
    });
  }
  
  // Menambahkan event listener untuk tombol "Add Pelanggan"
  const addBtn = document.querySelector('.add-btn');
  addBtn.addEventListener('click', () => {
    const newPelanggan = {
      name: "New Pelanggan",
      email: "newpelanggan@example.com",
      phone: "987-654-3210",
      address: "789 Oak St",
      user: "New User"
    };
  
    // Menambah pelanggan baru ke dalam array pelanggan
    pelanggan.push(newPelanggan);
  
    // Menampilkan daftar pelanggan yang sudah diperbarui
    displayPelanggan();
  });
  
  // Menambahkan event listener untuk tombol "Delete" (delegasi event)
  document.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-btn')) {
      // Mendapatkan indeks pelanggan yang akan dihapus
      const row = event.target.closest('tr');
      const index = Array.from(row.parentNode.children).indexOf(row);
  
      // Menghapus pelanggan dari array pelanggan
      pelanggan.splice(index, 1);
  
      // Menampilkan daftar pelanggan yang sudah diperbarui
      displayPelanggan();
    }
  });
  
  // Menampilkan pelanggan saat halaman dimuat
  displayPelanggan();
  