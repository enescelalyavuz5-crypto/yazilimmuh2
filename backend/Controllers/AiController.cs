using Microsoft.AspNetCore.Mvc;

namespace FluentBee.Api.Controllers
{
    [ApiController]
    [Route("v1/ai")]
    public class AiController : ControllerBase
    {
        public class AiPracticeRequest
        {
            public Guid UserId { get; set; }
            public string Text { get; set; } = string.Empty;
            public string PracticeType { get; set; } = "grammar";
        }

        [HttpPost("practice")]
        public IActionResult Practice([FromBody] AiPracticeRequest req)
        {
            // +5 Puanlık Yapay Zeka Gereksinimi - Mock Implementation
            // In a real scenario, this would call OpenAI/Gemini API to evaluate req.Text
            
            var feedback = new 
            {
                originalText = req.Text,
                correctedText = req.Text + " (Mock: Corrected)",
                grammarIssues = new[] { "Used wrong past tense for 'go' -> 'went'" },
                score = 85,
                message = "Good try! Watch out for past tense irregular verbs."
            };

            return Ok(feedback);
        }
    }
}
