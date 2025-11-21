using System.Threading.Tasks;
using Stock_Management_DataAccess.Entities;

namespace Stock_Management_Business.Interface
{
    public interface IUserService
    {
        Task<UserEntity?> UpdateUserAsync(UserEntity user);
    }
}
