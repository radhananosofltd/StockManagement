using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Stock_Management_Business.DTO
{
    public class UserDTO
    {
        public int UserId { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? LastLoginDate { get; set; }
        public bool IsActive { get; set; }
    }

    public class LoginRequestDTO
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }

    public class LoginResponseDTO
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public string Token { get; set; }
        public UserDTO User { get; set; }
    }

    public class SignupRequestDTO
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }

    public class SignupResponseDTO
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public UserDTO User { get; set; }
    }

    public class ForgotPasswordRequestDTO
    {
        public string Email { get; set; }
    }

    public class ForgotPasswordResponseDTO
    {
        public bool Success { get; set; }
        public string Message { get; set; }
    }

    public class ResetPasswordRequestDTO
    {
        public string Token { get; set; }
        public string NewPassword { get; set; }
    }

    public class ResetPasswordResponseDTO
    {
        public bool Success { get; set; }
        public string Message { get; set; }
    }
}