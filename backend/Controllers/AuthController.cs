using Microsoft.AspNetCore.Mvc;
using FluentBee.Api.Data;
using FluentBee.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace FluentBee.Api.Controllers
{
    public class LoginDto
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }

    [ApiController]
    [Route("v1/auth")]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AuthController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] StudentRegistrationDto dto)
        {
            if (await _context.Users.AnyAsync(u => u.Email == dto.Email))
            {
                return Conflict(new { message = "Email adresi zaten kullanımda." });
            }

            // In a real app we'd hash the password (e.g. using BCrypt), for demo we save it directly or a dummy hash.
            var user = new User
            {
                Id = Guid.NewGuid(),
                Email = dto.Email,
                // NEVER store plain text passwords in production!
                PasswordHash = dto.Password, 
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                EnglishLevel = dto.EnglishLevel,
                CreatedAt = DateTime.UtcNow
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Register), new { id = user.Id }, user);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
            if (user == null || user.PasswordHash != dto.Password)
            {
                return Unauthorized(new { message = "E-posta veya şifre hatalı." });
            }

            // In a real app, generate and return a JWT here. For now, return the user object (simulating session)
            return Ok(new { 
                token = "mock-jwt-token-" + user.Id,
                user = user 
            });
        }
    }
}
