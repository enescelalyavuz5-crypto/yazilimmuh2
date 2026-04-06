using Microsoft.AspNetCore.Mvc;
using FluentBee.Api.Data;
using FluentBee.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace FluentBee.Api.Controllers
{
    [ApiController]
    [Route("v1/users")]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UsersController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPut("{userId}/profile")]
        public async Task<IActionResult> UpdateProfile(Guid userId, [FromBody] ProfileUpdateDto dto)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null) return NotFound();

            if (!string.IsNullOrEmpty(dto.FirstName)) user.FirstName = dto.FirstName;
            if (!string.IsNullOrEmpty(dto.LastName)) user.LastName = dto.LastName;
            if (!string.IsNullOrEmpty(dto.Password)) user.PasswordHash = dto.Password;
            
            user.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            return Ok(user);
        }

        [HttpPut("{userId}/study-goal")]
        public async Task<IActionResult> UpdateStudyGoal(Guid userId, [FromBody] StudyGoalUpdateDto dto)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null) return NotFound();

            user.DailyGoalMinutes = dto.DailyGoalMinutes;
            user.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            return Ok(new { user.Id, user.DailyGoalMinutes });
        }

        [HttpPost("{userId}/favorite-words")]
        public async Task<IActionResult> AddFavoriteWord(Guid userId, [FromBody] FavoriteWordCreateDto dto)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null) return Unauthorized();

            var word = await _context.Words.FindAsync(dto.WordId);
            if (word == null) return BadRequest();

            if (await _context.FavoriteWords.AnyAsync(fw => fw.UserId == userId && fw.WordId == dto.WordId))
            {
                return Conflict(new { message = "Kelime zaten favorilerinizde mevcut." });
            }

            var favoriteWord = new FavoriteWord
            {
                Id = Guid.NewGuid(),
                UserId = userId,
                WordId = dto.WordId,
                AddedAt = DateTime.UtcNow
            };

            _context.FavoriteWords.Add(favoriteWord);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(AddFavoriteWord), new { id = favoriteWord.Id }, favoriteWord);
        }

        [HttpDelete("{userId}/favorite-words/{wordId}")]
        public async Task<IActionResult> RemoveFavoriteWord(Guid userId, Guid wordId)
        {
            var favoriteWord = await _context.FavoriteWords
                .FirstOrDefaultAsync(fw => fw.UserId == userId && fw.WordId == wordId);
                
            if (favoriteWord == null) return NotFound();

            _context.FavoriteWords.Remove(favoriteWord);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("{userId}/statistics")]
        public async Task<IActionResult> GetStatistics(Guid userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null) return NotFound();

            var memorizedWords = await _context.FavoriteWords.CountAsync(fw => fw.UserId == userId);
            var completedLessons = await _context.Comments.CountAsync(c => c.UserId == userId && c.Content == "SYSTEM_COMPLETED"); 

            return Ok(new LearningStatisticsDto
            {
                MemorizedWordsCount = memorizedWords,
                CompletedLessonsCount = completedLessons
            });
        }

        // ============================================
        // ALI SEKER GOREVLERI (USER EXTENSIONS)
        // ============================================

        public class CourseEnrollmentDto { public Guid CourseId { get; set; } }

        [HttpPost("{userId}/courses")]
        public async Task<IActionResult> EnrollCourse(Guid userId, [FromBody] CourseEnrollmentDto dto)
        {
            if (await _context.UserCourses.AnyAsync(uc => uc.UserId == userId && uc.CourseId == dto.CourseId))
                return Conflict(new { message = "Kullanıcı zaten bu kursa kayıtlı" });

            var enrollment = new UserCourse
            {
                Id = Guid.NewGuid(),
                UserId = userId,
                CourseId = dto.CourseId,
                EnrolledAt = DateTime.UtcNow
            };
            _context.UserCourses.Add(enrollment);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(EnrollCourse), new { id = enrollment.Id }, enrollment);
        }

        public class ExamResultCreateDto { public Guid ExamId { get; set; } public int Score { get; set; } public string Answers { get; set; } = "[]"; }

        [HttpPost("{userId}/exam-results")]
        public async Task<IActionResult> AddExamResult(Guid userId, [FromBody] ExamResultCreateDto dto)
        {
            var result = new ExamResult
            {
                Id = Guid.NewGuid(),
                UserId = userId,
                ExamId = dto.ExamId,
                Score = dto.Score,
                AnswersJson = dto.Answers,
                CompletedAt = DateTime.UtcNow
            };
            _context.ExamResults.Add(result);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(AddExamResult), new { id = result.Id }, result);
        }

        public class ExamResultUpdateDto { public int Score { get; set; } public string Answers { get; set; } = "[]"; }

        [HttpPut("{userId}/exam-results/{examResultId}")]
        public async Task<IActionResult> UpdateExamResult(Guid userId, Guid examResultId, [FromBody] ExamResultUpdateDto dto)
        {
            var result = await _context.ExamResults.FindAsync(examResultId);
            if (result == null || result.UserId != userId) return NotFound();

            result.Score = dto.Score;
            result.AnswersJson = dto.Answers;
            await _context.SaveChangesAsync();
            return Ok(result);
        }

        [HttpDelete("{userId}")]
        public async Task<IActionResult> DeleteUser(Guid userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null) return NotFound();
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpGet("{userId}/certificates")]
        public async Task<IActionResult> GetCertificates(Guid userId)
        {
            var certs = await _context.Certificates.Where(c => c.UserId == userId).ToListAsync();
            return Ok(new { data = certs });
        }
    }
}
