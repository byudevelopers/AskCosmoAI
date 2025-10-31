using api.Models.DTO;
using api.services;
using Microsoft.AspNetCore.Mvc;
namespace api.Controllers;


[ApiController]
[Route("api/[controller]")]
public class AIController(IAIService aiService) : Controller
{
    private readonly IAIService _aiService = aiService;

    [HttpPost("ask")]
    public async Task<AIResponseDTO> Ask([FromBody] AIRequestDTO request)
    {
        return await _aiService.GetResponseAsync(request);
    }
}
