document.addEventListener("DOMContentLoaded", function () {
    const profileForm = document.getElementById("profileForm");
    const currentName = document.getElementById("currentName");
    const currentEmail = document.getElementById("currentEmail");
    const currentPhone = document.getElementById("currentPhone");
    const profileImage = document.querySelector(".profile-image img");
    const profileImageInput = document.getElementById("profileImageInput");

    profileForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const fullName = document.getElementById("fullName").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;

        currentName.textContent = fullName;
        currentEmail.textContent = email;
        currentPhone.textContent = phone;

        profileForm.reset();
    });
    document.addEventListener("DOMContentLoaded", function () {
        const profileImageInput = document.getElementById("profileImageInput");
    
        profileImageInput.addEventListener("change", function () {
            const fileName = this.files[0]?.name || "Change Photo";
            const changePhotoText = document.querySelector(".change-photo-text");
            changePhotoText.textContent = fileName;
        });
    });
    
    profileImageInput.addEventListener("change", function () {
        const file = profileImageInput.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = function (e) {
                profileImage.src = e.target.result;
            };

            reader.readAsDataURL(file);
        }
    });
});
