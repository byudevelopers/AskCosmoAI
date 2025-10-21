using api.Models.DTO;
using Microsoft.AspNetCore.Mvc;
namespace api.Controllers;


[ApiController]
[Route("api/[controller]")]
public class AIController : Controller
{
    [HttpGet("ask")]
    public AIResponseDTO Ask()
    {
        return new AIResponseDTO(123, "This is a sample AI response!!!");
    }
}
