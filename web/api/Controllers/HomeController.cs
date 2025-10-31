using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;


[ApiController]
[Route("api/[controller]")]
public class HomeController : Controller
{
    [HttpGet]
    public ActionResult<string> SayHello()
    {
        return "Hello from server!";
    }
}
