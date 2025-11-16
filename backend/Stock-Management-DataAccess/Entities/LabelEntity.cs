using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Stock_Management_DataAccess.Entities
{
    [Table("lable")]
    public class LabelEntity
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("item_id")]
        public string item_id { get; set; }

        [Column("container_id")]
        public string container_id { get; set; }

              [Column("status")]
        public string Status { get; set; }
    }
}
