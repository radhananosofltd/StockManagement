using AutoMapper;
using Stock_Management_Business.DTO;
using Stock_Management_Business.Interface;
using Stock_Management_DataAccess.Interfaces;
using Stock_Management_DataAccess.Entities;
using System.Security.Cryptography;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Stock_Management_Business.Service
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IEmailService _emailService;
        private readonly string _jwtSecret = "your-super-secret-jwt-key-that-should-be-at-least-32-characters-long";

        public AuthService(IUserRepository userRepository, IMapper mapper, IEmailService emailService)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _emailService = emailService;
        }

        public async Task<AuthenticationResult> LoginAsync(string username, string password)
        {
            try
            {
                var user = await _userRepository.GetByUsernameAsync(username);
                
                if (user == null || !VerifyPassword(password, user.PasswordHash))
                {
                    return new AuthenticationResult
                    {
                        Success = false,
                        Message = "Invalid user credentials. Please check your username and password."
                    };
                }

                if (!user.IsActive)
                {
                    return new AuthenticationResult
                    {
                        Success = false,
                        Message = "Your account has been deactivated. Please contact administrator."
                    };
                }

                // Update last login with explicit UTC kind
                user.LastLoginAt = DateTime.SpecifyKind(DateTime.UtcNow, DateTimeKind.Utc);
                await _userRepository.UpdateAsync(user);

                // Generate JWT token
                var token = GenerateJwtToken(user);
                var userDto = _mapper.Map<UserDTO>(user);

                return new AuthenticationResult
                {
                    Success = true,
                    Message = "Login successful",
                    Token = token,
                    User = userDto
                };
            }
            catch (Exception ex)
            {
                return new AuthenticationResult
                {
                    Success = false,
                    Message = "An error occurred during login"
                };
            }
        }

        public async Task<SignupResult> SignupAsync(string username, string email, string password, string firstName = "", string lastName = "")
        {
            try
            {
                // Check if username already exists
                var existingUserByUsername = await _userRepository.GetByUsernameAsync(username);
                if (existingUserByUsername != null)
                {
                    return new SignupResult
                    {
                        Success = false,
                        Message = "Username already exists. Please choose a different username."
                    };
                }

                // Check if email already exists
                var existingUserByEmail = await _userRepository.GetByEmailAsync(email);
                if (existingUserByEmail != null)
                {
                    return new SignupResult
                    {
                        Success = false,
                        Message = "Email already exists. Please use a different email address."
                    };
                }

                // Create new user
                var user = new UserEntity
                {
                    Username = username,
                    Email = email,
                    PasswordHash = HashPassword(password),
                    FirstName = firstName,
                    LastName = lastName,
                    CreatedAt = DateTime.SpecifyKind(DateTime.UtcNow, DateTimeKind.Utc),
                    IsActive = true
                };

                var createdUser = await _userRepository.CreateAsync(user);
                var userDto = _mapper.Map<UserDTO>(createdUser);

                return new SignupResult
                {
                    Success = true,
                    Message = "Account created successfully",
                    User = userDto
                };
            }
            catch (Exception ex)
            {
                return new SignupResult
                {
                    Success = false,
                    Message = "An error occurred during signup"
                };
            }
        }

        public async Task<ForgotPasswordResult> ForgotPasswordAsync(string email)
        {
            try
            {
                var user = await _userRepository.GetByEmailAsync(email);
                
                if (user == null)
                {
                    // For security reasons, we'll return success even if email doesn't exist
                    return new ForgotPasswordResult
                    {
                        Success = true,
                        Message = "If an account with this email exists, a password reset code has been sent."
                    };
                }

                // Generate a 6-digit reset code
                var resetCode = GenerateResetCode();
                
                // Store reset code and expiry (valid for 30 minutes)
                user.ResetPasswordToken = resetCode;
                user.ResetPasswordExpiry = DateTime.SpecifyKind(DateTime.UtcNow.AddMinutes(30), DateTimeKind.Utc);
                
                await _userRepository.UpdateAsync(user);

                // Send email with reset code
                var emailSent = await _emailService.SendPasswordResetEmailAsync(email, resetCode);
                
                if (!emailSent)
                {
                    // Log the reset code for development purposes if email fails
                    Console.WriteLine($"Email failed. Reset code for {email}: {resetCode}");
                }

                return new ForgotPasswordResult
                {
                    Success = true,
                    Message = "A password reset code has been sent to your email address."
                };
            }
            catch (Exception ex)
            {
                return new ForgotPasswordResult
                {
                    Success = false,
                    Message = "An error occurred while processing your request"
                };
            }
        }

        public async Task<ResetPasswordResult> ResetPasswordAsync(string resetCode, string newPassword)
        {
            try
            {
                var user = await _userRepository.GetByResetTokenAsync(resetCode);
                
                if (user == null)
                {
                    return new ResetPasswordResult
                    {
                        Success = false,
                        Message = "Invalid reset code. Please check the code or request a new one."
                    };
                }

                // Check if reset code has expired
                if (user.ResetPasswordExpiry == null || user.ResetPasswordExpiry < DateTime.UtcNow)
                {
                    return new ResetPasswordResult
                    {
                        Success = false,
                        Message = "Reset code has expired. Please request a new one."
                    };
                }

                // Update password and clear reset token
                user.PasswordHash = HashPassword(newPassword);
                user.ResetPasswordToken = null;
                user.ResetPasswordExpiry = null;
                
                await _userRepository.UpdateAsync(user);

                return new ResetPasswordResult
                {
                    Success = true,
                    Message = "Password has been reset successfully. Please login with your new password."
                };
            }
            catch (Exception ex)
            {
                return new ResetPasswordResult
                {
                    Success = false,
                    Message = "An error occurred while resetting your password"
                };
            }
        }

        private string HashPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password + "salt"));
                return Convert.ToBase64String(hashedBytes);
            }
        }

        private bool VerifyPassword(string password, string passwordHash)
        {
            var hashedPassword = HashPassword(password);
            return hashedPassword == passwordHash;
        }

        public async Task<UserProfileDTO?> GetUserProfileAsync(int userId)
        {
            try
            {
                var user = await _userRepository.GetByIdAsync(userId);
                if (user == null)
                {
                    return null;
                }

                return _mapper.Map<UserProfileDTO>(user);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        private string GenerateResetCode()
        {
            var random = new Random();
            return random.Next(100000, 999999).ToString();
        }

        private string GenerateJwtToken(UserEntity user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_jwtSecret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Name, user.Username),
                    new Claim(ClaimTypes.Email, user.Email)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}