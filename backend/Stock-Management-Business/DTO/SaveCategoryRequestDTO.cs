namespace Stock_Management_Business.DTO
{
    public class CategorySpecificationDTO
    {
        public int SpecificationId { get; set; }
        public int SkuOrder { get; set; }
    }

    public class SaveCategoryRequestDTO
    {
        public string CategoryName { get; set; }
        public bool IsActive { get; set; }
        public List<CategorySpecificationDTO> Specifications { get; set; }
        public int UserId { get; set; }
    }
}
