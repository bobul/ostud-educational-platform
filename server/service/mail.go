package service

import (
	"fmt"
	"net/smtp"
	"os"
	"strings"
)

type MailService struct {
	smtpMail     string
	smtpPassword string
	smtpHost     string
	smtpPort     string
	auth         smtp.Auth
}

func NewMailService() *MailService {
	smtpMail := os.Getenv("SMTP_USER")
	smtpPassword := os.Getenv("SMTP_PASSWORD")
	smtpHost := os.Getenv("SMTP_HOST")
	smtpPort := os.Getenv("SMTP_PORT")
	auth := smtp.PlainAuth("", smtpMail, smtpPassword, smtpHost)

	return &MailService{
		smtpMail:     smtpMail,
		smtpPassword: smtpPassword,
		smtpHost:     smtpHost,
		smtpPort:     smtpPort,
		auth:         auth,
	}
}

func (m *MailService) SendActivationMessage(email string, activationLink string) {

	receiverEmail := []string{
		email,
	}

	subject := "Підтвердження електронної пошти"
	body := fmt.Sprintf(`
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; text-align: center; padding: 20px;">
<table style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
    <tr>
        <td>
            <h1 style="color: #333;">Ласкаво просимо в Остуд!</h1>
            <p style="color: #666; font-size: 16px;">Щоб активувати обліковий запис, натисніть кнопку нижче:</p>
            <a href="%s" style="display: inline-block; padding: 10px 20px; background-color: #ffd422; color: #ffffff; text-decoration: none; border-radius: 5px; margin-top: 20px;">Активувати акаунт</a>
            <p style="color: #666; font-size: 14px; margin-top: 20px;">Якщо кнопка вище не працює, ви також можете скопіювати та вставити таке посилання у свій браузер:</p>
            <p style="color: #666; font-size: 14px;"><a href="YOUR_ACTIVATION_LINK" style="color: #007bff; text-decoration: none;">%s</a></p>
            <p style="color: #666; font-size: 14px; margin-top: 20px;">Дякуємо, що обираєте Ostud!</p>
        </td>
    </tr>
</table>
</body>
`, activationLink, activationLink)

	message := BuildMessage(receiverEmail, subject, body)

	// Sending email.
	err := smtp.SendMail(m.smtpHost+":"+m.smtpPort, m.auth, m.smtpMail, receiverEmail, []byte(message))
	if err != nil {
		fmt.Println(err)
		return
	}
}

func BuildMessage(receiverEmail []string, subject string, body string) string {
	msg := "MIME-version: 1.0;\nContent-Type: text/html; charset=\"UTF-8\";\r\n"
	msg += fmt.Sprintf("From: Ostud Team\r\n")
	msg += fmt.Sprintf("To: %s\r\n", strings.Join(receiverEmail, ";"))
	msg += fmt.Sprintf("Subject: %s\r\n", subject)
	msg += fmt.Sprintf("\r\n%s\r\n", body)

	return msg
}
