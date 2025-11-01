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
        public int CompanyId { get; set; }
        
        [Required]
        [MaxLength(100)]
        public string CompanyName { get; set; } = string.Empty;
    }
}
