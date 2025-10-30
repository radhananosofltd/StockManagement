using Microsoft.AspNetCore.Mvc;
using Stock_Management_Business.DTO;
using Stock_Management_Business.Interface;

namespace StockManagementAPI.Controllers
{

[Route("api/[controller]")]
[ApiController]
public class CompanyController : ControllerBase
{
    private readonly ICompanyService _service;

    public CompanyController(ICompanyService service) {  _service = service; }

        [HttpPost("AddCompany")]
    public async Task<IActionResult> AddCompany(CompanyDTO company)
        {
            var result = await _service.AddCompany(company);
            return Ok(1);
        }
}
}
