using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Stock_Management_DataAccess.Entities
{
    [Table("keyvalues")]
    public class KeyValueEntity
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("item_id")]
        public string ItemId { get; set; }

        [Column("container_id")]
        public string ContainerId { get; set; }
    }
}
