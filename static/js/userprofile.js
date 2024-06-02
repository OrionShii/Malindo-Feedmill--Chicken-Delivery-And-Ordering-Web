// profile.js
function displayImage(input) {
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        document.querySelector('.profile-picture').src = e.target.result;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
  
  function enableEdit() {
    const inputs = document.querySelectorAll('#profileForm input');
    inputs.forEach(input => {
      input.removeAttribute('disabled');
    });
  
    document.querySelector('.edit-btn').style.display = 'none';
    document.querySelector('.save-btn').style.display = 'inline-block';
  }
  
  function saveChanges() {
    const inputs = document.querySelectorAll('#profileForm input');
    inputs.forEach(input => {
      input.setAttribute('disabled', 'true');
    });
  
    document.querySelector('.edit-btn').style.display = 'inline-block';
    document.querySelector('.save-btn').style.display = 'none';
  }
  
  // Get the user type (admin/user) from your authentication system
  const userType1 = 'User'; // Change this based on the logged-in user type
  
  // Update the welcome message based on the user type
  document.getElementById('userType').innerText = userType1;
  
  // profile.js (lanjutan)
  
  // Get all elements with class "has-submenu"
  const submenuToggles = document.querySelectorAll('.has-submenu');
  
  // Loop through each "has-submenu" element
  submenuToggles.forEach(toggle => {
    // Add click event listener to each "has-submenu" element
    toggle.addEventListener('click', function() {
      // Toggle the "active" class to display/hide the submenu
      this.parentElement.querySelector('.submenu').classList.toggle('active');
    });
  });
  
  // Close the submenu when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.classList.contains('has-submenu')) {
      submenuToggles.forEach(toggle => {
        toggle.parentElement.querySelector('.submenu').classList.remove('active');
      });
    }
  });
  
  document.querySelectorAll('.dropdown-menu a').forEach(item => {
    item.addEventListener('click', event => {
      // Lakukan sesuatu saat link dropdown di-klik
      alert(`Anda memilih: ${event.target.textContent}`);
    });
  });
  