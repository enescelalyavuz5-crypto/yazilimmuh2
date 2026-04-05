using Microsoft.AspNetCore.Mvc;
using FluentBee.Api.Services;

namespace FluentBee.Api.Controllers
{
    [ApiController]
    [Route("v1/ai")]
    public class AiController : ControllerBase
    {
        private readonly GeminiAiService _aiService;

        public AiController(GeminiAiService aiService)
        {
            _aiService = aiService;
        }

        public class AiPracticeRequest
        {
            public Guid UserId { get; set; }
            public string Text { get; set; } = string.Empty;
            public string PracticeType { get; set; } = "grammar";
        }

        [HttpPost("practice")]
        public async Task<IActionResult> Practice([FromBody] AiPracticeRequest req)
        {
            // +5 Puanlık Yapay Zeka Gereksinimi - Real Implementation
            var aiResponse = await _aiService.EvaluateTextAsync(req.Text);
            
            var feedback = new 
            {
                originalText = req.Text,
                correctedText = aiResponse.CorrectedText,
                grammarIssues = aiResponse.GrammarIssues,
                score = aiResponse.Score,
                message = aiResponse.Message
            };

            return Ok(feedback);
        }
    }
}
