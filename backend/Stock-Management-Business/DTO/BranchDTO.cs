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
    public long BranchId { get; set; }
    public string BranchCode { get; set; } = string.Empty;
    public string BranchName { get; set; } = string.Empty;
    public string BranchAddress { get; set; } = string.Empty;
    public long BranchCountryId { get; set; }
    public string City { get; set; } = string.Empty;
    public string ContactPersonName { get; set; } = string.Empty;
    public string ContactPersonEmail { get; set; } = string.Empty;
    public bool HeadOffice { get; set; }
    public long? HeadOfficeBranchId { get; set; }
    public string State { get; set; } = string.Empty;
    public string TaxIdentificationNumberType { get; set; } = string.Empty;
    public string TaxIdentificationNumber { get; set; } = string.Empty;
    public string Postalcode { get; set; } = string.Empty;
    public long CreatedBy { get; set; }
    public DateTime CreatedDate { get; set; }
    public long ModifiedBy { get; set; }
    public DateTime ModifiedDate { get; set; }
    public bool IsActive { get; set; } = true;
    public long CompanyId { get; set; }
    public string Phone { get; set; } = string.Empty;
    public string Website { get; set; } = string.Empty;
    public string PAN { get; set; } = string.Empty;
    }
    
    public class CreateBranchDTO
    {
        [Required]
        [StringLength(20)]
        public string BranchCode { get; set; } = string.Empty;

        [Required]
        [StringLength(200)]
        public string BranchName { get; set; } = string.Empty;

        [Required]
        [StringLength(1000)]
        public string BranchAddress { get; set; } = string.Empty;

        [Required]
        public int BranchCountryId { get; set; }

        [StringLength(100)]
        public string City { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string ContactPersonName { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string ContactPersonEmail { get; set; } = string.Empty;

        public bool HeadOffice { get; set; }

        public long? HeadOfficeBranchId { get; set; }

        [StringLength(100)]
        public string State { get; set; } = string.Empty;

        [StringLength(50)]
        public string postalCode { get; set; } = string.Empty;

        [Required]
        public int CompanyId { get; set; }

        [Required]
        public int UserId { get; set; }

        public bool IsActive { get; set; } = true;

        [StringLength(15)]
        public string Phone { get; set; } = string.Empty;

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
    public string? Phone { get; set; }
    public string? CompanyName { get; set; }
    public string? CountryName { get; set; }
    public int countryid { get; set; }
    public string city { get; set; }
    public string state { get; set; }
    public string Postalcode { get; set; }
        public int companyid { get; set; }
        public int headofficebranchid { get; set; }
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