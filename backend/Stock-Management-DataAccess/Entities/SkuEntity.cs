using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Stock_Management_DataAccess.Entities
{
    [Table("sku")]
    public class SkuEntity
    {
        [Key]
        [Column("sku_id")]
        public int SkuId { get; set; }

        [Column("specification_id")]
        public int SpecificationId { get; set; }

        [Column("values")]
        public string Value { get; set; }

        [Column("sku_code")]
        public string SkuCode { get; set; }

        [Column("is_active")]
        public bool IsActive { get; set; }

        [Column("created_by")]
        public int CreatedBy { get; set; }

        [Column("created_date")]
        public DateTime CreatedDate { get; set; }

        [Column("modified_by")]
        public int? ModifiedBy { get; set; }

        [Column("modified_date")]
        public DateTime? ModifiedDate { get; set; }
    }
}
