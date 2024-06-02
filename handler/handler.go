package handler

import (
	"fmt"
	"kerkomapp/entity"
	"kerkomapp/render"
	"strconv"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"golang.org/x/crypto/bcrypt"
)

// type handler contain database
type Handler struct {
	db *gorm.DB
}

// NewHandler return new handler
func NewHandler(db *gorm.DB) *Handler {
	return &Handler{db}
}

func (h *Handler) IndexPage(c *gin.Context) {
	user := h.getUser(c)

	if user == nil {
		c.HTML(200, "index.html", gin.H{
			"User": user,
		})
		return
	}

	fmt.Println("role: ", user.Role)
	if user.Role == "admin" {
		c.HTML(200, "admin_dashboard.html", gin.H{
			"User": user,
		})
		return
	} else if user.Role == "basic" {
		c.HTML(200, "user_dash.html", gin.H{
			"User": user,
		})
		return
	}

	c.HTML(200, "index.html", gin.H{
		"User": user,
	})
	return
}

func (h *Handler) DeleteDelivery(c *gin.Context) {
	id, err := strconv.Atoi(c.Query("id"))
	fmt.Println(id)
	if err != nil {
		render.ErrMsgf(c, "/mdelivery", "ID harus angka")
		return
	}

	deliverystatus := entity.Deliverystatus{}
	err = h.db.Where("id = ?", id).First(&deliverystatus).Error
	if err != nil {
		render.ErrMsgf(c, "/mdelivery", "Delivery dengan id %d tidak ditemukan", id)
		return
	}

	err = h.db.Delete(&deliverystatus).Error
	if err != nil {
		panic(err)
	}

	// redirect
	render.Msgf(c, "/mdelivery", "Delivery berhasil dihapus")
}

func (h *Handler) AddDeliveryPost(c *gin.Context) {
	// get data from form
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

	// save to database
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
		render.ErrMsgf(c, "/mdelivery", "Delivery gagal ditambahkan: %s", err.Error())
	}
	// redirect
	render.Msgf(c, "/mdelivery", "Delivery berhasil ditambahkan")
}

func (h *Handler) MUserAdminPost(c *gin.Context) {
	name := c.PostForm("fullname")
	email := c.PostForm("email")
	password := c.PostForm("password")
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		panic(err)
	}

	role := c.PostForm("role")

	user := entity.User{}
	err = h.db.Where("email = ?", email).First(&user).Error
	if err == nil {
		render.ErrMsgf(c, "/muser_admin", "User dengan email %s sudah terdaftar", email)
		return
	}

	// save to database
	user = entity.User{
		Name:     name,
		Email:    email,
		Password: string(hashedPassword),
		Role:     role,
	}
	err = h.db.Create(&user).Error
	if err != nil {
		panic(err)
	}

	// redirect
	render.Msgf(c, "/muser_admin", "Register berhasil")
}

func (h *Handler) DeleteUser(c *gin.Context) {
	id, err := strconv.Atoi(c.Query("id"))
	fmt.Println(id)
	if err != nil {
		render.ErrMsgf(c, "/muser_admin", "ID harus angka")
		return
	}

	user := entity.User{}
	err = h.db.Where("id = ?", id).First(&user).Error
	if err != nil {
		render.ErrMsgf(c, "/muser_admin", "User dengan id %d tidak ditemukan", id)
		return
	}

	err = h.db.Delete(&user).Error
	if err != nil {
		panic(err)
	}

	// redirect
	render.Msgf(c, "/muser_admin", "User berhasil dihapus")
}

// register handler post
func (h *Handler) Register(c *gin.Context) {
	// get data from form
	name := c.PostForm("fname")
	email := c.PostForm("email")
	uniqId := c.PostForm("id")
	gender := c.PostForm("gender")
	phone := c.PostForm("phone")
	password := c.PostForm("password")
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		panic(err)
	}

	user := entity.User{}
	err = h.db.Where("email = ?", email).First(&user).Error
	if err == nil {
		render.ErrMsgf(c, "/login", "User dengan email %s sudah terdaftar", email)
		return
	}

	// save to database
	user = entity.User{
		Name:     name,
		Email:    email,
		UniqId:   uniqId,
		Gender:   gender,
		Phone:    phone,
		Password: string(hashedPassword),
		Role:     "basic",
	}
	err = h.db.Create(&user).Error
	if err != nil {
		panic(err)
	}
	// redirect
	render.Msgf(c, "/login", "Register berhasil")
}

// login handler post
func (h *Handler) Login(c *gin.Context) {
	// get data from form
	email := c.PostForm("email")
	password := c.PostForm("password")

	// get data from database
	var user entity.User
	err := h.db.Where("email = ?", email).First(&user).Error
	fmt.Println(err)
	if err != nil {
		render.ErrMsgf(c, "/", "User dengan email %s tidak ditemukan", email)
		return
	}

	// compare password
	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	fmt.Println(err)
	if err != nil {
		render.ErrMsgf(c, "/", "Password salah")
		return
	}

	h.db.Where("email = ?", email).First(&user)
	sessions := sessions.Default(c)
	sessions.Set("userId", user.Model.ID)
	sessions.Save()

	// redirect
	render.Msgf(c, "/", "Login berhasil")
}

// logout handler get
func (h *Handler) Logout(c *gin.Context) {
	sessions := sessions.Default(c)
	fmt.Println("@@@@@@@@ logout hit @@@@@@@@")
	sessions.Clear()
	sessions.Save()

	c.Redirect(302, "/")
}

func (h *Handler) DeleteDriver(c *gin.Context) {
	id, err := strconv.Atoi(c.Query("id"))
	fmt.Println(id)
	if err != nil {
		render.ErrMsgf(c, "/mdriver", "ID harus angka")
		return
	}

	driver := entity.Driver{}
	err = h.db.Where("id = ?", id).First(&driver).Error
	if err != nil {
		render.ErrMsgf(c, "/mdriver", "Driver dengan id %d tidak ditemukan", id)
		return
	}

	err = h.db.Delete(&driver).Error
	if err != nil {
		panic(err)
	}

	// redirect
	render.Msgf(c, "/mdriver", "Driver berhasil dihapus")
}

func (h *Handler) AddDriverPost(c *gin.Context) {
	// get data from form
	driverName := c.PostForm("drivername")
	driverID := c.PostForm("driverid")
	driverCarPlat := c.PostForm("drivercarplat")
	driverCarBrand := c.PostForm("drivercarbrand")
	capacity := c.PostForm("capacity")

	capacityInt, err := strconv.Atoi(capacity)
	if err != nil {
		fmt.Println(capacityInt)
		render.ErrMsgf(c, "/mdriver", "Capacity harus angka")
	}

	// save to database
	driver := entity.Driver{
		DriverName:     driverName,
		DriverID:       driverID,
		DriverCarPlat:  driverCarPlat,
		DriverCarBrand: driverCarBrand,
		Capacity:       capacityInt,
	}

	err = h.db.Create(&driver).Error
	if err != nil {
		render.ErrMsgf(c, "/mdriver", "Driver gagal ditambahkan: %s", err.Error())
	}
	// redirect
	render.Msgf(c, "/mdriver", "Driver berhasil ditambahkan")
}

// login page
func (h *Handler) LoginPage(c *gin.Context) {
	c.HTML(200, "login.html", nil)
}

// login page
func (h *Handler) MPackage(c *gin.Context) {
	packages := []entity.Package{}
	h.db.Find(&packages)
	c.HTML(200, "mpackage.html", gin.H{
		"packages": packages,
	})
}

// login page
func (h *Handler) MUserAdmin(c *gin.Context) {
	users := []entity.User{}
	h.db.Find(&users)
	c.HTML(200, "muser_admin.html", gin.H{
		"users": users,
	})
}

// register page
func (h *Handler) RegisterPage(c *gin.Context) {
	c.HTML(200, "register.html", nil)
}

func (h *Handler) getUser(c *gin.Context) *entity.User {
	sessions := sessions.Default(c)
	userId := sessions.Get("userId")
	var user *entity.User
	if userId != nil {
		fmt.Println("getting user")
		tempUser := &entity.User{}
		q := h.db.Where("id = ?", userId).First(&tempUser)
		if q.Error != nil {
			fmt.Println("err:", q.Error)
		}

		user = tempUser
	}
	return user
}

func (h *Handler) ContactPage(c *gin.Context) {
	user := h.getUser(c)

	c.HTML(200, "contact.html", gin.H{
		"User": user,
	})
}

func (h *Handler) AboutPage(c *gin.Context) {
	user := h.getUser(c)

	c.HTML(200, "about.html", gin.H{
		"User": user,
	})
}

func (h *Handler) DeliveryPage(c *gin.Context) {
	user := h.getUser(c)

	c.HTML(200, "delivery.html", gin.H{
		"User": user,
	})
}

func (h *Handler) AdminDashboard(c *gin.Context) {
	user := h.getUser(c)

	c.HTML(200, "admin_dashboard.html", gin.H{
		"User": user,
	})
}

func (h *Handler) UserDashboard(c *gin.Context) {
	user := h.getUser(c)

	c.HTML(200, "user_dashboard.html", gin.H{
		"User": user,
	})
}

func (h *Handler) Profile(c *gin.Context) {
	user := h.getUser(c)

	c.HTML(200, "profile.html", gin.H{
		"User": user,
	})
}

func (h *Handler) ManageUser(c *gin.Context) {
	user := h.getUser(c)

	c.HTML(200, "manageuser.html", gin.H{
		"User": user,
	})
}

func (h *Handler) MPelanggan(c *gin.Context) {
	user := h.getUser(c)

	c.HTML(200, "mpelanggan.html", gin.H{
		"User": user,
	})
}

func (h *Handler) MDriver(c *gin.Context) {
	user := h.getUser(c)

	drivers := []entity.Driver{}
	h.db.Find(&drivers)

	c.HTML(200, "mdriver.html", gin.H{
		"User":    user,
		"drivers": drivers,
	})
}

func (h *Handler) MKendaraan(c *gin.Context) {
	user := h.getUser(c)

	c.HTML(200, "mkendaraan.html", gin.H{
		"User": user,
	})
}

func (h *Handler) MDelivery(c *gin.Context) {
	user := h.getUser(c)

	deliveries := []entity.Deliverystatus{}
	h.db.Find(&deliveries)
	c.HTML(200, "mdelivery.html", gin.H{
		"User":       user,
		"deliveries": deliveries,
	})
}

func (h *Handler) DStatus(c *gin.Context) {
	user := h.getUser(c)

	c.HTML(200, "dstatus.html", gin.H{
		"User": user,
	})
}

func (h *Handler) UserD(c *gin.Context) {
	user := h.getUser(c)

	c.HTML(200, "userd.html", gin.H{
		"User": user,
	})
}

func (h *Handler) AddStatus(c *gin.Context) {
	user := h.getUser(c)

	c.HTML(200, "addstatus.html", gin.H{
		"User": user,
	})
}

func (h *Handler) AddUser(c *gin.Context) {
	user := h.getUser(c)

	c.HTML(200, "adduser.html", gin.H{
		"User": user,
	})
}

func (h *Handler) AddPelanggan(c *gin.Context) {
	user := h.getUser(c)

	c.HTML(200, "addpelanggan.html", gin.H{
		"User": user,
	})
}

func (h *Handler) AddDriver(c *gin.Context) {
	user := h.getUser(c)

	c.HTML(200, "adddriver.html", gin.H{
		"User": user,
	})
}

func (h *Handler) AddKendaraan(c *gin.Context) {
	user := h.getUser(c)

	c.HTML(200, "addkendaraan.html", gin.H{
		"User": user,
	})
}

func (h *Handler) AddDelivery(c *gin.Context) {
	user := h.getUser(c)

	c.HTML(200, "adddelivery.html", gin.H{
		"User": user,
	})
}

func (h *Handler) UpdateStatus(c *gin.Context) {
	user := h.getUser(c)

	c.HTML(200, "updatestatus.html", gin.H{
		"User": user,
	})
}

func (h *Handler) UpdateUser(c *gin.Context) {
	user := h.getUser(c)

	c.HTML(200, "updateuser.html", gin.H{
		"User": user,
	})
}

func (h *Handler) UpdatePelanggan(c *gin.Context) {
	user := h.getUser(c)

	c.HTML(200, "updatepelanggan.html", gin.H{
		"User": user,
	})
}

func (h *Handler) UpdateDriver(c *gin.Context) {
	user := h.getUser(c)

	c.HTML(200, "updatedriver.html", gin.H{
		"User": user,
	})
}

func (h *Handler) UpdateKendaraan(c *gin.Context) {
	user := h.getUser(c)

	c.HTML(200, "updatekendaraan.html", gin.H{
		"User": user,
	})
}

func (h *Handler) UpdateDelivery(c *gin.Context) {
	user := h.getUser(c)

	c.HTML(200, "updatedelivery.html", gin.H{
		"User": user,
	})
}

func (h *Handler) DeleteStatus(c *gin.Context) {
	user := h.getUser(c)

	c.HTML(200, "deletestatus.html", gin.H{
		"User": user,
	})
}

func (h *Handler) DeletePelanggan(c *gin.Context) {
	user := h.getUser(c)

	c.HTML(200, "deletepelanggan.html", gin.H{
		"User": user,
	})
}

func (h *Handler) DeleteKendaraan(c *gin.Context) {
	user := h.getUser(c)

	c.HTML(200, "deletekendaraan.html", gin.H{
		"User": user,
	})
}

func (h *Handler) DeletePackage(c *gin.Context) {
	id, err := strconv.Atoi(c.Query("id"))
	fmt.Println(id)
	if err != nil {
		render.ErrMsgf(c, "/mpackage", "ID harus angka")
		return
	}

	pack := entity.Package{}
	err = h.db.Where("id = ?", id).First(&pack).Error
	if err != nil {
		render.ErrMsgf(c, "/mpackage", "Package dengan id %d tidak ditemukan", id)
		return
	}

	err = h.db.Delete(&pack).Error
	if err != nil {
		render.ErrMsgf(c, "/mpackage", "Package gagal dihapus")
		return
	}

	// redirect
	render.Msgf(c, "/mpackage", "Package berhasil dihapus")
}

func (h *Handler) AddPackagePost(c *gin.Context) {
	// Package Name	Customer Name	Customer Address	Kota Tujuan	Total Yang Dibeli	Total Harga	Tanggal Pembelian	Status
	// get data from form
	packageName := c.PostForm("packagename")
	customerName := c.PostForm("customername")
	customerAddress := c.PostForm("customeraddress")
	kotaTujuan := c.PostForm("kotatujuan")
	totalYangDibeli := c.PostForm("totalyangdibeli")
	totalHarga := c.PostForm("totalharga")
	tanggalPembelian := c.PostForm("tanggalpembelian")
	status := c.PostForm("status")

	totalDibeliInt, err := strconv.Atoi(totalYangDibeli)
	if err != nil {
		fmt.Println(totalDibeliInt)
		render.ErrMsgf(c, "/mpackage", "Total yang dibeli harus angka")
	}
	totalHargaInt, err := strconv.Atoi(totalHarga)
	if err != nil {
		fmt.Println(totalHargaInt)
		render.ErrMsgf(c, "/mpackage", "Total harga harus angka")
	}

	// save to database
	pack := entity.Package{
		PackageName:      packageName,
		CustomerName:     customerName,
		CustomerAddress:  customerAddress,
		KotaTujuan:       kotaTujuan,
		TotalYangDibeli:  totalDibeliInt,
		TotalHarga:       totalHargaInt,
		TanggalPembelian: tanggalPembelian,
		Status:           status,
	}

	err = h.db.Create(&pack).Error
	if err != nil {
		render.ErrMsgf(c, "/mpackage", "Package gagal ditambahkan: %s", err.Error())
	}

	// redirect
	render.Msgf(c, "/mpackage", "Package berhasil ditambahkan")
}

func (h *Handler) AddStatusPost(c *gin.Context) {
	// get data from form
	status := c.PostForm("status")
	noResi := c.PostForm("noresi")
	alamatPenerima := c.PostForm("alamatpenerima")
	namaPenerima := c.PostForm("namapenerima")
	kurirId, err := strconv.Atoi(c.PostForm("kurirId"))
	if err != nil {
		fmt.Println(kurirId)
		render.ErrMsgf(c, "/dstatus", "Kurir ID harus angka")
	}
	noHPKurir := c.PostForm("nohpkurir")
	tanggalPembelian := c.PostForm("tanggalpembelian")
	tanggalSampai := c.PostForm("tanggalsampai")

	// save to database
	deliverystatus := entity.Deliverystatus{
		Status:           status,
		NoResi:           noResi,
		AlamatPenerima:   alamatPenerima,
		NamaPenerima:     namaPenerima,
		NoHPKurir:        noHPKurir,
		TanggalPembelian: tanggalPembelian,
		TanggalSampai:    tanggalSampai,
	}

	err = h.db.Create(&deliverystatus).Error
	if err != nil {
		render.ErrMsgf(c, "/dstatus", "Status gagal ditambahkan: %s", err.Error())
	}
	// redirect
	render.Msgf(c, "/dstatus", "Status berhasil ditambahkan")
}

func (h *Handler) AddPelangganPost(c *gin.Context) {
	// get data from form
	nama := c.PostForm("nama")
	alamat := c.PostForm("alamat")
	noHP := c.PostForm("nohp")
	email := c.PostForm("email")

	// save to database
	pelanggan := entity.Pelanggan{
		Nama:    nama,
		Email:   email,
		Phone:   noHP,
		Address: alamat,
		UserId:  0,
	}

	err := h.db.Create(&pelanggan).Error
	if err != nil {
		render.ErrMsgf(c, "/mpelanggan", "Pelanggan gagal ditambahkan: %s", err.Error())
	}
	// redirect
	render.Msgf(c, "/mpelanggan", "Pelanggan berhasil ditambahkan")
}
