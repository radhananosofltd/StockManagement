using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Stock_Management_DataAccess.Entities;
using Stock_Management_DataAccess.Interfaces;

namespace Stock_Management_DataAccess.Repositories
{
    public class SpecificationRepository : ISpecificationRepository
        
    {
        private readonly StockManagementDBContext _context;

        public SpecificationRepository(StockManagementDBContext context)
        {
            _context = context;
        }

        public async Task<int> AddSpecificationAsync(SpecificationEntity entity)
        {
            _context.SpecificationEntity.Add(entity);
            await _context.SaveChangesAsync();
            return entity.SpecificationId;
        }

        public async Task<bool> SpecificationNameExists(string specificationName)
        {
            try
            {
                return await _context.SpecificationEntity
                    .AnyAsync(c => c.SpecificationName == specificationName && c.IsActive);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error checking specification name: {ex.Message}", ex);
            }
        }

        public async Task<List<SpecificationEntity>> GetAllSpecificationsAsync()
        {
           // return await _context.SpecificationEntity.ToListAsync();
            try
            {
                return await _context.SpecificationEntity
                    .Where(b => b.IsActive)
                    .OrderBy(b => b.SpecificationId)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception($"Error retrieving branches: {ex.Message}", ex);
            }
        }

        public async Task<SpecificationEntity?> GetSpecificationByIDAsync(int specificationid)
        {
            return await _context.SpecificationEntity.FirstOrDefaultAsync(s => s.SpecificationId == specificationid && s.IsActive);
        }

        public async Task<bool> UpdateSpecificationAsync(SpecificationEntity entity)
        {
            try
            {
                _context.SpecificationEntity.Update(entity);
                var result = await _context.SaveChangesAsync();
                return result > 0;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error updating specification: {ex.Message}", ex);
            }
        }

    }
}
