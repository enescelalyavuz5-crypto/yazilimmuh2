using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FluentBee.Api.Models
{
    public class Course
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Level { get; set; } = string.Empty;
    }

    public class UserCourse
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public Guid UserId { get; set; }
        [Required]
        public Guid CourseId { get; set; }
        public DateTime EnrolledAt { get; set; } = DateTime.UtcNow;

        [ForeignKey("UserId")]
        public User? User { get; set; }
        [ForeignKey("CourseId")]
        public Course? Course { get; set; }
    }

    public class Exam
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public string Title { get; set; } = string.Empty;
        public string Level { get; set; } = string.Empty;
    }

    public class ExamResult
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public Guid UserId { get; set; }
        [Required]
        public Guid ExamId { get; set; }
        public int Score { get; set; }
        public string AnswersJson { get; set; } = "[]"; // simple mockup to store answers
        public DateTime CompletedAt { get; set; } = DateTime.UtcNow;

        [ForeignKey("UserId")]
        public User? User { get; set; }
        [ForeignKey("ExamId")]
        public Exam? Exam { get; set; }
    }

    public class Comment
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public Guid UserId { get; set; }
        [Required]
        public Guid LessonId { get; set; }
        public string Content { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [ForeignKey("UserId")]
        public User? User { get; set; }
        [ForeignKey("LessonId")]
        public Lesson? Lesson { get; set; }
    }

    public class Certificate
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public Guid UserId { get; set; }
        [Required]
        public string Title { get; set; } = string.Empty;
        public string Issuer { get; set; } = "FluentBee";
        public DateTime IssuedAt { get; set; } = DateTime.UtcNow;

        [ForeignKey("UserId")]
        public User? User { get; set; }
    }
}
