using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Stock_Management_DataAccess.Entities
{
    [Table("branch")]
    public class BranchEntity
    {
    [Key]
    [Column("branchid")]
    public int BranchId { get; set; }
        
    [Required]
    [MaxLength(20)]
    [Column("branchcode")]
    public string BranchCode { get; set; } = string.Empty;
        
    [Required]
    [MaxLength(200)]
    [Column("branchname")]
    public string BranchName { get; set; } = string.Empty;
        
    [MaxLength(1000)]
    [Column("branchaddress")]
    public string? BranchAddress { get; set; }
        
    [Column("branchcountryid")]
    public int? BranchCountryId { get; set; }
        
    [Column("companyid")]
    public int? CompanyID { get; set; }
        
    [MaxLength(100)]
    [Column("website")]
    public string? Website { get; set; }
        
    [Required]
    [MaxLength(100)]
    [Column("contactpersonname")]
    public string ContactPersonName { get; set; } = string.Empty;
        
    [Required]
    [MaxLength(100)]
    [Column("contactpersonemail")]
    public string ContactPersonEmail { get; set; } = string.Empty;
        
    [Column("headoffice")]
    public bool HeadOffice { get; set; }
        
    [Column("headofficebranchid")]
    public int? HeadOfficeBranchId { get; set; }
        
    [MaxLength(20)]
    [Column("pan")]
    public string? PAN { get; set; }
        
    [MaxLength(500)]
    [Column("taxidentificationnumbertype")]
    public string? TaxIdentificationNumberType { get; set; }
        
    [MaxLength(50)]
    [Column("taxidentificationnumber")]
    public string? TaxIdentificationNumber { get; set; }
        
    [MaxLength(15)]
    [Column("phone")]
    public string? Phone { get; set; }
        
    [Required]
    [Column("created_by")]
    public int CreatedBy { get; set; }
        
    [Required]
    [Column("created_date")]
    public DateTime CreatedDate { get; set; } = DateTime.SpecifyKind(DateTime.UtcNow, DateTimeKind.Utc);
        
    [Column("modified_by")]
    public int? ModifiedBy { get; set; }
        
    [Column("modified_date")]
    public DateTime? ModifiedDate { get; set; }
        
    [Required]
    [Column("is_active")]
    public bool IsActive { get; set; } = true;
        
    // Navigation properties
    [ForeignKey("CreatedBy")]
    public virtual UserEntity? CreatedByUser { get; set; }
        
    [ForeignKey("ModifiedBy")]
    public virtual UserEntity? ModifiedByUser { get; set; }
        
    [ForeignKey("BranchCountryId")]
    public virtual CountryEntity? BranchCountry { get; set; }
        
    [ForeignKey("CompanyID")]
    public virtual CompanyEntity? Company { get; set; }
        
    [ForeignKey("HeadOfficeBranchId")]
    public virtual BranchEntity? HeadOfficeBranch { get; set; }
    }
}