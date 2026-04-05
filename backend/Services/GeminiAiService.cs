using System.Text.Json;
using System.Text.Json.Serialization;

namespace FluentBee.Api.Services
{
    public class GeminiAiService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _config;
        private readonly string? _apiKey;

        public GeminiAiService(HttpClient httpClient, IConfiguration config)
        {
            _httpClient = httpClient;
            _config = config;
            _apiKey = _config["GeminiApiKey"];
        }

        public async Task<AiFeedbackResponse> EvaluateTextAsync(string text)
        {
            if (string.IsNullOrWhiteSpace(_apiKey))
            {
                // Fallback to mock if no API key is provided
                return new AiFeedbackResponse
                {
                    Score = 85,
                    Message = "Good try! (Mock environment: No API Key provided in appsettings.json)",
                    CorrectedText = text + " (Mock: Corrected)",
                    GrammarIssues = new[] { "API key is missing, mock response provided." }
                };
            }
            var url = $"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={_apiKey}";
            
            var prompt = $@"
Sen arkadaş canlısı ve cesaret verici bir İngilizce öğretmenisin. Karşındaki kişi İngilizce öğrenen bir Türk öğrenci.
Aşağıdaki İngilizce metni analiz et:
\""{text}\""

Bana **sadece** aşağıdaki JSON formatında cevap ver (kod bloğu kullanma, direkt saf JSON gönder):
{{
  ""score"": 0-100 (İngilizce seviye ve doğruluğuna göre puan),
  ""message"": ""Öğrenciye arkadaşça geri bildirim ve ipuçları (TÜRKÇE YAZILACAK)"",
  ""correctedText"": ""Cümlenin eksiksiz olarak düzeltilmiş İngilizce hali"",
  ""grammarIssues"": [""Hata 1 (TÜRKÇE KISA AÇIKLAMA)"", ""Hata 2""] (Yoksa boş dizi)
}}
Tüm 'message' ve 'grammarIssues' alanları kesinlikle TÜRKÇE doldurulmalıdır.
";

            var requestBody = new
            {
                contents = new[]
                {
                    new
                    {
                        parts = new[] { new { text = prompt } }
                    }
                },
                generationConfig = new
                {
                    responseMimeType = "application/json"
                }
            };

            var content = new StringContent(JsonSerializer.Serialize(requestBody), System.Text.Encoding.UTF8, "application/json");
            
            var response = await _httpClient.PostAsync(url, content);
            if (!response.IsSuccessStatusCode)
            {
                return new AiFeedbackResponse
                {
                    Score = 0,
                    Message = "Error connecting to AI.",
                    CorrectedText = text,
                    GrammarIssues = new[] { $"HTTP Status: {response.StatusCode}" }
                };
            }

            var responseJson = await response.Content.ReadAsStringAsync();
            
            try
            {
                using var document = JsonDocument.Parse(responseJson);
                var root = document.RootElement;
                if (root.TryGetProperty("candidates", out var candidates) && candidates.GetArrayLength() > 0)
                {
                    var contentObj = candidates[0].GetProperty("content");
                    var partsList = contentObj.GetProperty("parts");
                    if (partsList.GetArrayLength() > 0)
                    {
                        var aiOutput = partsList[0].GetProperty("text").GetString() ?? "{}";
                        
                        // Parse inner JSON
                        var resultObj = JsonSerializer.Deserialize<AiFeedbackResponse>(aiOutput, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
                        if (resultObj != null)
                        {
                            return resultObj;
                        }
                    }
                }
            }
            catch(Exception ex)
            {
                return new AiFeedbackResponse
                {
                    Score = 0,
                    Message = "Failed to parse AI response.",
                    CorrectedText = text,
                    GrammarIssues = new[] { ex.Message }
                };
            }

            return new AiFeedbackResponse
            {
                Score = 0,
                Message = "Unknown error occurred.",
                CorrectedText = text,
                GrammarIssues = Array.Empty<string>()
            };
        }
    }

    public class AiFeedbackResponse
    {
        [JsonPropertyName("score")]
        public int Score { get; set; }
        
        [JsonPropertyName("message")]
        public string Message { get; set; } = string.Empty;
        
        [JsonPropertyName("correctedText")]
        public string CorrectedText { get; set; } = string.Empty;
        
        [JsonPropertyName("grammarIssues")]
        public string[] GrammarIssues { get; set; } = Array.Empty<string>();
    }
}
