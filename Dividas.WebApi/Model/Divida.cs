using System;

namespace Dividas.WebApi.Model
{
    public class Divida
    {
        public int Id              { get; set; }
        public string Titulo       { get; set; }
        public string DataCompra { get; set; }      
        public string Vencimento { get; set; }
        public int FormaPagamento  { get; set; }
        public double Valor        { get; set; }
        public Divida() { }
        public Divida(int id, string titulo, string dataCompra, string vencimento, int formaPaganto, double valor) {
            Id = id;
            Titulo = titulo;
            DataCompra = dataCompra;
            Vencimento = vencimento;
            FormaPagamento = formaPaganto;
            Valor = valor;
        }
        // Usuario Usuarios
    }
}