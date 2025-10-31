using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Stock_Management_Business.DTO;
using Stock_Management_Business.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
        public async Task<ActionResult<LoginResponseDTO>> Login([FromBody] LoginRequestDTO loginRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new LoginResponseDTO
                {
                    Success = false,
                    Message = "Invalid input data"
                });
            }

            var result = await _authService.LoginAsync(loginRequest);
            
            if (result.Success)
            {
                return Ok(result);
            }
            
            return Unauthorized(result);
        }

        [HttpPost("signup")]
        public async Task<ActionResult<SignupResponseDTO>> Signup([FromBody] SignupRequestDTO signupRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new SignupResponseDTO
                {
                    Success = false,
                    Message = "Invalid input data"
                });
            }

            var result = await _authService.SignupAsync(signupRequest);
            
            if (result.Success)
            {
                return Ok(result);
            }
            
            return BadRequest(result);
        }

        [HttpPost("forgot-password")]
        public async Task<ActionResult<ForgotPasswordResponseDTO>> ForgotPassword([FromBody] ForgotPasswordRequestDTO forgotPasswordRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ForgotPasswordResponseDTO
                {
                    Success = false,
                    Message = "Invalid input data"
                });
            }

            var result = await _authService.ForgotPasswordAsync(forgotPasswordRequest);
            return Ok(result);
        }

        [HttpPost("reset-password")]
        public async Task<ActionResult<ResetPasswordResponseDTO>> ResetPassword([FromBody] ResetPasswordRequestDTO resetPasswordRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ResetPasswordResponseDTO
                {
                    Success = false,
                    Message = "Invalid input data"
                });
            }

            var result = await _authService.ResetPasswordAsync(resetPasswordRequest);
            
            if (result.Success)
            {
                return Ok(result);
            }
            
            return BadRequest(result);
        }

        [HttpGet("user/{id}")]
        [Authorize]
        public async Task<ActionResult<UserDTO>> GetUser(int id)
        {
            var user = await _authService.GetUserByIdAsync(id);
            
            if (user == null)
            {
                return NotFound("User not found");
            }
            
            return Ok(user);
        }

        [HttpPost("logout")]
        [Authorize]
        public ActionResult Logout()
        {
            // For JWT tokens, logout is typically handled client-side by removing the token
            // Here we can perform any server-side cleanup if needed
            return Ok(new { Success = true, Message = "Logged out successfully" });
        }
    }
}