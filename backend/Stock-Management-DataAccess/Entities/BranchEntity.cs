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
    public long BranchId { get; set; }

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
    public string BranchAddress { get; set; } = string.Empty;

    [Column("branchcountryid")]
    public int BranchCountryId { get; set; }

    [MaxLength(100)]
    [Column("city")]
    public string City { get; set; } = string.Empty;

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
    public long? HeadOfficeBranchId { get; set; }

    [MaxLength(100)]
    [Column("state")]
    public string State { get; set; } = string.Empty;

    [MaxLength(50)]
    [Column("postalcode")]
    public string Postalcode { get; set; } = string.Empty;


    [Required]
    [Column("created_by")]
    public int CreatedBy { get; set; }

    [Required]
    [Column("created_date")]
    public DateTime CreatedDate { get; set; } = DateTime.SpecifyKind(DateTime.UtcNow, DateTimeKind.Utc);


    [Required]
    [Column("modified_by")]
    public int ModifiedBy { get; set; }

    [Column("modified_date")]
    public DateTime ModifiedDate { get; set; }

    [Required]
    [Column("is_active")]
    public bool IsActive { get; set; } = true;

    [Required]
    [Column("companyid")]
    public int CompanyId { get; set; }

    [MaxLength(15)]
    [Column("phone")]
    public string Phone { get; set; } = string.Empty;

    // Navigation properties
    [ForeignKey("CreatedBy")]
    public virtual UserEntity? CreatedByUser { get; set; }

    [ForeignKey("ModifiedBy")]
    public virtual UserEntity? ModifiedByUser { get; set; }

    [ForeignKey("BranchCountryId")]
    public virtual CountryEntity? BranchCountry { get; set; }

    [ForeignKey("CompanyId")]
    public virtual CompanyEntity? Company { get; set; }

    [ForeignKey("HeadOfficeBranchId")]
    public virtual BranchEntity? HeadOfficeBranch { get; set; }
    }
}