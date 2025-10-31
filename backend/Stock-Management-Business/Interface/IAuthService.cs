using Stock_Management_Business.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Stock_Management_Business.Interface
{
    public interface IAuthService
    {
        Task<LoginResponseDTO> LoginAsync(LoginRequestDTO loginRequest);
        Task<SignupResponseDTO> SignupAsync(SignupRequestDTO signupRequest);
        Task<ForgotPasswordResponseDTO> ForgotPasswordAsync(ForgotPasswordRequestDTO forgotPasswordRequest);
        Task<ResetPasswordResponseDTO> ResetPasswordAsync(ResetPasswordRequestDTO resetPasswordRequest);
        Task<UserDTO> GetUserByIdAsync(int userId);
        string GenerateJwtToken(UserDTO user);
        bool VerifyPassword(string password, string hash);
        string HashPassword(string password);
    }
}