using Microsoft.EntityFrameworkCore;
using Stock_Management_DataAccess.Entities;
using Stock_Management_DataAccess.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Stock_Management_DataAccess.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly StockManagementDBContext _context;

        public UserRepository(StockManagementDBContext context)
        {
            _context = context;
        }

        public async Task<UserEntity> GetUserByUsernameAsync(string username)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Username == username && u.IsActive);
        }

        public async Task<UserEntity> GetUserByEmailAsync(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == email && u.IsActive);
        }

        public async Task<UserEntity> GetUserByIdAsync(int userId)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.UserId == userId && u.IsActive);
        }

        public async Task<UserEntity> CreateUserAsync(UserEntity user)
        {
            user.CreatedDate = DateTime.UtcNow;
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<UserEntity> UpdateUserAsync(UserEntity user)
        {
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<bool> DeleteUserAsync(int userId)
        {
            var user = await GetUserByIdAsync(userId);
            if (user != null)
            {
                user.IsActive = false;
                await UpdateUserAsync(user);
                return true;
            }
            return false;
        }

        public async Task<UserEntity> GetUserByResetTokenAsync(string token)
        {
            return await _context.Users.FirstOrDefaultAsync(u => 
                u.ResetPasswordToken == token && 
                u.ResetPasswordExpiry > DateTime.UtcNow && 
                u.IsActive);
        }

        public async Task<bool> UserExistsAsync(string username, string email)
        {
            return await _context.Users.AnyAsync(u => 
                (u.Username == username || u.Email == email) && u.IsActive);
        }
    }
}