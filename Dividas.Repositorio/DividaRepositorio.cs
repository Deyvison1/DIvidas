using System.Linq;
using System.Threading.Tasks;
using Dividas.Dominio;
using Microsoft.EntityFrameworkCore;

namespace Dividas.Repositorio
{
    public class DividaRepositorio : IDividasRepositorio
    {
        private readonly DividaContext _context;

        public DividaRepositorio(DividaContext context)
        {
            _context = context;
            _context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Update<T>(T entity) where T : class
        {
            _context.Update(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync()) > 0;
        }

        public async Task<Divida[]> GetAllAsync()
        {
            return await _context.Dividas.AsNoTracking().OrderByDescending(x => x.Id).ToArrayAsync();
        }

        public async Task<Divida> GetAllDividasAsyncById(int id)
        {
            return await _context.Dividas.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Divida[]> GetAllDividasAsyncByTitulo(string titulo)
        {
            var result = _context.Dividas.AsNoTracking().Where(x => x.Titulo.ToLower().Contains(titulo.ToLower()));
            return await result.ToArrayAsync();
        }

        public async Task<Divida[]> GetAllDividasAsyncByValor(double valor)
        {
            return await _context.Dividas.AsNoTracking().OrderByDescending(x => x.Valor == valor).ToArrayAsync();
        }

    }
}