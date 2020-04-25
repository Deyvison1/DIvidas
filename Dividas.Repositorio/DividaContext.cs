using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Dividas.Dominio.Identity;
using Dividas.Dominio;
using Microsoft.AspNetCore.Identity;

namespace Dividas.Repositorio
{
    public class DividaContext : IdentityDbContext<User, Role, int, IdentityUserClaim<int>, UserRole, IdentityUserLogin<int>,
        IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public DividaContext(DbContextOptions<DividaContext> options): base(options) {  }

        protected override void OnModelCreating(ModelBuilder builder) {
            base.OnModelCreating(builder);

            builder.Entity<UserRole>(userRole => {
                userRole.HasKey(ur => new {ur.UserId, ur.RoleId});
                userRole.HasOne(ur => ur.Role).WithMany(r => r.UserRoles)
                    .HasForeignKey(ur => ur.RoleId)
                    .IsRequired();
                userRole.HasOne(ur => ur.User).WithMany(r => r.UserRoles)
                    .HasForeignKey(ur => ur.UserId)
                    .IsRequired();    
            });
        }
        public DbSet<Divida> Dividas { get; set; }
    }
}