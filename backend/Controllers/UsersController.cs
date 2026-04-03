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
            
            // For now mock completed lessons since Ali implements Course/Exam, not Lesson completions directly, 
            // though we can just return a dummy 0 for now.
            var completedLessons = 0; 

            return Ok(new LearningStatisticsDto
            {
                MemorizedWordsCount = memorizedWords,
                CompletedLessonsCount = completedLessons
            });
        }
    }
}
