using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Stock_Management_DataAccess.Entities
{
    [Table("company")]
    public class CompanyEntity
    {
        [Key]
        [Column("companyid")]
        public int Id { get; set; }
        
        [Required]
        [MaxLength(50)]
        [Column("companycode")]
        public string CompanyCode { get; set; } = string.Empty;
        
        [Required]
        [MaxLength(255)]
        [Column("companyname")]
        public string CompanyName { get; set; } = string.Empty;
        
        [Required]
        [MaxLength(255)]
        [Column("contactpersonname")]
        public string ContactName { get; set; } = string.Empty;
        
        [Required]
        [MaxLength(255)]
        [Column("contactpersonemail")]
        public string ContactEmail { get; set; } = string.Empty;
        
        [MaxLength(500)]
        [Column("website")]
        public string? Website { get; set; }
        
        [MaxLength(500)]
        [Column("companylogourl")]
        public string? CompanyLogoURL { get; set; }
        
        [MaxLength(50)]
        [Column("pan")]
        public string? PAN { get; set; }
        
        [MaxLength(100)]
        [Column("taxidnumbertype")]
        public string? TaxIDNumberType { get; set; }
        
        [MaxLength(100)]
        [Column("taxidnumber")]
        public string? TaxIDNumber { get; set; }
        
        [Column("companyaddress")]
        public string? CompanyAddress { get; set; }
        
        [Column("countryid")]
        public int? CountryId { get; set; }
        
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
        
    [ForeignKey("CountryId")]
    public virtual CountryEntity? Country { get; set; }
    }
}
