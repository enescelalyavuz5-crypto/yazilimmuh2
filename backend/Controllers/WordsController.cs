using Microsoft.AspNetCore.Mvc;
using FluentBee.Api.Data;
using FluentBee.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace FluentBee.Api.Controllers
{
    [ApiController]
    [Route("v1/words")]
    public class WordsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public WordsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetWords([FromQuery] int page = 1, [FromQuery] int limit = 20, [FromQuery] string? level = null, [FromQuery] string? search = null)
        {
            var query = _context.Words.AsQueryable();

            if (!string.IsNullOrEmpty(level))
                query = query.Where(w => w.Level == level);

            if (!string.IsNullOrEmpty(search))
                query = query.Where(w => w.English.Contains(search) || w.Turkish.Contains(search));

            var totalItems = await query.CountAsync();
            var totalPages = (int)Math.Ceiling(totalItems / (double)limit);
            var words = await query.Skip((page - 1) * limit).Take(limit).ToListAsync();

            return Ok(new { data = words, page, limit, totalItems, totalPages });
        }

        // POST /v1/words/{wordId}/favorite?userId=...
        [HttpPost("{wordId}/favorite")]
        public async Task<IActionResult> AddFavorite(Guid wordId, [FromQuery] Guid userId)
        {
            if (userId == Guid.Empty) return BadRequest(new { message = "userId gerekli." });

            var word = await _context.Words.FindAsync(wordId);
            if (word == null) return NotFound(new { message = "Kelime bulunamadı." });

            var existing = await _context.FavoriteWords
                .FirstOrDefaultAsync(f => f.UserId == userId && f.WordId == wordId);

            if (existing != null)
                return Conflict(new { message = "Zaten favorilerde." });

            var favorite = new FavoriteWord { Id = Guid.NewGuid(), UserId = userId, WordId = wordId };
            _context.FavoriteWords.Add(favorite);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Favorilere eklendi.", favoriteId = favorite.Id });
        }

        // DELETE /v1/words/{wordId}/favorite?userId=...
        [HttpDelete("{wordId}/favorite")]
        public async Task<IActionResult> RemoveFavorite(Guid wordId, [FromQuery] Guid userId)
        {
            if (userId == Guid.Empty) return BadRequest(new { message = "userId gerekli." });

            var favorite = await _context.FavoriteWords
                .FirstOrDefaultAsync(f => f.UserId == userId && f.WordId == wordId);

            if (favorite == null) return NotFound(new { message = "Favorilerde bulunamadı." });

            _context.FavoriteWords.Remove(favorite);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Favorilerden çıkarıldı." });
        }

        // GET /v1/words/favorites?userId=...
        [HttpGet("favorites")]
        public async Task<IActionResult> GetFavorites([FromQuery] Guid userId)
        {
            if (userId == Guid.Empty) return BadRequest(new { message = "userId gerekli." });

            var favorites = await _context.FavoriteWords
                .Where(f => f.UserId == userId)
                .Include(f => f.Word)
                .Select(f => f.Word)
                .ToListAsync();

            return Ok(new { data = favorites });
        }
    }
}
