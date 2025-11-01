namespace Stock_Management_Business.DTO
{
    public class AuthenticationResult
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
        public string Token { get; set; } = string.Empty;
        public UserDTO? User { get; set; }
    }

    public class UserDTO
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public DateTime? LastLoginAt { get; set; }
        public bool IsActive { get; set; }
    }

    public class SignupResult
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
        public UserDTO? User { get; set; }
    }

    public class ForgotPasswordResult
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
    }
}