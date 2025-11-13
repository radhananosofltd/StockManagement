using System;

namespace Stock_Management_Business.DTO
{
    public class SpecificationDTO
    {
        public int SpecificationId { get; set; }
        public string SpecificationName { get; set; } = string.Empty;
        public bool IsDefault { get; set; } = false;
        public string Datatype { get; set; } = string.Empty;
        public string? NameCase { get; set; }
        public string? ValueCase { get; set; }
        public bool Sku { get; set; } = false;
        public bool Editable { get; set; } = false;
        public bool Configurable { get; set; } = false;
        public bool BulkInput { get; set; } = false;
        public bool Lockable { get; set; } = false;
        public bool Background { get; set; } = false;
        public bool IsActive { get; set; } = true;
        public int UserId { get; set; }
    }
    public class BulkImportSpecificationResultDTO
    {
        public int TotalImported { get; set; }
        public List<string> Errors { get; set; } = new List<string>();
    }
}
