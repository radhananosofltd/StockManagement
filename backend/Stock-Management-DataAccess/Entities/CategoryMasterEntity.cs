using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Stock_Management_DataAccess.Entities
{
    [Table("categorymaster")]
    public class CategoryMasterEntity
    {
        [Key]
        [Column("categoryid")]
        public int CategoryId { get; set; }

        [Required]
        [Column("category")]
        public string CategoryName { get; set; }

        [Column("is_active")]
        public bool IsActive { get; set; } = true;

        [Column("comments")]
        public string? Comment { get; set; } = null;

        [Column("created_by")]
        public int? created_by { get; set; }

        [Required]
        [Column("create_date")]
        public DateTime create_date { get; set; } = DateTime.SpecifyKind(DateTime.UtcNow, DateTimeKind.Utc);

        [Column("modified_by")]
        public int? modified_by { get; set; }

        [Column("modified_date")]
        public DateTime? modified_date { get; set; }
    }
}
