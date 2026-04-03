using Microsoft.EntityFrameworkCore;
using FluentBee.Api.Models;

namespace FluentBee.Api.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Word> Words { get; set; }
        public DbSet<FavoriteWord> FavoriteWords { get; set; }
        public DbSet<Lesson> Lessons { get; set; }
    }
}
