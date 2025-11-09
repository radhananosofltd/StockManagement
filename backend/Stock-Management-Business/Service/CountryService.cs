using AutoMapper;
using Microsoft.Extensions.Logging;
using Stock_Management_Business.DTO;
using Stock_Management_Business.Interface;
using Stock_Management_DataAccess.Entities;
using Stock_Management_DataAccess.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Stock_Management_Business.Service
{
    public class CountryService : ICountryService
    {
        private readonly ICountryRepository _countryRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<CountryService> _logger;

        public CountryService(ICountryRepository countryRepository, IMapper mapper, ILogger<CountryService> logger)
        {
            _countryRepository = countryRepository;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task<List<CountryDTO>> GetAllCountries()
        {
            try
            {
                _logger.LogInformation("CountryService: Starting GetAllCountries operation");
                
                var countryEntities = await _countryRepository.GetAllCountries();
                _logger.LogInformation($"CountryService: Retrieved {countryEntities.Count} country entities from repository");
                
                var countryDTOs = _mapper.Map<List<CountryDTO>>(countryEntities);
                _logger.LogInformation($"CountryService: Successfully mapped {countryDTOs.Count} country DTOs");
                
                return countryDTOs;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "CountryService: Error occurred in GetAllCountries: {ErrorMessage}", ex.Message);
                
                // Log the full stack trace for debugging
                _logger.LogError("CountryService: Full exception details: {Exception}", ex.ToString());
                
                throw;
            }
        }
    }
}