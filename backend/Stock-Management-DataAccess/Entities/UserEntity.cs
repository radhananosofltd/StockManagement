using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Stock_Management_DataAccess.Entities
{
    [Table("users")]
    public class UserEntity      
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Required]
        [Column("username")]
        [MaxLength(50)]
        public string Username { get; set; } = string.Empty;

        [Required]
        [Column("email")]
        [MaxLength(100)]
        public string Email { get; set; } = string.Empty;

        [Required]
        [Column("password_hash")]
        [MaxLength(255)]
        public string PasswordHash { get; set; } = string.Empty;

        [Column("first_name")]
        [MaxLength(50)]
        public string? FirstName { get; set; }

        [Column("last_name")]
        [MaxLength(50)]
        public string? LastName { get; set; }

        [Column("default_company_id")]
        public int? DefaultCompanyId { get; set; }

        [Column("default_branch_id")]
        public int? DefaultBranchId { get; set; }

        [Column("role_id")]
        public int? RoleId { get; set; }

        [Column("is_active")]
        public bool IsActive { get; set; } = true;

        [Column("created_date")]
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;

        [Column("modified_date")]
        public DateTime ModifiedDate { get; set; } = DateTime.UtcNow;        

            [Column("last_login_at")]
        public DateTime LastLoginAt { get; set; } = DateTime.UtcNow;
        [Column("reset_password_token")]
        [MaxLength(255)]
        public string? ResetPasswordToken { get; set; }

        [Column("reset_password_expiry")]
        public DateTime? ResetPasswordExpiry { get; set; }
    }
}