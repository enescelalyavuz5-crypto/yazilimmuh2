using System.ComponentModel.DataAnnotations;

namespace FluentBee.Api.Models
{
    public class Lesson
    {
        [Key]
        public Guid Id { get; set; }
        
        [Required]
        public string Title { get; set; } = string.Empty;
        
        [Required]
        public string Description { get; set; } = string.Empty;
        
        [Required]
        public string Content { get; set; } = string.Empty;
        
        public int DurationMinutes { get; set; }
        
        [Required]
        public string Level { get; set; } = string.Empty; // beginner, elementary, etc.
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
