using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Stock_Management_DataAccess.Entities;
using Stock_Management_DataAccess.Interfaces;

namespace Stock_Management_DataAccess.Repositories
{
    public class KeyValueRepository : IKeyValueRepository            
    {
        private readonly StockManagementDBContext _context;
        private readonly ILogger<KeyValueRepository> _logger;

        public KeyValueRepository(StockManagementDBContext context, ILogger<KeyValueRepository> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<List<string>> GetAllItemIdsAsync()
        {
            _logger.LogInformation("Fetching all item_ids from keyvalues table.");
            return await _context.KeyValues
                .Select(kv => kv.ItemId)
                .ToListAsync();
        }
        public async Task<List<string>> GetAllContainerIdsAsync()
            {
                _logger.LogInformation("Fetching all container_ids from keyvalues table.");
                return await _context.KeyValues
                    .Select(kv => kv.ContainerId)
                    .ToListAsync();
            }
    }
}
