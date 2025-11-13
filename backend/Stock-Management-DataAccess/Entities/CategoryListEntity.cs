using System;
using System.Collections.Generic;

namespace Stock_Management_DataAccess.Entities
{
    public class CategoryListEntity
    {
        public string Category { get; set; }
        public string Status { get; set; }
        public DateTime CreatedDate { get; set; }
        public List<string> Specifications { get; set; }
    }
}
