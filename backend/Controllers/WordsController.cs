using Microsoft.AspNetCore.Mvc;
using FluentBee.Api.Data;
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
            {
                query = query.Where(w => w.Level == level);
            }

            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(w => w.English.Contains(search) || w.Turkish.Contains(search));
            }

            var totalItems = await query.CountAsync();
            var totalPages = (int)Math.Ceiling(totalItems / (double)limit);

            var words = await query
                .Skip((page - 1) * limit)
                .Take(limit)
                .ToListAsync();

            return Ok(new
            {
                data = words,
                page,
                limit,
                totalItems,
                totalPages
            });
        }
    }
}
