package routes

import (
	"kerkomapp/handler"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
)

func Init(r *gin.Engine, db *gorm.DB) {
	handler := handler.NewHandler(db)
	// index
	r.GET("/", handler.IndexPage)

	r.POST("/register", handler.Register)
	r.POST("/login", handler.Login)
	r.GET("/logout", handler.Logout)
	r.GET("/login", handler.LoginPage)
	r.GET("/register", handler.RegisterPage)
	r.GET("/about", handler.AboutPage)
	r.GET("/contact", handler.ContactPage)
	r.GET("/delivery", handler.DeliveryPage)
	r.GET("/admindashboard", handler.AdminDashboard)
	r.GET("/userdashboard", handler.UserDashboard)
	r.GET("/profile", handler.Profile)
	r.GET("/manageuser", handler.ManageUser)
	r.GET("/mpelanggan", handler.MPelanggan)
	r.GET("/mdriver", handler.MDriver)
	r.GET("/mkendaraan", handler.MKendaraan)
	r.GET("/mdelivery", handler.MDelivery)
	r.GET("/dstatus", handler.DStatus)
	r.GET("/userd", handler.UserD)
	r.GET("/mpackage", handler.MPackage)
	r.GET("/muser_admin", handler.MUserAdmin)
	r.POST("/adduser", handler.MUserAdminPost)
	r.GET("/deleteuser", handler.DeleteUser)
	r.POST("/adddelivery", handler.AddDeliveryPost)
	r.GET("/deletedelivery", handler.DeleteDelivery)
	r.POST("/addpackage", handler.AddPackagePost)
	r.GET("/deletepackage", handler.DeletePackage)
	r.POST("/adddriver", handler.AddDriverPost)
	r.GET("/deletedriver", handler.DeleteDriver)

	// 404
	r.NoRoute(func(c *gin.Context) {
		c.HTML(404, "404.html", nil)
	})
}
