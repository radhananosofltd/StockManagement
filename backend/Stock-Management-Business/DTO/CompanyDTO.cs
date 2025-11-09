using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace Stock_Management_Business.DTO
{
    public class CompanyDTO
    {
        public int Id { get; set; }
        public string CompanyCode { get; set; } = string.Empty;
        public string CompanyName { get; set; } = string.Empty;
        public string ContactName { get; set; } = string.Empty;
        public string ContactEmail { get; set; } = string.Empty;
        public string? Website { get; set; }
        public string? CompanyLogoURL { get; set; }
        public string? PAN { get; set; }
        public string? TaxIDNumberType { get; set; }
        public string? TaxIDNumber { get; set; }
        public string? CompanyAddress { get; set; }
        public int? CountryId { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public int? ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public bool IsActive { get; set; } = true;
    }
    
    public class CreateCompanyDTO
    {
        [Required(ErrorMessage = "Company Code is required")]
        [StringLength(50, ErrorMessage = "Company Code cannot exceed 50 characters")]
        public string CompanyCode { get; set; } = string.Empty;
        
        [Required(ErrorMessage = "Company Name is required")]
        [StringLength(255, ErrorMessage = "Company Name cannot exceed 255 characters")]
        public string CompanyName { get; set; } = string.Empty;
        
        [Required(ErrorMessage = "Contact Name is required")]
        [StringLength(255, ErrorMessage = "Contact Name cannot exceed 255 characters")]
        public string ContactName { get; set; } = string.Empty;
        
        [Required(ErrorMessage = "Contact Email is required")]
        [EmailAddress(ErrorMessage = "Please enter a valid email address")]
        [StringLength(255, ErrorMessage = "Contact Email cannot exceed 255 characters")]
        public string ContactEmail { get; set; } = string.Empty;
        
        [Url(ErrorMessage = "Please enter a valid website URL")]
        [StringLength(500, ErrorMessage = "Website URL cannot exceed 500 characters")]
        public string? Website { get; set; }
        
      // [Url(ErrorMessage = "Please enter a valid logo URL")]
        [StringLength(500, ErrorMessage = "Company Logo URL cannot exceed 500 characters")]
        public string? CompanyLogoURL { get; set; }
        
        [StringLength(50, ErrorMessage = "PAN cannot exceed 50 characters")]
        public string? PAN { get; set; }
        
        [StringLength(100, ErrorMessage = "Tax ID Number Type cannot exceed 100 characters")]
        public string? TaxIDNumberType { get; set; }
        
        [StringLength(100, ErrorMessage = "Tax ID Number cannot exceed 100 characters")]
        public string? TaxIDNumber { get; set; }
        
        public string? CompanyAddress { get; set; }
        
        public int? CountryId { get; set; }
        
        [Required(ErrorMessage = "User ID is required")]
        public int UserId { get; set; }
        
        public bool IsActive { get; set; } = true;
    }
    
    public class CompanyListDTO
    {
        public int Id { get; set; }
        public string CompanyCode { get; set; } = string.Empty;
        public string CompanyName { get; set; } = string.Empty;
        public string ContactName { get; set; } = string.Empty;
        public string ContactEmail { get; set; } = string.Empty;
        public string? Website { get; set; }
        public string? CompanyAddress { get; set; }
        public int? CountryId { get; set; }
        public DateTime CreatedDate { get; set; }
        public bool IsActive { get; set; }
    }
    
    public class BulkImportResultDTO
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
        public int TotalRecords { get; set; }
        public int SuccessfulRecords { get; set; }
        public int FailedRecords { get; set; }
        public List<string>? Errors { get; set; }
    }
}
