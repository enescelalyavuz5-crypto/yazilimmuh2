using Microsoft.AspNetCore.Mvc;
using FluentBee.Api.Data;
using Microsoft.EntityFrameworkCore;

namespace FluentBee.Api.Controllers
{
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
    }
}
