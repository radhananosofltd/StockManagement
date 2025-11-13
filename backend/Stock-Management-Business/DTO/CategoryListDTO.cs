using System;
using System.Collections.Generic;

namespace Stock_Management_Business.DTO
{
    public class CategoryListDTO
    {
        public string Category { get; set; }
        public string Status { get; set; }
        public DateTime CreatedDate { get; set; }
        public List<string> Specifications { get; set; }
    }
}
