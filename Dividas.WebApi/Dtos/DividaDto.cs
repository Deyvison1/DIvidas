using System;
using System.ComponentModel.DataAnnotations;

namespace Dividas.WebApi.Dtos
{
    public class DividaDto
    {
        public int Id                  { get; set; }
        [Required(ErrorMessage = "O campo {0} é Obrigatório")]
        [StringLength(150, MinimumLength=3,ErrorMessage = "Titulo deve conter entre 3 caracteres a 150")]
        public string Titulo           { get; set; }
        [Required(ErrorMessage = "O campo {0} é Obrigatório")]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}")]
        public DateTime DataCompra     { get; set; }
        [Required(ErrorMessage = "O campo {0} é Obrigatório")]
        public DateTime Vencimento     { get; set; }
        [Range(1,2, ErrorMessage = "Valor fora do padrão")]
        public int FormaPagamento      { get; set; }
        [Required(ErrorMessage = "O campo {0} é Obrigatório")]
        [DisplayFormat(DataFormatString = "{0:F2}")]
        public double Valor            { get; set; }
        public string ImagemURL        { get; set; }

    }
}