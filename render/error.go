package render

import (
	"fmt"
	"net/url"

	"github.com/gin-gonic/gin"
)

func ErrMsgf(c *gin.Context, path, format string, m ...any) {
	msg := fmt.Sprintf(format, m...)

	c.Redirect(302, path+"?error="+url.QueryEscape(msg))
}

func Msgf(c *gin.Context, path, format string, m ...any) {
	msg := fmt.Sprintf(format, m...)

	c.Redirect(302, path+"?msg="+url.QueryEscape(msg))
}
