using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Stock_Management_DataAccess.Entities;
using Stock_Management_DataAccess.Interfaces;

namespace Stock_Management_Business.Service
{
    public interface ILabelService
    {
        Task SaveLabelsAsync(List<LabelEntity> labels);
    }

    public class LabelService : ILabelService
    {
        private readonly ILabelRepository _labelRepository;
        private readonly ILogger<LabelService> _logger;

        public LabelService(ILabelRepository labelRepository, ILogger<LabelService> logger)
        {
            _labelRepository = labelRepository;
            _logger = logger;
        }

        public async Task SaveLabelsAsync(List<LabelEntity> labels)
        {
            _logger.LogInformation($"Business: Saving {labels.Count} labels.");
            await _labelRepository.SaveLabelsAsync(labels);
        }
    }
}
