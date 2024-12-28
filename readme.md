# Malindo Feedmill Web Application

## 📄 Description

The **Malindo Feedmill Web Application** is a web-based platform designed to streamline the management of deliveries and logistics for products from Malindo Feedmill. This application enables users to handle various functions, such as managing delivery status, user data, driver information, and more.

The application is built using [Golang](https://golang.org/) with the [Gin](https://gin-gonic.com/) framework. It utilizes SQLite for database management, making it easy to handle data locally.

![Screenshot 2024-06-08 190816](https://github.com/user-attachments/assets/834a9d7b-29aa-488b-b973-4241d1fef074)
![Screenshot 2024-06-08 190832](https://github.com/user-attachments/assets/09e711ae-af70-4934-b26a-6557e5a09354)
![Screenshot 2024-06-08 190847](https://github.com/user-attachments/assets/9ac51407-3487-4b3a-95d4-7748da080d2b)
![Screenshot 2024-06-08 190929](https://github.com/user-attachments/assets/15490995-94f8-4c07-81f7-a7b8c5ca0417)
![Screenshot 2024-06-08 190949](https://github.com/user-attachments/assets/92f4c732-76ed-4574-b65b-484fcf363016)
![Screenshot 2024-06-08 191005](https://github.com/user-attachments/assets/05be8664-c144-4113-a4d5-49d3073a0060)
![Screenshot 2024-06-08 191039](https://github.com/user-attachments/assets/3a7a7d9b-aa5a-494e-a735-0d4a49a57671)
![Screenshot 2024-06-08 191047](https://github.com/user-attachments/assets/4f8006be-c044-4aea-a244-d7c67ce1b361)


## 👥 Contributors

- [@amarps](https://github.com/amarps)
- [@OrionShii](https://github.com/OrionShii)
- [@asrulfami](https://github.com/asrulfami)
- [@sheesheeee](https://github.com/sheesheeee)

## 🚀 How to Run the Application

### Prerequisites

1. **Install Go:**
   - Download and install Go from [here](https://go.dev/doc/install).

2. **Install Git:**
   - Download and install Git from [here](https://git-scm.com/downloads).

3. **Install SQLite:**
   - Download and install SQLite from [here](https://sqlitebrowser.org/dl/).

4. **Install GCC:**
   - Download and install GCC from [here](https://sourceforge.net/projects/tdm-gcc/).

### Steps to Run

1. **Download the Source Code:**
   - Open Git Bash and clone the repository:
     ```bash
     git clone https://github.com/Kulyah/tb2-rpl.git
     ```

2. **Open the Project in VS Code:**
   - Navigate to the project directory and open it in [Visual Studio Code](https://code.visualstudio.com/).

3. **Set Up the Environment:**
   - Ensure CGO is enabled:
     ```bash
     go env -w CGO_ENABLED=1
     ```
   - Download dependencies:
     ```bash
     go mod download
     ```

4. **Run the Application:**
   - Start the application by running:
     ```bash
     go run ./...
     ```

5. **Configure GitHub Account:**
   - Set your GitHub account configuration:
     ```bash
     git config --global user.email "you@example.com"
     git config --global user.name "Your Name"
     ```

6. **Push Code Changes:**
   - Stage, commit, and push your changes:
     ```bash
     git add .
     git commit -m "update"
     git push origin main
     ```

7. **Pull Code Updates:**
   - Pull the latest code updates from the repository:
     ```bash
     git pull origin main
     ```

8. **Access the Application:**
   - Open a browser and go to `localhost/` to access the application.

## 📂 Project Structure

The project follows a modular structure with a focus on separation of concerns. The main components include:

- **Handlers:** Responsible for handling HTTP requests and responses.
- **Entities:** Defines the data models and database entities.
- **Render:** Provides utilities for rendering responses and error messages.

## 📋 Features

### User Management
- **User Registration and Login:** Allows users to register and login with secure password hashing.
- **Role-Based Access:** Differentiates between admin and basic users, each with distinct dashboards and permissions.

### Delivery Management
- **Add and Delete Deliveries:** Admin can add new deliveries or delete existing ones.
- **Delivery Status Tracking:** Users can track the status of their deliveries.

### Driver Management
- **Add and Remove Drivers:** Admin can manage driver details, including adding new drivers and removing existing ones.

### Package Management
- **Package Tracking:** Admin can manage package details, including tracking delivery status and updating package information.

## 📜 Example Code

### Handler for Adding a New Delivery
```go
func (h *Handler) AddDeliveryPost(c *gin.Context) {
    status := c.PostForm("status")
    noResi := c.PostForm("noresi")
    alamatPenerima := c.PostForm("alamatpenerima")
    namaPenerima := c.PostForm("namapenerima")
    noHPPenerima := c.PostForm("nohppenerima")
    kotaTujuan := c.PostForm("kotatujuan")
    namaKurir := c.PostForm("namakurir")
    kendaraanKurir := c.PostForm("kendaraankurir")
    noHPKurir := c.PostForm("nohpkurir")
    tanggalPembelian := c.PostForm("tanggalpembelian")
    tanggalSampai := c.PostForm("tanggalsampai")

    deliverystatus := entity.Deliverystatus{
        Status:           status,
        NoResi:           noResi,
        AlamatPenerima:   alamatPenerima,
        NamaPenerima:     namaPenerima,
        NoHPPenerima:     noHPPenerima,
        KotaTujuan:       kotaTujuan,
        NamaKurir:        namaKurir,
        KendaraanKurir:   kendaraanKurir,
        NoHPKurir:        noHPKurir,
        TanggalPembelian: tanggalPembelian,
        TanggalSampai:    tanggalSampai,
    }

    err := h.db.Create(&deliverystatus).Error
    if err != nil {
        render.ErrMsgf(c, "/mdelivery", "Failed to add delivery: %s", err.Error())
    } else {
        render.Msgf(c, "/mdelivery", "Delivery successfully added")
    }
}
```

For further details and to contribute to the project, please visit our [GitHub repository](https://github.com/Kulyah/tb2-rpl).
