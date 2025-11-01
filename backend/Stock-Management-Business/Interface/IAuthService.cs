using Stock_Management_Business.DTO;

namespace Stock_Management_Business.Interface
{
    public interface IAuthService
    {
        Task<AuthenticationResult> LoginAsync(string username, string password);
        Task<SignupResult> SignupAsync(string username, string email, string password, string firstName = "", string lastName = "");
        Task<ForgotPasswordResult> ForgotPasswordAsync(string email);
        Task<ResetPasswordResult> ResetPasswordAsync(string resetCode, string newPassword);
        Task<UserProfileDTO?> GetUserProfileAsync(int userId);
    }
}