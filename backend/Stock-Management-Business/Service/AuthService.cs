using AutoMapper;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Stock_Management_Business.DTO;
using Stock_Management_Business.Interface;
using Stock_Management_DataAccess.Entities;
using Stock_Management_DataAccess.Interfaces;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Stock_Management_Business.Service
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;

        public AuthService(IUserRepository userRepository, IMapper mapper, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _configuration = configuration;
        }

        public async Task<LoginResponseDTO> LoginAsync(LoginRequestDTO loginRequest)
        {
            try
            {
                var user = await _userRepository.GetUserByUsernameAsync(loginRequest.Username);
                
                if (user == null)
                {
                    user = await _userRepository.GetUserByEmailAsync(loginRequest.Username);
                }

                if (user == null || !VerifyPassword(loginRequest.Password, user.PasswordHash))
                {
                    return new LoginResponseDTO
                    {
                        Success = false,
                        Message = "Invalid username or password"
                    };
                }

                // Update last login date
                user.LastLoginDate = DateTime.UtcNow;
                await _userRepository.UpdateUserAsync(user);

                var userDTO = _mapper.Map<UserDTO>(user);
                var token = GenerateJwtToken(userDTO);

                return new LoginResponseDTO
                {
                    Success = true,
                    Message = "Login successful",
                    Token = token,
                    User = userDTO
                };
            }
            catch (Exception ex)
            {
                return new LoginResponseDTO
                {
                    Success = false,
                    Message = $"Login failed: {ex.Message}"
                };
            }
        }

        public async Task<SignupResponseDTO> SignupAsync(SignupRequestDTO signupRequest)
        {
            try
            {
                // Check if user already exists
                if (await _userRepository.UserExistsAsync(signupRequest.Username, signupRequest.Email))
                {
                    return new SignupResponseDTO
                    {
                        Success = false,
                        Message = "User with this username or email already exists"
                    };
                }

                var userEntity = new UserEntity
                {
                    Username = signupRequest.Username,
                    Email = signupRequest.Email,
                    PasswordHash = HashPassword(signupRequest.Password),
                    FirstName = signupRequest.FirstName,
                    LastName = signupRequest.LastName,
                    CreatedDate = DateTime.UtcNow,
                    IsActive = true
                };

                var createdUser = await _userRepository.CreateUserAsync(userEntity);
                var userDTO = _mapper.Map<UserDTO>(createdUser);

                return new SignupResponseDTO
                {
                    Success = true,
                    Message = "User created successfully",
                    User = userDTO
                };
            }
            catch (Exception ex)
            {
                return new SignupResponseDTO
                {
                    Success = false,
                    Message = $"Signup failed: {ex.Message}"
                };
            }
        }

        public async Task<ForgotPasswordResponseDTO> ForgotPasswordAsync(ForgotPasswordRequestDTO forgotPasswordRequest)
        {
            try
            {
                var user = await _userRepository.GetUserByEmailAsync(forgotPasswordRequest.Email);
                
                if (user == null)
                {
                    // Don't reveal if email exists or not for security
                    return new ForgotPasswordResponseDTO
                    {
                        Success = true,
                        Message = "If the email exists, a password reset link has been sent"
                    };
                }

                // Generate reset token
                var resetToken = GenerateResetToken();
                user.ResetPasswordToken = resetToken;
                user.ResetPasswordExpiry = DateTime.UtcNow.AddHours(1); // Token expires in 1 hour

                await _userRepository.UpdateUserAsync(user);

                // In a real application, you would send an email here
                // For now, we'll just return success
                return new ForgotPasswordResponseDTO
                {
                    Success = true,
                    Message = "Password reset instructions have been sent to your email"
                };
            }
            catch (Exception ex)
            {
                return new ForgotPasswordResponseDTO
                {
                    Success = false,
                    Message = $"Failed to process password reset: {ex.Message}"
                };
            }
        }

        public async Task<ResetPasswordResponseDTO> ResetPasswordAsync(ResetPasswordRequestDTO resetPasswordRequest)
        {
            try
            {
                var user = await _userRepository.GetUserByResetTokenAsync(resetPasswordRequest.Token);
                
                if (user == null)
                {
                    return new ResetPasswordResponseDTO
                    {
                        Success = false,
                        Message = "Invalid or expired reset token"
                    };
                }

                user.PasswordHash = HashPassword(resetPasswordRequest.NewPassword);
                user.ResetPasswordToken = null;
                user.ResetPasswordExpiry = null;

                await _userRepository.UpdateUserAsync(user);

                return new ResetPasswordResponseDTO
                {
                    Success = true,
                    Message = "Password has been reset successfully"
                };
            }
            catch (Exception ex)
            {
                return new ResetPasswordResponseDTO
                {
                    Success = false,
                    Message = $"Failed to reset password: {ex.Message}"
                };
            }
        }

        public async Task<UserDTO> GetUserByIdAsync(int userId)
        {
            var user = await _userRepository.GetUserByIdAsync(userId);
            return _mapper.Map<UserDTO>(user);
        }

        public string GenerateJwtToken(UserDTO user)
        {
            var jwtSettings = _configuration.GetSection("JwtSettings");
            var secretKey = jwtSettings["SecretKey"];
            var issuer = jwtSettings["Issuer"];
            var audience = jwtSettings["Audience"];
            var expiryMinutes = int.Parse(jwtSettings["ExpiryMinutes"]);

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserId.ToString()),
                new Claim(JwtRegisteredClaimNames.UniqueName, user.Username),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.GivenName, user.FirstName),
                new Claim(JwtRegisteredClaimNames.FamilyName, user.LastName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iat, DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString(), ClaimValueTypes.Integer64)
            };

            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(expiryMinutes),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public bool VerifyPassword(string password, string hash)
        {
            return BCrypt.Net.BCrypt.Verify(password, hash);
        }

        public string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }

        private string GenerateResetToken()
        {
            using (var rng = RandomNumberGenerator.Create())
            {
                byte[] tokenBytes = new byte[32];
                rng.GetBytes(tokenBytes);
                return Convert.ToBase64String(tokenBytes);
            }
        }
    }
}