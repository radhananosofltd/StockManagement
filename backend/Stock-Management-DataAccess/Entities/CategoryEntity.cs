using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Stock_Management_DataAccess.Entities
{
    [Table("category")]
    public class CategoryEntity
    {
        [Key]
        [Column("categoryid")]
        public int CategoryId { get; set; }

        [Required]
        [Column("categoryname")]
        [MaxLength(255)]
        public string CategoryName { get; set; } = string.Empty;

        [Column("isactive")]
        public bool IsActive { get; set; } = true;

        [Column("created_by")]
        public int CreatedBy { get; set; }

        [Column("created_date")]
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;

        [Column("modified_by")]
        public int ModifiedBy { get; set; }

        [Column("modified_date")]
        public DateTime ModifiedDate { get; set; } = DateTime.UtcNow;
    }
}
