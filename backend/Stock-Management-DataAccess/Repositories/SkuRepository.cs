       
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

        public async Task<SpecificationEntity?> GetSpecificationByIDAsync(int specificationId)
        {
            try
            {
                return await _context.Set<SpecificationEntity>().FirstOrDefaultAsync(s => s.SpecificationId == specificationId && s.IsActive);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching Specification by ID.");
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
            try
            {
                if (sku.CreatedDate.Kind != DateTimeKind.Utc)
                    sku.CreatedDate = DateTime.SpecifyKind(sku.CreatedDate, DateTimeKind.Utc);
                if (sku.ModifiedDate.HasValue && sku.ModifiedDate.Value.Kind != DateTimeKind.Utc)
                    sku.ModifiedDate = DateTime.SpecifyKind(sku.ModifiedDate.Value, DateTimeKind.Utc);

                _context.Set<SkuEntity>().Update(sku);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error saving bulk SKUs.");
                throw;
            }
        }
    }
}
