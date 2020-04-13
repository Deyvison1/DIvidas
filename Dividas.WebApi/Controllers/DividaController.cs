using Microsoft.AspNetCore.Mvc;
using Dividas.Repositorio;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Dividas.Dominio;

namespace Dividas.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DividaController : ControllerBase
    {
        private readonly IDividasRepositorio _repo;
        public DividaController(IDividasRepositorio repo)
        {
            _repo = repo;
        }
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var results = await _repo.GetAllAsync();
                return Ok(results);
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Erro no getAll");
            }
        }
        
        [HttpGet("getAllTitulo/{titulo}")]
        public async Task<IActionResult> Get(string titulo)
        {
            try
            {
                var dividas = await _repo.GetAllDividasAsyncByTitulo(titulo);
                return Ok(dividas);
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Erro no getAll");
            }
        }
        [HttpGet("getAllValor/{valor}")]
        public async Task<IActionResult> Get(double valor)
        {
            try
            {
                var dividas = await _repo.GetAllDividasAsyncByValor(valor);
                return Ok(dividas);
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Erro no getAll");
            }
        }
                
        [HttpGet("{Id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var result = await _repo.GetAllDividasAsyncById(id);
                return Ok(result);
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Erro no GetId");
            }
        }
        
        
        [HttpPost]
        public async Task<IActionResult> Post(Divida model)
        {
            try
            {
                _repo.Add(model);

                if (await _repo.SaveChangesAsync())
                {
                    return Created($"/api/divida/{model.Id}", model);
                }
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Erro no GetId");
            }
            return BadRequest();
        }
        [HttpPut("{Id}")]
        public async Task<IActionResult> Put(int id, Divida model)
        {
            try
            {
                var divida = await _repo.GetAllDividasAsyncById(id);
                if (divida == null) return NotFound();

                _repo.Update(model);

                if (await _repo.SaveChangesAsync())
                {
                    return Created($"/api/divida/{model.Id}", model);
                }
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Erro no GetId");
            }
            return BadRequest();
        }
        [HttpDelete("{Id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var divida = await _repo.GetAllDividasAsyncById(id);
                if (divida == null) return NotFound();

                _repo.Delete(divida);

                if (await _repo.SaveChangesAsync())
                {
                    return Ok();
                }
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Erro no GetId");
            }
            return BadRequest();
        }
    }
}