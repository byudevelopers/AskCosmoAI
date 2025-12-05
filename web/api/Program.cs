using api.services;
using OpenAI;

var builder = WebApplication.CreateBuilder(args);

var apiKey = builder.Configuration["OPENAI_API_KEY"];

if (string.IsNullOrWhiteSpace(apiKey))
{
    throw new InvalidOperationException("No OpenAI API key found");
}
var chatClient = new OpenAIClient(apiKey).GetChatClient("gpt-5-nano");

builder.Services.AddSingleton(chatClient);
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddScoped<IAIService, AIService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("dev", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});


var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseCors("dev");
}
else
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseRouting();
app.UseAuthorization();
app.MapControllers();

app.Run();