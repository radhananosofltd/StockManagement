using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Stock_Management_Business.Service;
using Stock_Management_DataAccess.Entities;
using Stock_Management_DataAccess.Interfaces;
using Stock_Management_DataAccess.Repositories;
using System.Text;

namespace StockManagementAPI.Controllers
{
    public class GenerateLabelRequest
    {
        public string LabelType { get; set; }
        public int ContainerNumbers { get; set; }
        public int ItemNumbers { get; set; }
        public string Status { get; set; }
        public int UserId { get; set; }
    }

    [ApiController]
    [Route("api/labels")]
    public class LabelsController : ControllerBase
    {
        private readonly IKeyValueRepository _keyValueRepository;
        private readonly ILabelService _labelService;
        private readonly ILogger<LabelsController> _logger;

        public LabelsController(IKeyValueRepository keyValueRepository, ILabelService labelService, ILogger<LabelsController> logger)
        {
            _keyValueRepository = keyValueRepository;
            _labelService = labelService;
            _logger = logger;
        }

        [HttpPost("generate")]
        public async Task<IActionResult> GenerateLabels([FromBody] GenerateLabelRequest request)
        {
            _logger.LogInformation($"API: Generating labels for type {request.LabelType}, status {request.Status}, user {request.UserId}");
            var labels = new List<LabelEntity>();
            var barcodePairs = new List<(string Id, string Barcode)>();

            if (request.LabelType.ToLower() == "container")
            {
                var latestIds = await _keyValueRepository.GetAllContainerIdsAsync();
                int latestNum = latestIds.Count > 0 ? ParseId(latestIds.Last()) : 0;

                var latestIds1 = await _keyValueRepository.GetAllItemIdsAsync();
                int latestNum1 = latestIds.Count > 0 ? ParseId(latestIds1.Last()) : 0;

                for (int i = 1; i <= request.ContainerNumbers; i++)
                {
                    var newId = $"C{(latestNum + i).ToString("D3")}";
                    var barcode = GenerateBarcode(newId);

                    for (int j = 1; j <= request.ItemNumbers; j++)
                    {
                        var newId1 = $"I{(latestNum1 + j).ToString("D3")}";
                        var barcode1 = GenerateBarcode(newId1);

                        labels.Add(new LabelEntity
                        {
                            container_id = newId,
                            item_id = newId1,
                            Status = GetStatus(request.Status)
                        });
                        barcodePairs.Add((newId1, barcode1));
                    }
                    barcodePairs.Add((newId, barcode));
                }            

            }
            else if (request.LabelType.ToLower() == "item")
            {
                var latestIds = await _keyValueRepository.GetAllItemIdsAsync();
                int latestNum = latestIds.Count > 0 ? ParseId(latestIds.Last()) : 0;
                for (int i = 1; i <= request.ItemNumbers; i++)
                {
                    var newId = $"I{(latestNum + i).ToString("D3")}";
                    var barcode = GenerateBarcode(newId);
                    labels.Add(new LabelEntity
                    {
                        container_id = "",
                        item_id = newId,
                        Status = GetStatus(request.Status)
                    });
                    barcodePairs.Add((newId, barcode));
                }
            }
            await _labelService.SaveLabelsAsync(labels);
            if (request.Status.ToLower() == "generate_and_print")
            {
                var pdfBytes = Helpers.PdfBarcodeGenerator.GenerateBarcodesPdf(barcodePairs);
                return File(pdfBytes, "application/pdf", "barcodes.pdf");
            }
            return Ok(labels);
        }

        private int ParseId(string id)
        {
            // Extract numeric part from ID (e.g., C001 -> 1)
            return int.TryParse(id.Substring(1), out int num) ? num : 0;
        }

        private string GenerateBarcode(string id)
        {
            // Simple barcode generation (replace with real logic as needed)
            return Convert.ToBase64String(Encoding.UTF8.GetBytes($"BARCODE-{id}-{Guid.NewGuid()}"));
        }

        private string GetStatus(string status)
        {
            switch (status.ToLower())
            {
                case "generated": return "generated";
                case "generate and print": return "printed";
                default: return "generated";
            }
        }
    }
}
