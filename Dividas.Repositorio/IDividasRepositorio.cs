using System.Threading.Tasks;
using Dividas.Dominio;

namespace Dividas.Repositorio
{
    public interface IDividasRepositorio
    {
         void Add<T>(T entity) where T : class;
         void Update<T>(T entity) where T : class;
         void Delete<T>(T entity) where T : class;
         Task<bool> SaveChangesAsync();

         // DIVIDAS
          
         Task<Divida[]> GetAllDividasAsyncByTitulo(string titulo);
         Task<Divida[]> GetAllDividasAsyncByValor(double valor);
         
         Task<Divida> GetAllDividasAsyncById(int id);
         
         Task<Divida[]> GetAllAsync();

         // Dividas Pagas
         Task<Divida[]> GetAllDividasPagaAsync();
         Task<Divida[]> GetDividasPagaTituloAsync(string titulo);
         Task<Divida[]> GetDividasPagaValorAsync(double valor);

         // Dividas Pendetes
         Task<Divida[]> GetAllDividasPendentesAsync();
         Task<Divida[]> GetDividasPendentesTituloAsync(string titulo);
         Task<Divida[]> GetDividasPendentesValorAsync(double valor);
    }
}