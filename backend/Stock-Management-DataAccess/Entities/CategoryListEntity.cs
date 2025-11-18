using System;
using System.Collections.Generic;

namespace Stock_Management_DataAccess.Entities
{
    public class CategoryListEntity
    {
        public int CategoryId { get; set; }
        public string Category { get; set; }
        public string Status { get; set; }
        public DateTime CreatedDate { get; set; }
        public List<SpecificationWithOrderDTO> Specifications { get; set; }
    }
}
