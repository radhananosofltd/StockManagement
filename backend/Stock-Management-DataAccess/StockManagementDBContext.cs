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
    }
}
