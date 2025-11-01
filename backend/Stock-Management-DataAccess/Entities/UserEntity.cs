using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Stock_Management_DataAccess.Entities
{
    [Table("Users")]
    public class UserEntity
    {
        [Key]
        [Column("UserId")]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Username { get; set; } = string.Empty;

        [Required]
        [MaxLength(255)]
        public string Email { get; set; } = string.Empty;

        [Required]
        [MaxLength(255)]
        public string PasswordHash { get; set; } = string.Empty;

        [MaxLength(100)]
        public string FirstName { get; set; } = string.Empty;

        [MaxLength(100)]
        public string LastName { get; set; } = string.Empty;

        [Column("CreatedDate")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        [Column("LastLoginDate")]
        public DateTime? LastLoginAt { get; set; }
        
        public bool IsActive { get; set; } = true;

        [MaxLength(255)]
        public string? ResetPasswordToken { get; set; }

        public DateTime? ResetPasswordExpiry { get; set; }
    }
}