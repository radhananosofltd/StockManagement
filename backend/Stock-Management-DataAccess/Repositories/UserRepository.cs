using Microsoft.EntityFrameworkCore;
using Stock_Management_DataAccess.Entities;
using Stock_Management_DataAccess.Interfaces;

namespace Stock_Management_DataAccess.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly StockManagementDBContext _context;

        public UserRepository(StockManagementDBContext context)
        {
            _context = context;
        }

        public async Task<UserEntity?> GetByIdAsync(int id)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<UserEntity?> GetByUsernameAsync(string username)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Username.ToLower() == username.ToLower());
        }

        public async Task<UserEntity?> GetByEmailAsync(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<UserEntity> CreateAsync(UserEntity user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<UserEntity> UpdateAsync(UserEntity user)
        {
            try
            {
                // Ensure DateTime values have proper UTC kind for PostgreSQL
                if (user.LastLoginAt.HasValue)
                {
                    user.LastLoginAt = DateTime.SpecifyKind(user.LastLoginAt.Value, DateTimeKind.Utc);
                }
                
                if (user.ResetPasswordExpiry.HasValue)
                {
                    user.ResetPasswordExpiry = DateTime.SpecifyKind(user.ResetPasswordExpiry.Value, DateTimeKind.Utc);
                }
                
                user.CreatedAt = DateTime.SpecifyKind(user.CreatedAt, DateTimeKind.Utc);

                // Find the existing entity to update specific properties
                var existingUser = await _context.Users.FindAsync(user.Id);
                if (existingUser == null)
                {
                    throw new InvalidOperationException($"User with ID {user.Id} not found");
                }

                // Update only the properties that might have changed
                existingUser.Username = user.Username;
                existingUser.Email = user.Email;
                existingUser.PasswordHash = user.PasswordHash;
                existingUser.FirstName = user.FirstName;
                existingUser.LastName = user.LastName;
                existingUser.LastLoginAt = user.LastLoginAt;
                existingUser.IsActive = user.IsActive;
                existingUser.ResetPasswordToken = user.ResetPasswordToken;
                existingUser.ResetPasswordExpiry = user.ResetPasswordExpiry;

                await _context.SaveChangesAsync();
                return existingUser;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error updating user: {ex.Message}", ex);
            }
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var user = await GetByIdAsync(id);
            if (user == null)
                return false;

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<UserEntity>> GetAllAsync()
        {
            return await _context.Users.ToListAsync();
        }
    }
}