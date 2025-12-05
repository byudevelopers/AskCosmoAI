namespace api.services;

using api.Models.DTO;
using OpenAI.Chat;

public interface IAIService
{
    public Task<AIResponseDTO> GetResponseAsync(AIRequestDTO request);
}

public class MockAIService : IAIService
{
    public async Task<AIResponseDTO> GetResponseAsync(AIRequestDTO request)
    {
        return new AIResponseDTO(123, $"Mock response for prompt: '{request.Prompt}'");
    }
}

public class AIService(ChatClient client) : IAIService
{
    private readonly ChatClient _chatClient = client;

    public async Task<AIResponseDTO> GetResponseAsync(AIRequestDTO request)
    {
        var messages = new List<ChatMessage>
        {
            new SystemChatMessage("You are an assistant for BYU (Brigham Young University) students named after BYU's mascot, Cosmo."),
            new UserChatMessage(request.Prompt)
        };

        var response = await _chatClient.CompleteChatAsync([.. messages]);
        return new AIResponseDTO(1, response.Value.Content[0].Text);
    }
}
