using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Stock_Management_Business.Interface;
using Stock_Management_Business.DTO;
using System.Security.Claims;
using Microsoft.Extensions.Logging;

namespace StockManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly ILogger<AuthController> _logger;
        public AuthController(IAuthService authService, ILogger<AuthController> logger)
        {
            _authService = authService;
            _logger = logger;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            try
            {
                _logger.LogInformation("AuthController: login request for " + request.Username.ToString());

                var result = await _authService.LoginAsync(request.Username, request.Password);
                
                if (result.Success)
                {
                    _logger.LogInformation("AuthController: login successful for " + request.Username.ToString());
                    return Ok(new
                    {
                        success = true,
                        message = "Login successful",
                        token = result.Token,
                        user = result.User
                    });
                }

                _logger.LogInformation("Invalid user credentials. Please check your username and password");
                return BadRequest(new
                {
                    success = false,
                    message = "Invalid user credentials. Please check your username and password."
                });
            }
            catch (Exception ex)
            {
                _logger.LogInformation("An error occurred during login" + ex.Message.ToString());
                return StatusCode(500, new
                {
                    success = false,
                    message = "An error occurred during login"
                });
            }
        }

        [HttpPost("signup")]
        public async Task<IActionResult> Signup([FromBody] SignupRequest request)
        {
            try
            {
                _logger.LogInformation("Sign up request: userName=" + request.Username.ToString() + " Email="+ request.Email.ToString() +" FirstName="+ request.FirstName.ToString() +" LastName="+ request.LastName.ToString());

                var result = await _authService.SignupAsync(request.Username, request.Email, request.Password, request.FirstName, request.LastName);
                
                if (result.Success)
                {
                    _logger.LogInformation("Sign up request successful for userName = " + result.User); 
                    return Ok(new
                    {
                        success = true,
                        message = "Account created successfully",
                        user = result.User
                    });
                }
                _logger.LogInformation("Sign up request not successful for userName = " + result.User);
                return BadRequest(new
                {
                    success = false,
                    message = result.Message
                });
            }
            catch (Exception ex)
            {
                _logger.LogInformation("An error occurred during signup" + ex.Message.ToString());
                return StatusCode(500, new
                {
                    success = false,
                    message = "An error occurred during signup"
                });
            }
        }

        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequest request)
        {
            try
            {
                _logger.LogInformation("Forgot-password request for user " + request.Email);
               var result = await _authService.ForgotPasswordAsync(request.Email);
                
                return Ok(new
                {
                    success = result.Success,
                    message = result.Message
                });
            }
            catch (Exception ex)
            {
                _logger.LogInformation("An error occurred during forgot password: " + ex.Message.ToString());
                return StatusCode(500, new
                {
                    success = false,
                    message = "An error occurred while processing your request"
                });
            }
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequest request)
        {
            try
            {
                _logger.LogInformation("reset-password request for user");
                var result = await _authService.ResetPasswordAsync(request.ResetCode, request.NewPassword);
                
                return Ok(new
                {
                    success = result.Success,
                    message = result.Message
                });
            }
            catch (Exception ex)
            {
                _logger.LogInformation("An error occurred while resetting your password " +ex.Message.ToString());
                return StatusCode(500, new
                {
                    success = false,
                    message = "An error occurred while resetting your password"
                });
            }
        }

        [HttpGet("profile")]
        [Authorize]
        public async Task<IActionResult> GetProfile()
        {
            try
            {
                _logger.LogInformation("View Profile page");
                var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
                if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
                {
                    return Unauthorized();
                }

                var userProfile = await _authService.GetUserProfileAsync(userId);
                
                if (userProfile != null)
                {
                    _logger.LogInformation("User Profile details fetched successful");
                    return Ok(userProfile);
                }
                _logger.LogInformation("User Profile not found");

                return NotFound(new
                {
                    success = false,
                    message = "User profile not found"
                });
            }
            catch (Exception ex)
            {
                _logger.LogInformation("An error occurred while fetching user profile " + ex.Message.ToString());
                return StatusCode(500, new
                {
                    success = false,
                    message = "An error occurred while retrieving user profile"
                });
            }
        }
    }

    public class LoginRequest
    {
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }

    public class SignupRequest
    {
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
    }

    public class ForgotPasswordRequest
    {
        public string Email { get; set; } = string.Empty;
    }

    public class ResetPasswordRequest
    {
        public string ResetCode { get; set; } = string.Empty;
        public string NewPassword { get; set; } = string.Empty;
    }
}