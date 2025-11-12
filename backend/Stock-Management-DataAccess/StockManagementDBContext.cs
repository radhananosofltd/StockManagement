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
    public DbSet<CountryEntity> CountryEntity { get; set; }
    public DbSet<BranchEntity> BranchEntity { get; set; }
    public DbSet<SpecificationEntity> SpecificationEntity { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure UserEntity
            modelBuilder.Entity<UserEntity>(entity =>
            {
                // Configure indexes and constraints
                entity.HasIndex(e => e.Email).IsUnique();
            });

            // Configure CompanyEntity
            modelBuilder.Entity<CompanyEntity>(entity =>
            {
                entity.HasIndex(e => e.CompanyCode).IsUnique();
                entity.HasIndex(e => e.IsActive);
                
                // Configure foreign key relationships
                entity.HasOne(e => e.CreatedByUser)
                    .WithMany()
                    .HasForeignKey(e => e.CreatedBy)
                    .OnDelete(DeleteBehavior.Restrict);
                    
                entity.HasOne(e => e.ModifiedByUser)
                    .WithMany()
                    .HasForeignKey(e => e.ModifiedBy)
                    .OnDelete(DeleteBehavior.Restrict);
                    
                entity.HasOne(e => e.Country)
                    .WithMany()
                    .HasForeignKey(e => e.CountryId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            // Configure BranchEntity
            modelBuilder.Entity<BranchEntity>(entity =>
            {
                entity.HasIndex(e => e.BranchCode).IsUnique();
                entity.HasIndex(e => e.IsActive);
                entity.HasIndex(e => e.BranchCountryId);
                entity.HasIndex(e => e.CompanyID);
                
                // Configure foreign key relationships
                entity.HasOne(e => e.CreatedByUser)
                    .WithMany()
                    .HasForeignKey(e => e.CreatedBy)
                    .OnDelete(DeleteBehavior.Restrict);
                    
                entity.HasOne(e => e.ModifiedByUser)
                    .WithMany()
                    .HasForeignKey(e => e.ModifiedBy)
                    .OnDelete(DeleteBehavior.Restrict);
                    
                entity.HasOne(e => e.BranchCountry)
                    .WithMany()
                    .HasForeignKey(e => e.BranchCountryId)
                    .OnDelete(DeleteBehavior.Restrict);
                    
                entity.HasOne(e => e.Company)
                    .WithMany()
                    .HasForeignKey(e => e.CompanyID)
                    .OnDelete(DeleteBehavior.Restrict);
                    
                // Configure self-referencing relationship for head office
                entity.HasOne(e => e.HeadOfficeBranch)
                    .WithMany()
                    .HasForeignKey(e => e.HeadOfficeBranchId)
                    .OnDelete(DeleteBehavior.Restrict);
                    
            });
        }
    }
}
