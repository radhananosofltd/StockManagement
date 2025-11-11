using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Stock_Management_DataAccess.Entities
{
    [Table("country")]
    public class CountryEntity
    {
    [Key]
    [Column("countryid")]
    public int CountryId { get; set; }

    [Column("countryname")]
    public string CountryName { get; set; } = string.Empty;

    [Column("currency")]
    public string Currency { get; set; } = string.Empty;
    }
}