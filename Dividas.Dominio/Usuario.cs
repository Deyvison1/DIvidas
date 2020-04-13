using System.Linq;
using System.Collections.Generic;
namespace Dividas.Dominio
{
    public class Usuario
    {
        public int Id               { get; set; }
        public string Nome          { get; set; }
        public string Email         { get; set; }
        public string Senha         { get; set; }
        public List<Divida> Dividas { get; set; }
    }
}