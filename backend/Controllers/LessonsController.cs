using Microsoft.AspNetCore.Mvc;
using FluentBee.Api.Data;
using Microsoft.EntityFrameworkCore;
using FluentBee.Api.Models;

namespace FluentBee.Api.Controllers
{
    [ApiController]
    [Route("v1/lessons")]
    public class LessonsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public LessonsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetLessons([FromQuery] int page = 1, [FromQuery] int limit = 20, [FromQuery] string? level = null)
        {
            var query = _context.Lessons.AsQueryable();

            if (!string.IsNullOrEmpty(level))
            {
                query = query.Where(l => l.Level == level);
            }

            var totalItems = await query.CountAsync();
            var totalPages = (int)Math.Ceiling(totalItems / (double)limit);

            var lessons = await query
                .Skip((page - 1) * limit)
                .Take(limit)
                .ToListAsync();

            return Ok(new
            {
                data = lessons,
                page,
                limit,
                totalItems,
                totalPages
            });
        }

        // ============================================
        // ALI SEKER GOREVLERI (YORUM SILME)
        // ============================================

        [HttpGet("{id}")]
        public async Task<IActionResult> GetLesson(Guid id)
        {
            var lesson = await _context.Lessons.FindAsync(id);
            if (lesson == null) return NotFound(new { message = "Ders bulunamadı." });
            return Ok(lesson);
        }

        // POST /v1/lessons/{id}/complete?userId=...
        [HttpPost("{id}/complete")]
        public async Task<IActionResult> CompleteLesson(Guid id, [FromQuery] Guid userId)
        {
            if (userId == Guid.Empty) return BadRequest(new { message = "userId gerekli." });

            var lesson = await _context.Lessons.FindAsync(id);
            if (lesson == null) return NotFound(new { message = "Ders bulunamadı." });

            // Aynı ders zaten tamamlanmış mı?
            var alreadyDone = await _context.Comments
                .AnyAsync(c => c.UserId == userId && c.LessonId == id && c.Content == "SYSTEM_COMPLETED");

            if (alreadyDone)
                return Ok(new { message = "Bu ders zaten tamamlanmış.", alreadyCompleted = true });

            // Comment tablosunu lesson completion için kullanıyoruz (Exam FK hatasını aşmak için)
            var result = new Comment
            {
                Id = Guid.NewGuid(),
                UserId = userId,
                LessonId = id,
                Content = "SYSTEM_COMPLETED",
                CreatedAt = DateTime.UtcNow
            };
            _context.Comments.Add(result);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Ders tamamlandı! 🎉", alreadyCompleted = false });
        }


        [HttpDelete("{lessonId}/comments/{commentId}")]
        public async Task<IActionResult> DeleteComment(Guid lessonId, Guid commentId)
        {
            var comment = await _context.Comments.FindAsync(commentId);
            if (comment == null || comment.LessonId != lessonId)
            {
                return NotFound();
            }

            _context.Comments.Remove(comment);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
