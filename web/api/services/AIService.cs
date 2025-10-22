namespace api.services;

using api.Models.DTO;

public interface IAIService
{
    public Task<AIResponseDTO> GetResponseAsync(AIRequestDTO request);
}

public class MockAIService : IAIService
{
    public Task<AIResponseDTO> GetResponseAsync(AIRequestDTO request)
    {
        return Task.FromResult(new AIResponseDTO(
            123,
            $"Mock response for prompt: '{request.Prompt}'"
        ));
    }
}

public class AIService : IAIService
{
    public Task<AIResponseDTO> GetResponseAsync(AIRequestDTO request)
    {
        return Task.FromResult(new AIResponseDTO(
            1,
            $"This is the real AI service: '{request.Prompt}'"
        ));
    }
}