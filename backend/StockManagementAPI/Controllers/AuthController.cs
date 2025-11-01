using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Stock_Management_Business.Interface;
using Stock_Management_Business.DTO;
using System.Security.Claims;

namespace StockManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            try
            {
                var result = await _authService.LoginAsync(request.Username, request.Password);
                
                if (result.Success)
                {
                    return Ok(new
                    {
                        success = true,
                        message = "Login successful",
                        token = result.Token,
                        user = result.User
                    });
                }
                
                return BadRequest(new
                {
                    success = false,
                    message = "Invalid user credentials. Please check your username and password."
                });
            }
            catch (Exception ex)
            {
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
                var result = await _authService.SignupAsync(request.Username, request.Email, request.Password, request.FirstName, request.LastName);
                
                if (result.Success)
                {
                    return Ok(new
                    {
                        success = true,
                        message = "Account created successfully",
                        user = result.User
                    });
                }
                
                return BadRequest(new
                {
                    success = false,
                    message = result.Message
                });
            }
            catch (Exception ex)
            {
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
                var result = await _authService.ForgotPasswordAsync(request.Email);
                
                return Ok(new
                {
                    success = result.Success,
                    message = result.Message
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    success = false,
                    message = "An error occurred while processing your request"
                });
            }
        }

        [HttpGet("profile")]
        [Authorize]
        public async Task<IActionResult> GetProfile()
        {
            try
            {
                var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
                if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
                {
                    return Unauthorized();
                }

                var userProfile = await _authService.GetUserProfileAsync(userId);
                
                if (userProfile != null)
                {
                    return Ok(userProfile);
                }
                
                return NotFound(new
                {
                    success = false,
                    message = "User profile not found"
                });
            }
            catch (Exception ex)
            {
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
}