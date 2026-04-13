using ApiProjetoVagas.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ApiProjetoVagas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VagasController : ControllerBase
    {
        private List<Vagas> PegarDados()
        {
            // Criar uma lista de Alunos vazia para receber os dados do arquivo
            List<Vagas> listaVagas = new();

            try
            {
                // Pegar arquivo c:\temp\vagas.json e trazer para a memória
                string dadosArquivo = System.IO.File.ReadAllText("c:\\temp\\vagas.json");
                listaVagas = System.Text.Json.JsonSerializer.Deserialize<List<Vagas>>(dadosArquivo);
            }
            catch { }

            return listaVagas;
        }

        [HttpGet]
        public IActionResult Listar()
        {
            return Ok(PegarDados());
        }

        [HttpPost]
        public IActionResult Cadastrar(Vagas vaga)
        {
            List<Vagas> listaVagas = PegarDados();
            listaVagas.Add(vaga);
            SalvarArquivo(listaVagas);
            return Ok(PegarDados());
        }
        [HttpDelete]

        public IActionResult Deletar(int id)
        {
            List<Vagas> listaVagas = PegarDados();
            SalvarArquivo(listaVagas.Where(item => item.Id != id).ToList());
            return Ok();
        }
        [HttpPut]
        public IActionResult Editar(Vagas vaga)
        {
            var listaVagas = PegarDados();
            listaVagas = listaVagas.Where((item => item.Id != vaga.Id)).ToList();
            listaVagas.Add(vaga);
            SalvarArquivo(listaVagas);
            return Ok();
        }
        private void SalvarArquivo(List<Vagas> listaVagas)
        {
            string dadosJson = System.Text.Json.JsonSerializer.Serialize(listaVagas);
            System.IO.File.WriteAllText("c:\\temp\\vagas.json", dadosJson);

        }
    }
}
