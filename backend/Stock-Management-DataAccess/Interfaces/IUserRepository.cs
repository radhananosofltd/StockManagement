using Stock_Management_DataAccess.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Stock_Management_DataAccess.Interfaces
{
    public interface IUserRepository
    {
        Task<UserEntity> GetUserByUsernameAsync(string username);
        Task<UserEntity> GetUserByEmailAsync(string email);
        Task<UserEntity> GetUserByIdAsync(int userId);
        Task<UserEntity> CreateUserAsync(UserEntity user);
        Task<UserEntity> UpdateUserAsync(UserEntity user);
        Task<bool> DeleteUserAsync(int userId);
        Task<UserEntity> GetUserByResetTokenAsync(string token);
        Task<bool> UserExistsAsync(string username, string email);
    }
}