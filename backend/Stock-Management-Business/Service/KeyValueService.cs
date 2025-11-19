using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Stock_Management_DataAccess.Interfaces;

namespace Stock_Management_Business.Service
{
    public interface IKeyValueService
    {
        Task<List<string>> GetAllItemIdsAsync();
        Task<List<string>> GetAllContainerIdsAsync();
    }

    public class KeyValueService : IKeyValueService          
    {
        private readonly IKeyValueRepository _keyValueRepository;
        private readonly ILogger<KeyValueService> _logger;

        public KeyValueService(IKeyValueRepository keyValueRepository, ILogger<KeyValueService> logger)
        {
            _keyValueRepository = keyValueRepository;
            _logger = logger;
        }

        public async Task<List<string>> GetAllItemIdsAsync()
        {
            _logger.LogInformation("Business: Fetching all item_ids from keyvalues.");
            return await _keyValueRepository.GetAllItemIdsAsync();
        }

          public async Task<List<string>> GetAllContainerIdsAsync()
            {
                _logger.LogInformation("Business: Fetching all container_ids from keyvalues.");
                return await _keyValueRepository.GetAllContainerIdsAsync();
            }
    }
}
