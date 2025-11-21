using Microsoft.AspNetCore.Mvc;
using Stock_Management_Business.Interface;
using Stock_Management_Business.DTO;
using Stock_Management_DataAccess.Entities;
using System.Threading.Tasks;

namespace StockManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPut("update")]
        public async Task<IActionResult> UpdateUser([FromBody] UserEntity user)
        {
            if (user == null || user.Id == 0)
                return BadRequest("Invalid user data");

            var updatedUser = await _userService.UpdateUserAsync(user);
            if (updatedUser == null)
                return NotFound("User not found");

            return Ok(updatedUser);
        }
    }
}
