using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Stock_Management_DataAccess.Entities
{
    [Table("Companies")]
    public class CompanyEntity
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }
        
        [Required]
        [MaxLength(50)]
        [Column("CustomerCode")]
        public string CustomerCode { get; set; } = string.Empty;
        
        [Required]
        [MaxLength(255)]
        [Column("CustomerName")]
        public string CustomerName { get; set; } = string.Empty;
        
        [Column("CustomerAddress")]
        public string? CustomerAddress { get; set; }
        
        [MaxLength(10)]
        [Column("Currency")]
        public string Currency { get; set; } = "USD";
        
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
    }
}
