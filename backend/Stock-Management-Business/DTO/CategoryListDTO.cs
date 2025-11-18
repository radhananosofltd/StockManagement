using System;
using System.Collections.Generic;

namespace Stock_Management_Business.DTO
{
    public class CategoryListDTO
    {
        public int CategoryId { get; set; }
        public string Category { get; set; }
        public string Status { get; set; }
        public DateTime CreatedDate { get; set; }
        public List<Stock_Management_DataAccess.Entities.SpecificationWithOrderDTO> Specifications { get; set; }
    }
}
