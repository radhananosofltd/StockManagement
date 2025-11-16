using System.Collections.Generic;
using System.Threading.Tasks;
using Stock_Management_DataAccess.Entities;

namespace Stock_Management_DataAccess.Interfaces
{
    public interface ILabelRepository
    {
        Task SaveLabelsAsync(List<LabelEntity> labels);
    }
}
