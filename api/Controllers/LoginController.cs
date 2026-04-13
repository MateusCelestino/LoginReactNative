using ApiProjetoVagas.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ApiProjetoVagas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private List<Vagas> PegarDados()
        {
            // Criar uma lista de Alunos vazia para receber os dados do arquivo
            List<Vagas> listaVagas = new();

            try
            {
                // Pegar arquivo c:\temp\alunos.json e trazer para a memória
                string dadosArquivo = System.IO.File.ReadAllText("c:\\temp\\vagas.json");
                listaVagas = System.Text.Json.JsonSerializer.Deserialize<List<Vagas>>(dadosArquivo);
            }
            catch { }

            return listaVagas;
        }
        [HttpPost]
        public IActionResult Logar(Logar dados)

        {
            var listaUsuario = PegarDados();
            var usuario = listaUsuario.Where(item => item.Email == dados.Email && item.Senha == dados.Senha).FirstOrDefault();
            if (usuario != null)
            {
                return Ok();
            }
            return Unauthorized();
        }
    }
}
