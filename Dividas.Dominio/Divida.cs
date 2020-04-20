using System;


namespace Dividas.Dominio
{
    public class Divida
    {
        public int Id                  { get; set; }
        public string ImagemURL        { get; set; }
        public string Titulo           { get; set; }
        public DateTime DataCompra     { get; set; }      
        // [DataType(DataType.Date)]
        // [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}")]
        public DateTime Vencimento     { get; set; }
        public int FormaPagamento      { get; set; }
        public double Valor            { get; set; }
        public int Situacao            { get; set; }
        //public Usuario Usuario         { get; set; }
        //public int UsuarioId           { get; set; }
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