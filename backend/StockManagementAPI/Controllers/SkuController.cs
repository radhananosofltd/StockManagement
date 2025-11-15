using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Stock_Management_Business.DTO;
using Stock_Management_Business.Interface;
using System;


namespace YourNamespace.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SkuController : ControllerBase            
           
    {
        private readonly ISkuService _skuService;
        private readonly ILogger<SkuController> _logger;
        public SkuController(ISkuService skuService, ILogger<SkuController> logger)
        {
            _skuService = skuService;
            _logger = logger;
        }

 [HttpPost("update")]
            public async Task<IActionResult> UpdateSku([FromBody] UpdateSkuRequest request)
            {
                if (request == null || request.SkuId <= 0)
                    return BadRequest("Invalid request.");
                var result = await _skuService.UpdateSkuAsync(request);
                if (result)
                    return Ok(new { Success = true });
                return BadRequest("Failed to update SKU.");
            }
            
        [HttpPost]
        public async Task<IActionResult> SaveSku([FromBody] SaveSkuRequestDTO request)
        {
            if (request == null)
                return BadRequest("Request cannot be null.");
            var skuId = await _skuService.SaveSkuAsync(request);
            return Ok(new { SkuId = skuId });
        }

        [HttpPost("bulk-import")]
        public async Task<IActionResult> SaveBulkSkus([FromBody] List<SaveSkuRequestDTO> requests)
        {
            if (requests == null || requests.Count == 0)
                return BadRequest("No SKUs to save.");
            await _skuService.SaveBulkSkusAsync(requests);
            return Ok(new { Success = true, Count = requests.Count });
        }

        [HttpGet]
        public async Task<IActionResult> GetAllSkus()
        {
            var skus = await _skuService.GetAllSkusAsync();
            return Ok(skus);
        }

        [HttpPost("deactivate")]
        public async Task<IActionResult> DeactivateSku([FromBody] DeactivateSkuRequest request)
        {
            if (request == null || request.SkuId <= 0 || request.UserId <= 0)
                return BadRequest("Invalid request.");
            var result = await _skuService.DeactivateSkuAsync(request.SkuId, request.UserId);
            if (result)
                return Ok(new { Success = true });
            return BadRequest("Failed to deactivate SKU.");
        }
    }
}