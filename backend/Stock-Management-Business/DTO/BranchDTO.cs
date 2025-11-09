using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Stock_Management_Business.DTO
{
    public class BranchDTO
    {
        public int BranchId { get; set; }
        public string BranchCode { get; set; } = string.Empty;
        public string BranchName { get; set; } = string.Empty;
        public bool HeadOffice { get; set; }
        public string ContactPersonName { get; set; } = string.Empty;
        public string ContactPersonEmail { get; set; } = string.Empty;
        public string? Website { get; set; }
        public string? PAN { get; set; }
        public string? TaxIdentificationNumberType { get; set; }
        public string? TaxIdentificationNumber { get; set; }
        public string? BranchAddress { get; set; }
        public int? BranchCountryId { get; set; }
        public int? CompanyId { get; set; }
        public int? HeadOfficeBranchId { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public int? ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public bool IsActive { get; set; } = true;
    }
    
    public class CreateBranchDTO
    {
        [Required(ErrorMessage = "Branch Code is required")]
        [StringLength(20, ErrorMessage = "Branch Code cannot exceed 20 characters")]
        public string BranchCode { get; set; } = string.Empty;
        
        [Required(ErrorMessage = "Branch Name is required")]
        [StringLength(200, ErrorMessage = "Branch Name cannot exceed 200 characters")]
        public string BranchName { get; set; } = string.Empty;
        
    public bool HeadOffice { get; set; }
        
        [Required(ErrorMessage = "Contact Person Name is required")]
        [StringLength(100, ErrorMessage = "Contact Person Name cannot exceed 100 characters")]
        public string ContactPersonName { get; set; } = string.Empty;
        
        [Required(ErrorMessage = "Contact Email is required")]
        [EmailAddress(ErrorMessage = "Please enter a valid email address")]
        [StringLength(100, ErrorMessage = "Contact Email cannot exceed 100 characters")]
        public string ContactPersonEmail { get; set; } = string.Empty;
        
        [Url(ErrorMessage = "Please enter a valid website URL")]
        [StringLength(100, ErrorMessage = "Website URL cannot exceed 100 characters")]
        public string? Website { get; set; }
        
        [StringLength(20, ErrorMessage = "PAN cannot exceed 20 characters")]
        public string? PAN { get; set; }
        
        [StringLength(500, ErrorMessage = "Tax ID Number Type cannot exceed 500 characters")]
        public string? TaxIdentificationNumberType { get; set; }
        
        [StringLength(50, ErrorMessage = "Tax ID Number cannot exceed 50 characters")]
        public string? TaxIdentificationNumber { get; set; }
        
        [StringLength(1000, ErrorMessage = "Branch Address cannot exceed 1000 characters")]
        public string? BranchAddress { get; set; }
        
        public int? BranchCountryId { get; set; }
        
        public int? CompanyId { get; set; }
        
        public int? HeadOfficeBranchId { get; set; }
        
        [Required(ErrorMessage = "User ID is required")]
        public int UserId { get; set; }
        
        public bool IsActive { get; set; } = true;
    }
    
    public class BranchListDTO
    {
        public int BranchId { get; set; }
        public string BranchCode { get; set; } = string.Empty;
        public string BranchName { get; set; } = string.Empty;
        public bool HeadOffice { get; set; }
        public string ContactPersonName { get; set; } = string.Empty;
        public string ContactPersonEmail { get; set; } = string.Empty;
        public string? BranchAddress { get; set; }
        public int? BranchCountryId { get; set; }
        public DateTime CreatedDate { get; set; }
        public bool IsActive { get; set; }
    }
    
    public class BulkImportBranchResultDTO
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
        public int TotalRecords { get; set; }
        public int SuccessfulRecords { get; set; }
        public int FailedRecords { get; set; }
        public List<string>? Errors { get; set; }
    }
}