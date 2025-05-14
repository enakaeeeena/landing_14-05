using Microsoft.Extensions.Configuration;
using MimeKit;
using MailKit.Net.Smtp;

namespace lending_skills_backend.Services;

public class EmailService
{
    private readonly IConfiguration _configuration;

    public EmailService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public void SendConfirmationEmail(string email, string code)
    {
        var emailSettings = _configuration.GetSection("EmailSettings");

        var message = new MimeMessage();
        message.From.Add(new MailboxAddress("Lending Skills", emailSettings["SmtpUsername"]));
        message.To.Add(new MailboxAddress("", email));
        message.Subject = "Код подтверждения";
        message.Body = new TextPart("plain")
        {
            Text = $"Ваш код подтверждения: {code}"
        };

        using var client = new SmtpClient();
        client.Connect(emailSettings["SmtpServer"], int.Parse(emailSettings["SmtpPort"]), false);
        client.Authenticate(emailSettings["SmtpUsername"], emailSettings["SmtpPassword"]);
        client.Send(message);
        client.Disconnect(true);
    }
}
