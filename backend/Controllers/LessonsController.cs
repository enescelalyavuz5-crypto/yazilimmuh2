using Microsoft.AspNetCore.Mvc;
using FluentBee.Api.Data;
using Microsoft.EntityFrameworkCore;

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
    }
}
