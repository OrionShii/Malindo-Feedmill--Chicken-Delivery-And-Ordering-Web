package main

import (
	"fmt"
	"kerkomapp/db"
	"kerkomapp/entity"
	"kerkomapp/routes"

	gintemplate "github.com/foolin/gin-template"
	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
)

// create gin app
func main() {
	app := gin.Default()

	app.GET("/ping", func(c *gin.Context) {
		c.JSON(200, "pong")
	})

	app.HTMLRender = gintemplate.New(gintemplate.TemplateConfig{
		Root:         "templates",
		Extension:    ".html",
		Master:       "layouts/master",
		DisableCache: true,
	})

	// static files
	app.Static("./css", "./static/css")
	app.Static("./js", "./static/js")
	app.Static("./images", "./static/images")

	// init database
	db := db.InitDB()
	entity.Init(db)

	// add session
	store := cookie.NewStore([]byte("secret"))
	app.Use(sessions.Sessions("mysession", store))

	// init routes
	routes.Init(app, db)

	err := app.Run(":80")
	if err != nil {
		fmt.Println(err)
	}
}
