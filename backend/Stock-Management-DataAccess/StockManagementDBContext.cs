using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Stock_Management_DataAccess.Entities;

namespace Stock_Management_DataAccess
{
    public class StockManagementDBContext : DbContext
    {
        public StockManagementDBContext(DbContextOptions<StockManagementDBContext> options) : base(options) { }

        public DbSet<CompanyEntity> CompanyEntity { get; set; }
        public DbSet<UserEntity> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure CompanyEntity
            modelBuilder.Entity<CompanyEntity>(entity =>
            {
                entity.HasKey(e => e.CompanyId);
                entity.Property(e => e.CompanyName).IsRequired().HasMaxLength(255);
            });

            // Configure UserEntity
            modelBuilder.Entity<UserEntity>(entity =>
            {
                entity.HasKey(e => e.UserId);
                entity.Property(e => e.Username).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Email).IsRequired().HasMaxLength(255);
                entity.Property(e => e.PasswordHash).IsRequired();
                entity.Property(e => e.FirstName).IsRequired().HasMaxLength(100);
                entity.Property(e => e.LastName).IsRequired().HasMaxLength(100);
                entity.Property(e => e.CreatedDate).IsRequired();
                entity.Property(e => e.IsActive).IsRequired();
                
                // Create unique indexes
                entity.HasIndex(e => e.Username).IsUnique();
                entity.HasIndex(e => e.Email).IsUnique();
            });
        }
    }
}
