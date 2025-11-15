using Stock_Management_DataAccess.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Stock_Management_DataAccess.Interfaces
{
    public interface ISkuRepository
    {
        Task<int> SaveSkuAsync(SkuEntity sku);
        Task<List<SkuEntity>> GetAllSkusAsync();
        Task<List<SpecificationEntity>> GetAllSpecificationsAsync();
        Task SaveBulkSkusAsync(List<SkuEntity> skus);
        Task<SkuEntity> GetSkuByIdAsync(int skuId);
        Task UpdateSkuAsync(SkuEntity sku);
    }
}