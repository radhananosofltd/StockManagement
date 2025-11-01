using System.Net;
using System.Net.Mail;
using Microsoft.Extensions.Configuration;
using Stock_Management_Business.Interface;

namespace Stock_Management_Business.Service
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<bool> SendPasswordResetEmailAsync(string toEmail, string resetCode)
        {
            try
            {
                var smtpHost = _configuration["EmailSettings:SmtpHost"];
                var smtpPort = int.Parse(_configuration["EmailSettings:SmtpPort"] ?? "587");
                var smtpUsername = _configuration["EmailSettings:SmtpUsername"];
                var smtpPassword = _configuration["EmailSettings:SmtpPassword"];
                var fromEmail = _configuration["EmailSettings:FromEmail"];
                var fromName = _configuration["EmailSettings:FromName"] ?? "NanoSoft";

                // Check if email settings are configured
                if (string.IsNullOrEmpty(smtpHost) || string.IsNullOrEmpty(smtpUsername) || 
                    string.IsNullOrEmpty(smtpPassword) || string.IsNullOrEmpty(fromEmail))
                {
                    Console.WriteLine("Email settings not configured. Reset code: " + resetCode);
                    return false;
                }

                using var client = new SmtpClient(smtpHost, smtpPort);
                client.UseDefaultCredentials = false;
                client.Credentials = new NetworkCredential(smtpUsername, smtpPassword);
                client.EnableSsl = true;

                var mailMessage = new MailMessage
                {
                    From = new MailAddress(fromEmail, fromName),
                    Subject = "Password Reset Code - NanoSoft",
                    Body = GeneratePasswordResetEmailBody(resetCode),
                    IsBodyHtml = true
                };

                mailMessage.To.Add(toEmail);

                await client.SendMailAsync(mailMessage);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Failed to send email: {ex.Message}");
                Console.WriteLine($"Reset code for {toEmail}: {resetCode}");
                return false;
            }
        }

        private string GeneratePasswordResetEmailBody(string resetCode)
        {
            return $@"
<!DOCTYPE html>
<html>
<head>
    <style>
        body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
        .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
        .header {{ background-color: #6366f1; color: white; padding: 20px; text-align: center; }}
        .content {{ padding: 30px; background-color: #f9f9f9; }}
        .reset-code {{ 
            font-size: 32px; 
            font-weight: bold; 
            color: #6366f1; 
            text-align: center; 
            padding: 20px; 
            background-color: white; 
            border-radius: 8px; 
            margin: 20px 0; 
            letter-spacing: 5px;
        }}
        .footer {{ text-align: center; padding: 20px; color: #666; font-size: 14px; }}
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1>🔐 NanoSoft Password Reset</h1>
        </div>
        <div class='content'>
            <h2>Password Reset Request</h2>
            <p>You have requested to reset your password. Please use the following 6-digit code to reset your password:</p>
            
            <div class='reset-code'>{resetCode}</div>
            
            <p><strong>Important:</strong></p>
            <ul>
                <li>This code is valid for 30 minutes only</li>
                <li>Do not share this code with anyone</li>
                <li>If you didn't request this reset, please ignore this email</li>
            </ul>
            
            <p>Enter this code in the password reset form to continue with resetting your password.</p>
        </div>
        <div class='footer'>
            <p>This is an automated message from NanoSoft Stock Management System.</p>
            <p>If you have any questions, please contact your system administrator.</p>
        </div>
    </div>
</body>
</html>";
        }
    }
}