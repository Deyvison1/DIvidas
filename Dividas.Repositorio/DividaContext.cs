using Dividas.Dominio;
using Microsoft.EntityFrameworkCore;

namespace Dividas.Repositorio
{
    public class DividaContext : DbContext
    {
        public DividaContext(DbContextOptions<DividaContext> options): base(options) {  }

        public DbSet<Divida> Dividas { get; set; }
    }
}