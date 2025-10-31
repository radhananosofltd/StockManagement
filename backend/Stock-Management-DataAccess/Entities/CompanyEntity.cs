using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Stock_Management_DataAccess.Entities
{
    public class CompanyEntity
    {
        [Key]
        public int CompanyId { get; set; }
        public string CompanyName { get; set; }
    }
}
