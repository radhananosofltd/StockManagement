using Stock_Management_Business.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Stock_Management_Business.Interface
{
    public interface ISkuService
        
    {
        Task<int> SaveSkuAsync(SaveSkuRequestDTO request);
        Task<List<SkuListDTO>> GetAllSkusAsync();
        Task SaveBulkSkusAsync(List<SaveSkuRequestDTO> requests);
        Task<bool> DeactivateSkuAsync(int skuId, int userId);
        Task<bool> UpdateSkuAsync(UpdateSkuRequest request);
    }
}