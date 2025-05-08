using App.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace App.Controllers
{
    public class HomeController(IConfiguration config) : Controller
    {
        public IActionResult Index()
        {
            return View(new IndexViewModel()
            {
                WebApiUrl = config.GetValue<string>("WebApiUrl")
            });
        }

    }
}
