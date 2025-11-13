using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Stock_Management_DataAccess.Entities
{
    [Table("specification")]
    public class SpecificationEntity
    {
        [Key]
        [Column("specificationid")]
        public int SpecificationId { get; set; }

        [Required]
        [Column("specificationname")]
        [MaxLength(255)]
        public string SpecificationName { get; set; } = string.Empty;

        [Column("is_default")]
        public bool IsDefault { get; set; } = false;

        [Required]
        [Column("datatype")]
        [MaxLength(50)]
        public string Datatype { get; set; } = string.Empty;

        [Column("namecase")]
        [MaxLength(50)]
        public string? NameCase { get; set; }

        [Column("valuecase")]
        [MaxLength(50)]
        public string? ValueCase { get; set; }

        [Column("sku")]
        public bool Sku { get; set; } = false;

        [Column("editable")]
        public bool Editable { get; set; } = false;

        [Column("configurable")]
        public bool Configurable { get; set; } = false;

        [Column("bulkinput")]
        public bool BulkInput { get; set; } = false;

        [Column("lockable")]
        public bool Lockable { get; set; } = false;

        [Column("background")]
        public bool Background { get; set; } = false;

        [Column("isactive")]
        public bool IsActive { get; set; } = true;

        [Column("created_date")]
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;

    [Column("created_by")]
    public int CreatedBy { get; set; }

    [Column("modified_by")]
    public int ModifiedBy { get; set; }

        [Column("modified_date")]
        public DateTime ModifiedDate { get; set; } = DateTime.UtcNow;
    }
}
