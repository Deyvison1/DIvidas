using System;
using System.ComponentModel.DataAnnotations;

namespace Dividas.WebApi.Model
{
    public class Divida
    {
        public int Id                  { get; set; }
        public string ImagemURL        { get; set; }
        public string Titulo           { get; set; }
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}")]
        public DateTime DataCompra     { get; set; }      
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}")]
        public DateTime Vencimento     { get; set; }
        public int FormaPagamento      { get; set; }
        public double Valor            { get; set; }
        public Divida() { }
        public Divida(int id, string titulo, string imagemUrl, DateTime dataCompra, DateTime vencimento, int formaPaganto, double valor) {
            Id = id;
            Titulo = titulo;
            DataCompra = dataCompra;
            Vencimento = vencimento;
            FormaPagamento = formaPaganto;
            Valor = valor;
            ImagemURL = imagemUrl;
        }
    }
}