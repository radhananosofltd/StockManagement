using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Stock_Management_DataAccess.Entities
{
    [Table("categorySpecifications")]
    public class CategorySpecificationsEntity
    {
        [Key]
        [Column("categoryspecid")]
        public int Id { get; set; }

        [Column("categoryid")]
        public int CategoryId { get; set; }

        [Column("specid")]
        public int SpecificationId { get; set; }

        [Column("skufieldorder")]
        public int SkuOrder { get; set; }
     
    }
}
