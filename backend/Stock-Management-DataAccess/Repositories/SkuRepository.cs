       
using Stock_Management_DataAccess.Entities;
using Stock_Management_DataAccess.Interfaces;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Stock_Management_DataAccess.Repositories
{
    public class SkuRepository : ISkuRepository           
    {
        private readonly StockManagementDBContext _context;
        private readonly ILogger<SkuRepository> _logger;
        public SkuRepository(StockManagementDBContext context, ILogger<SkuRepository> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<int> SaveSkuAsync(SkuEntity sku)
        {
            try
            {
                _context.Set<SkuEntity>().Add(sku);
                await _context.SaveChangesAsync();
                _logger.LogInformation("SKU saved successfully. SkuId: {SkuId}", sku.SkuId);
                return sku.SkuId;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error saving SKU.");
                throw;
            }
        }

        public async Task<List<SkuEntity>> GetAllSkusAsync()
        {
            try
            {
                return await _context.Set<SkuEntity>().ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching SKUs.");
                throw;
            }
        }

        public async Task<List<SpecificationEntity>> GetAllSpecificationsAsync()
        {
            try
            {
                return await _context.Set<SpecificationEntity>().ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching Specifications.");
                throw;
            }
        }

        public async Task SaveBulkSkusAsync(List<SkuEntity> skus)
        {
            try
            {
                _context.Set<SkuEntity>().AddRange(skus);
                await _context.SaveChangesAsync();
                _logger.LogInformation("Bulk SKUs saved. Count: {Count}", skus.Count);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error saving bulk SKUs.");
                throw;
            }
        }

        public async Task<SkuEntity> GetSkuByIdAsync(int skuId)
        {
            return await _context.Set<SkuEntity>().FirstOrDefaultAsync(s => s.SkuId == skuId);
        }

        public async Task UpdateSkuAsync(SkuEntity sku)
        {
            _context.Set<SkuEntity>().Update(sku);
            await _context.SaveChangesAsync();
        }
    }
}
