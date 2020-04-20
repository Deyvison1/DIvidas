using Microsoft.AspNetCore.Mvc;
using Dividas.Repositorio;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Dividas.Dominio;
using AutoMapper;
using Dividas.WebApi.Dtos;
using System.Collections.Generic;

namespace Dividas.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DividaController : ControllerBase
    {
        private readonly IDividasRepositorio _repo;
        private readonly IMapper _mapper;
        public DividaController(IDividasRepositorio repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                // Aqui vem todas Informações
                var dividas = await _repo.GetAllAsync();
                // Aqui ja separo os itens do meu desejo 
                var results = _mapper.Map<DividaDto[]>(dividas);
                
                return Ok(results);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro no getAll {ex.Message}");
            }
        }
        [HttpGet("dividasPaga")]
        public async Task<IActionResult> GetAllDividasPaga()
        {
            try
            {
                // Aqui vem todas Informações
                var dividas = await _repo.GetAllDividasPagaAsync();
                // Aqui ja separo os itens do meu desejo 
                var results = _mapper.Map<DividaDto[]>(dividas);
                
                return Ok(results);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro no getAll {ex.Message}");
            }
        }
        [HttpGet("dividasPendentes")]
        public async Task<IActionResult> GetAllDividasPendetes()
        {
            try
            {
                // Aqui vem todas Informações
                var dividas = await _repo.GetAllDividasPendentesAsync();
                // Aqui ja separo os itens do meu desejo 
                var results = _mapper.Map<DividaDto[]>(dividas);
                
                return Ok(results);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro no getAll {ex.Message}");
            }
        }
        
        [HttpGet("getAllTitulo/{titulo}")]
        public async Task<IActionResult> Get(string titulo)
        {
            try
            {
                var dividas = await _repo.GetAllDividasAsyncByTitulo(titulo);
                var results = _mapper.Map<DividaDto[]>(dividas);
                return Ok(results);
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
                var results = _mapper.Map<DividaDto[]>(dividas);
                return Ok(results);
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
                var results = _mapper.Map<DividaDto>(result);
                return Ok(results);
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Erro no GetId");
            }
        }
        
        
        [HttpPost]
        public async Task<IActionResult> Post(DividaDto model)
        {
            try
            {
                var divida = _mapper.Map<Divida>(model);
                _repo.Add(divida);

                if (await _repo.SaveChangesAsync())
                {
                    return Created($"/api/divida/{model.Id}", _mapper.Map<DividaDto>(divida));
                }
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro no GetId {ex.Message}");
            }
            return BadRequest();
        }
        [HttpPut("{Id}")]
        public async Task<IActionResult> Put(int id, DividaDto model)
        {
            try
            {
                var divida = await _repo.GetAllDividasAsyncById(id);
                if (divida == null) return NotFound();

                _mapper.Map(model, divida);

                _repo.Update(divida);

                if (await _repo.SaveChangesAsync())
                {
                    return Created($"/api/divida/{model.Id}", _mapper.Map<DividaDto>(divida));
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