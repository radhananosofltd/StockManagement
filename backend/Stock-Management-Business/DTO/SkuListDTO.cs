namespace Stock_Management_Business.DTO
{
    public class SkuListDTO
    {
        public int SkuId { get; set; }
        public int SpecificationId { get; set; }
        public string SpecificationName { get; set; }
        public string Value { get; set; }
        public string SkuCode { get; set; }
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public int? ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
    }
}
