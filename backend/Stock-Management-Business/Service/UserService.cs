using System.Threading.Tasks;
using Stock_Management_Business.Interface;
using Stock_Management_DataAccess.Entities;
using Stock_Management_DataAccess.Interfaces;

namespace Stock_Management_Business.Service
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<UserEntity?> UpdateUserAsync(UserEntity user)
        {
            return await _userRepository.UpdateAsync(user);
        }
    }
}
