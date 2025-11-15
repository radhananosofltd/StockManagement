namespace Stock_Management_Business.DTO
{
    public class SaveSkuRequestDTO
    {
        public int SpecificationId { get; set; }
        public string Value { get; set; }
        public string SkuCode { get; set; }
        public bool IsActive { get; set; }
        public int UserId { get; set; }
    }
}
