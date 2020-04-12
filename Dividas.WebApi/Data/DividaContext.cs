using Dividas.WebApi.Model;
using Microsoft.EntityFrameworkCore;

namespace Dividas.WebApi.Data
{
    public class DividaContext : DbContext
    {
        public DividaContext(DbContextOptions<DividaContext> options): base(options) {  }

        public DbSet<Divida> Dividas { get; set; }
    }
}