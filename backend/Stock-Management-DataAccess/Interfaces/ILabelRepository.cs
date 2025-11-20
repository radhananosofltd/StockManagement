using System.Collections.Generic;
using System.Threading.Tasks;
using Stock_Management_DataAccess.Entities;

namespace Stock_Management_DataAccess.Interfaces
{
    public interface ILabelRepository
    {
        Task SaveLabelsAsync(List<LabelEntity> labels);
        List<LabelEntity> GetAllLabels();
        Task<bool> UpdateLabelStatusAsync(int id, int isActive);
        LabelEntity GetLabelById(int id);
        Task<bool> UpdateLabelStatusTextAsync(int id, string status);
        List<LabelEntity> GetDistinctActiveContainers();
    }
}
