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
        
        // Ali Models
        public DbSet<Course> Courses { get; set; }
        public DbSet<UserCourse> UserCourses { get; set; }
        public DbSet<Exam> Exams { get; set; }
        public DbSet<ExamResult> ExamResults { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Certificate> Certificates { get; set; }
    }
}
