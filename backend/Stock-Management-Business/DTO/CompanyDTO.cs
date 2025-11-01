using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Stock_Management_Business.DTO
{
    public class CompanyDTO
    {
        public int Id { get; set; }
        public string CustomerCode { get; set; } = string.Empty;
        public string CustomerName { get; set; } = string.Empty;
        public string? CustomerAddress { get; set; }
        public string Currency { get; set; } = "USD";
        public int CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public int? ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public bool IsActive { get; set; } = true;
    }
    
    public class CreateCompanyDTO
    {
        public string CustomerCode { get; set; } = string.Empty;
        public string CustomerName { get; set; } = string.Empty;
        public string? CustomerAddress { get; set; }
        public string Currency { get; set; } = "USD";
    }
    
    public class CompanyListDTO
    {
        public int Id { get; set; }
        public string CustomerCode { get; set; } = string.Empty;
        public string CustomerName { get; set; } = string.Empty;
        public string? CustomerAddress { get; set; }
        public string Currency { get; set; } = "USD";
        public DateTime CreatedDate { get; set; }
        public bool IsActive { get; set; }
    }
}
