using System.Collections.Generic;
using System.Threading.Tasks;
using Stock_Management_DataAccess.Entities;

namespace Stock_Management_DataAccess.Interfaces
{
    public interface IKeyValueRepository
    {
        Task<List<string>> GetAllItemIdsAsync();
        Task<List<string>> GetAllContainerIdsAsync();
    }
}
