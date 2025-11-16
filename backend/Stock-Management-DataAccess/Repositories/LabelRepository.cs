using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using Stock_Management_DataAccess.Entities;
using Stock_Management_DataAccess.Interfaces;

namespace Stock_Management_DataAccess.Repositories
{
    public class LabelRepository : ILabelRepository  
    {
        private readonly StockManagementDBContext _context;
        private readonly ILogger<LabelRepository> _logger;

        public LabelRepository(StockManagementDBContext context, ILogger<LabelRepository> logger)
        {
            _context = context;
            _logger = logger;
        }

        public LabelEntity GetLabelById(int id)
        {
            return _context.Lables.FirstOrDefault(l => l.Id == id);
        }

        public async Task<bool> UpdateLabelStatusAsync(int id, int isActive)
        {
            var label = await _context.Lables.FindAsync(id);
            if (label == null)
                return false;
            // Add is_active property if not present
            var prop = label.GetType().GetProperty("is_active");
            if (prop != null)
            {
                prop.SetValue(label, isActive);
                await _context.SaveChangesAsync();
                return true;
            }
            // Fallback: update status to 'Inactive' if is_active not present
            label.Status = isActive == 0 ? "Inactive" : label.Status;
            await _context.SaveChangesAsync();
            return true;
        }
        public async Task SaveLabelsAsync(List<LabelEntity> labels)
        {
            try
            {
                _logger.LogInformation($"Saving {labels.Count} labels to Lables table.");
                await _context.Lables.AddRangeAsync(labels);
                await _context.SaveChangesAsync();

                // Update last container_id in keyvalues table
                if (labels != null && labels.Count > 0)
                {
                    var lastContainerId = labels[labels.Count - 1].container_id;
                    var lastItemId = labels[labels.Count-1].item_id;
                    var lastKeyValue = await _context.KeyValues.OrderByDescending(kv => kv.Id).FirstOrDefaultAsync();
                    if (lastKeyValue != null)
                    {
                        lastKeyValue.ContainerId = lastContainerId;
                        lastKeyValue.ItemId = lastItemId;
                        await _context.SaveChangesAsync();
                        _logger.LogInformation($"Updated last container_id in keyvalues table to: {lastContainerId}");
                    }
                }
            }
            catch(Exception ex)
            {
                _logger.LogInformation(ex.Message.ToString());
            }
        }
        public List<LabelEntity> GetAllLabels()
        {
            return _context.Lables.ToList();
        }

        public async Task<bool> UpdateLabelStatusTextAsync(int id, string status)
        {
            var label = await _context.Lables.FindAsync(id);
            if (label == null)
                return false;
            label.Status = status;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
