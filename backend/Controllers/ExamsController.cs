using Microsoft.AspNetCore.Mvc;
using FluentBee.Api.Data;
using FluentBee.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace FluentBee.Api.Controllers
{
    // Author: Ali Şeker
    // Requirement: Sınavları Listeleme ve Sınav Sonucu Ekleme
    [ApiController]
    [Route("v1/exams")]
    public class ExamsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ExamsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetExams([FromQuery] int page = 1, [FromQuery] int limit = 20, [FromQuery] string? level = null)
        {
            var query = _context.Exams.AsQueryable();
            if (!string.IsNullOrEmpty(level))
                query = query.Where(e => e.Level == level);

            var totalItems = await query.CountAsync();
            var totalPages = (int)Math.Ceiling(totalItems / (double)limit);
            var items = await query.Skip((page - 1) * limit).Take(limit).ToListAsync();

            return Ok(new { data = items, page, limit, totalItems, totalPages });
        }

        // GET /v1/exams/{id}/questions - Sınava ait soruları döner (in-memory, seviyeye göre)
        [HttpGet("{id}/questions")]
        public async Task<IActionResult> GetQuestions(Guid id)
        {
            var exam = await _context.Exams.FindAsync(id);
            if (exam == null) return NotFound(new { message = "Sınav bulunamadı." });

            var questions = GetQuestionsForLevel(exam.Level);
            return Ok(new { examId = id, examTitle = exam.Title, level = exam.Level, questions });
        }

        // POST /v1/exams/{id}/submit - Sınav sonucunu kaydet
        [HttpPost("{id}/submit")]
        public async Task<IActionResult> SubmitExam(Guid id, [FromBody] ExamSubmitDto dto)
        {
            var exam = await _context.Exams.FindAsync(id);
            if (exam == null) return NotFound(new { message = "Sınav bulunamadı." });

            var questions = GetQuestionsForLevel(exam.Level);
            int correct = 0;
            for (int i = 0; i < questions.Count && i < dto.Answers.Count; i++)
            {
                if (questions[i].CorrectAnswer == dto.Answers[i]) correct++;
            }
            int score = (int)Math.Round((double)correct / questions.Count * 100);

            if (dto.UserId != Guid.Empty)
            {
                var result = new ExamResult
                {
                    Id = Guid.NewGuid(),
                    UserId = dto.UserId,
                    ExamId = id,
                    Score = score,
                    AnswersJson = System.Text.Json.JsonSerializer.Serialize(dto.Answers),
                    CompletedAt = DateTime.UtcNow
                };
                _context.ExamResults.Add(result);

                if (score >= 60)
                {
                    var user = await _context.Users.FindAsync(dto.UserId);
                    if (user != null)
                    {
                        user.EnglishLevel = exam.Level ?? "A1";
                        user.UpdatedAt = DateTime.UtcNow;
                    }
                }

                await _context.SaveChangesAsync();
            }

            return Ok(new { score, correct, total = questions.Count, passed = score >= 60 });
        }

        public class ExamSubmitDto
        {
            public Guid UserId { get; set; }
            public List<string> Answers { get; set; } = new();
        }

        private static List<ExamQuestion> GetQuestionsForLevel(string level) => level switch
        {
            "A1" => new List<ExamQuestion>
            {
                new("What is the correct form? 'I ___ a student.'", new[]{"am","is","are","be"}, "am"),
                new("Choose the correct word: 'She ___ to school every day.'", new[]{"go","goes","going","went"}, "goes"),
                new("What does 'Book' mean in Turkish?", new[]{"Kalem","Kitap","Defter","Masa"}, "Kitap"),
                new("'Apple' in Turkish is:", new[]{"Portakal","Armut","Elma","Üzüm"}, "Elma"),
                new("Fill in the blank: 'They ___ happy.'", new[]{"is","am","are","be"}, "are"),
            },
            "B1" => new List<ExamQuestion>
            {
                new("Choose the correct tense: 'She ___ TV when I called.'", new[]{"watches","watched","was watching","has watched"}, "was watching"),
                new("Which is correct? 'If I ___ rich, I would travel.'", new[]{"am","was","were","be"}, "were"),
                new("'Diligent' means:", new[]{"Lazy","Hardworking","Careless","Slow"}, "Hardworking"),
                new("Choose the correct passive form: 'The letter ___ yesterday.'", new[]{"was written","wrote","is written","writes"}, "was written"),
                new("Fill in: 'He has ___ to Paris three times.'", new[]{"gone","went","go","going"}, "gone"),
            },
            "C1" => new List<ExamQuestion>
            {
                new("'Eloquent' best describes someone who:", new[]{"speaks vaguely","speaks persuasively","speaks loudly","speaks rarely"}, "speaks persuasively"),
                new("Which sentence uses the subjunctive correctly?", new[]{"I wish I was taller.","I wish I were taller.","I wish I am taller.","I wish I be taller."}, "I wish I were taller."),
                new("'Benevolent' means:", new[]{"Cruel","Well-meaning","Indifferent","Boastful"}, "Well-meaning"),
                new("Choose the most formal alternative to 'get':", new[]{"fetch","obtain","grab","take"}, "obtain"),
                new("Identify the correct use of 'despite': ", new[]{"Despite of the rain, we went out.","Despite the rain, we went out.","Despite that it rained, we went out.","Despite raining, we went."}, "Despite the rain, we went out."),
            },
            _ => new List<ExamQuestion>
            {
                new("What is 2 + 2?", new[]{"3","4","5","6"}, "4"),
            }
        };

        private record ExamQuestion(string Question, string[] Options, string CorrectAnswer);
    }
}

