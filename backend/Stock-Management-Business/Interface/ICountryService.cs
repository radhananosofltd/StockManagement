using Stock_Management_Business.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Stock_Management_Business.Interface
{
    public interface ICountryService
    {
        Task<List<CountryDTO>> GetAllCountries();
    }
}