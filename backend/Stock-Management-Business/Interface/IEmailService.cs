namespace Stock_Management_Business.Interface
{
    public interface IEmailService
    {
        Task<bool> SendPasswordResetEmailAsync(string toEmail, string resetCode);
    }
}