using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Stock_Management_Business.DTO
{
    public class CountryDTO
    {
    public int CountryId { get; set; }
    public string CountryName { get; set; } = string.Empty;
    public string Currency { get; set; } = string.Empty;
    }
}