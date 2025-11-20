using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Stock_Management_DataAccess.Entities;
using Stock_Management_DataAccess.Interfaces;
using Stock_Management_Business.DTO;
using Stock_Management_Business.Interface;

namespace Stock_Management_Business.Service
{
    public interface ILabelService
       
    {
        Task SaveLabelsAsync(List<LabelEntity> labels);
        List<LabelDTO> GetAllLabels();
        Task<bool> UpdateLabelStatusAsync(int id, int isActive);
        LabelDTO GetLabelById(int id);
        Task<bool> UpdateLabelStatusTextAsync(int id, string status);
        List<LabelDTO> GetDistinctActiveContainers();
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

        public LabelDTO GetLabelById(int id)      
        {
            var entity = _labelRepository.GetLabelById(id);
            if (entity == null) return null;
            return new LabelDTO
            {
                Id = entity.Id,
                ItemId = entity.item_id,
                ContainerId = entity.container_id,
                Status = entity.Status,
                LabelType = string.IsNullOrEmpty(entity.container_id) ? "Item" : "Container"
            };
        }
        public async Task<bool> UpdateLabelStatusAsync(int id, int isActive)
        {
            return await _labelRepository.UpdateLabelStatusAsync(id, isActive);
        }

        public async Task SaveLabelsAsync(List<LabelEntity> labels)
        {
            _logger.LogInformation($"Business: Saving {labels.Count} labels.");
            await _labelRepository.SaveLabelsAsync(labels);
        }

        public List<LabelDTO> GetAllLabels()
        {
            var entities = _labelRepository.GetAllLabels();
            return entities.Select(e => new LabelDTO
            {
                Id =e.Id,
                ItemId = e.item_id,
                ContainerId = e.container_id,
                Status = e.Status,
                LabelType = string.IsNullOrEmpty(e.container_id) ? "Item" : "Container"
            }).ToList();
        }

        public async Task<bool> UpdateLabelStatusTextAsync(int id, string status)
        {
            return await _labelRepository.UpdateLabelStatusTextAsync(id, status);
        }

        // Service method for distinct active containers
        public List<LabelDTO> GetDistinctActiveContainers()
        {
            var entities = _labelRepository.GetDistinctActiveContainers();
            return entities.Select(e => new LabelDTO
            {
                ContainerId = e.container_id,
                ItemId = e.item_id,
                Status = e.Status
            }).ToList();
        }
    }
}
