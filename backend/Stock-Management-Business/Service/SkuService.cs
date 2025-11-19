using System.Threading.Tasks;
using AutoMapper;
using Microsoft.Extensions.Logging;
using Stock_Management_Business.DTO;
using Stock_Management_Business.Interface;
using Stock_Management_DataAccess.Entities;
using Stock_Management_DataAccess.Interfaces;
using AutoMapper;

namespace YourNamespace.Services
{
    public class SkuService : ISkuService           
            
    {
        private readonly ISkuRepository _skuRepository;
        private readonly ILogger<SkuService> _logger;
        private readonly IMapper _mapper;
        public SkuService(ISkuRepository skuRepository, ILogger<SkuService> logger, IMapper mapper)
        {
            _skuRepository = skuRepository;
            _logger = logger;
            _mapper = mapper;
        }

        public async Task<bool> UpdateSkuAsync(UpdateSkuRequest request)
            {
                var sku = await _skuRepository.GetSkuByIdAsync(request.SkuId);
                if (sku == null) return false;
                // Fetch specification details
                var spec = await _skuRepository.GetSpecificationByIDAsync(request.SpecificationId);
                string transformedValue = request.Value;
                if (spec != null)
                {
                    switch (spec.ValueCase?.ToLower())
                    {
                        case "lower":
                            transformedValue = request.Value.ToLower();
                            break;
                        case "upper":
                            transformedValue = request.Value.ToUpper();
                            break;
                        case "title":
                            transformedValue = System.Globalization.CultureInfo.CurrentCulture.TextInfo.ToTitleCase(request.Value.ToLower());
                            break;
                    }
                    switch (spec.Datatype?.ToLower())
                    {
                        case "wholenumber":
                            transformedValue = int.TryParse(request.Value, out var i) ? i.ToString() : "0";
                            break;
                        case "double":
                            transformedValue = double.TryParse(request.Value, out var d) ? d.ToString() : "0";
                            break;
                        case "date":
                            transformedValue = DateTime.TryParse(request.Value, out var dt) ? dt.ToString("yyyy-MM-dd") : "";
                            break;
                        case "datetime":
                            transformedValue = DateTime.TryParse(request.Value, out var dtm) ? dtm.ToString("yyyy-MM-dd HH:mm:ss") : "";
                            break;
                    }
                }
                sku.SpecificationId = request.SpecificationId;
                sku.Value = transformedValue;
                sku.SkuCode = request.SkuCode;
                sku.IsActive = request.IsActive;
                sku.ModifiedBy = request.UserId;
                sku.ModifiedDate = DateTime.SpecifyKind(DateTime.UtcNow, DateTimeKind.Utc);
                await _skuRepository.UpdateSkuAsync(sku);
                return true;
            }
            
        public async Task<int> SaveSkuAsync(SaveSkuRequestDTO request)
        {
            var now = DateTime.SpecifyKind(DateTime.UtcNow, DateTimeKind.Utc);
            // Fetch specification details
            var spec = await _skuRepository.GetSpecificationByIDAsync(request.SpecificationId);
            string transformedValue = request.Value;
            if (spec != null)
            {
                switch (spec.ValueCase?.ToLower())
                {
                    case "lower":
                        transformedValue = request.Value.ToLower();
                        break;
                    case "upper":
                        transformedValue = request.Value.ToUpper();
                        break;
                    case "title":
                        transformedValue = System.Globalization.CultureInfo.CurrentCulture.TextInfo.ToTitleCase(request.Value.ToLower());
                        break;
                }
                switch (spec.Datatype?.ToLower())
                {
                    case "wholenumber":
                        transformedValue = int.TryParse(request.Value, out var i) ? i.ToString() : "0";
                        break;
                    case "double":
                        transformedValue = double.TryParse(request.Value, out var d) ? d.ToString() : "0";
                        break;
                    case "date":
                        transformedValue = DateTime.TryParse(request.Value, out var dt) ? dt.ToString("yyyy-MM-dd") : "";
                        break;
                    case "datetime":
                        transformedValue = DateTime.TryParse(request.Value, out var dtm) ? dtm.ToString("yyyy-MM-dd HH:mm:ss") : "";
                        break;
                }
            }
            var skuEntity = new SkuEntity
            {
                SpecificationId = request.SpecificationId,
                Value = transformedValue,
                SkuCode = request.SkuCode,
                IsActive = request.IsActive,
                CreatedBy = request.UserId,
                CreatedDate = now,
                ModifiedBy = request.UserId,
                ModifiedDate = now
            };
            return await _skuRepository.SaveSkuAsync(skuEntity);
        }

        public async Task SaveBulkSkusAsync(List<SaveSkuRequestDTO> requests)
        {
            var now = DateTime.SpecifyKind(DateTime.UtcNow, DateTimeKind.Utc);
            var skuEntities = requests.Select(request => new SkuEntity
            {
                SpecificationId = request.SpecificationId,
                Value = request.Value,
                SkuCode = request.SkuCode,
                IsActive = request.IsActive,
                CreatedBy = request.UserId,
                CreatedDate = now,
                ModifiedBy = request.UserId,
                ModifiedDate = now
            }).ToList();
            await _skuRepository.SaveBulkSkusAsync(skuEntities);
        }

        public async Task<List<SkuListDTO>> GetAllSkusAsync()
        {
            var skuEntities = await _skuRepository.GetAllSkusAsync();
            var specificationEntities = await _skuRepository.GetAllSpecificationsAsync();
            var skuList = skuEntities.Select(sku => new SkuListDTO
            {
                SkuId = sku.SkuId,
                SpecificationId = sku.SpecificationId,
                SpecificationName = specificationEntities.FirstOrDefault(spec => spec.SpecificationId == sku.SpecificationId)?.SpecificationName ?? string.Empty,
                Value = sku.Value,
                SkuCode = sku.SkuCode,
                IsActive = sku.IsActive,
                CreatedBy = sku.CreatedBy,
                CreatedDate = sku.CreatedDate,
                ModifiedBy = sku.ModifiedBy,
                ModifiedDate = sku.ModifiedDate
            }).ToList();
            return skuList;
        }
        public async Task<bool> DeactivateSkuAsync(int skuId, int userId)
        {
            var sku = await _skuRepository.GetSkuByIdAsync(skuId);
            if (sku == null) return false;
            sku.IsActive = false;
            sku.ModifiedBy = userId;
            sku.ModifiedDate = DateTime.SpecifyKind(DateTime.UtcNow, DateTimeKind.Utc);
            // Ensure all DateTime fields have Kind set
            if (sku.CreatedDate.Kind == DateTimeKind.Unspecified)
                sku.CreatedDate = DateTime.SpecifyKind(sku.CreatedDate, DateTimeKind.Utc);
            await _skuRepository.UpdateSkuAsync(sku);
            return true;
        }
    }
}