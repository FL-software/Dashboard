using Dashboard.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace Dashboard.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }


        [HttpPost("api/ListaProdutos")]
        public async Task<List<Produto>> ListaProdutos(string filtro)
        {
            var listaProduto = new List<Produto>();

            for (int i = 1; i <= 10; i++)
            {
                listaProduto.Add(new Produto
                {

                    nome = string.Concat("Teste - ", i.ToString()),
                    valor = string.Concat(i.ToString(), ",00")

                });

            }

            if (!string.IsNullOrWhiteSpace(filtro))
            {
                return await Task.FromResult(listaProduto.Where(p => p.nome.ToUpper().Contains(filtro.ToUpper())).ToList());
            }



            return await Task.FromResult(listaProduto);

        }



        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
