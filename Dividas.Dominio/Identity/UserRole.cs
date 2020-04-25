using Microsoft.AspNetCore.Identity;

namespace Dividas.Dominio.Identity
{
    public class UserRole : IdentityUserRole<int>
    {
        public User User { get; set; }
        public Role Role { get; set; }
    }
}