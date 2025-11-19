using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Stock_Management_Business.Service;

namespace StockManagementAPI.Controllers
{
    [ApiController]
    [Route("api/keyvalues")]
    public class KeyValuesController : ControllerBase
            
    {
        private readonly IKeyValueService _keyValueService;
        private readonly ILogger<KeyValuesController> _logger;

        public KeyValuesController(IKeyValueService keyValueService, ILogger<KeyValuesController> logger)
        {
            _keyValueService = keyValueService;
            _logger = logger;
        }

        [HttpGet("item-ids")]
        public async Task<IActionResult> GetAllItemIds()
        {
            _logger.LogInformation("API: Fetching all item_ids from keyvalues.");
            var itemIds = await _keyValueService.GetAllItemIdsAsync();
            return Ok(itemIds);
        }

        [HttpGet("container-ids")]
            public async Task<IActionResult> GetAllContainerIds()
            {
                _logger.LogInformation("API: Fetching all container_ids from keyvalues.");
                var containerIds = await _keyValueService.GetAllContainerIdsAsync();
                return Ok(containerIds);
            }
    }
}
