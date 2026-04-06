using System.ComponentModel.DataAnnotations;

namespace FluentBee.Api.Models
{
    public class StudentRegistrationDto
    {
        [Required] [EmailAddress] public string Email { get; set; } = string.Empty;
        [Required] [MinLength(8)] public string Password { get; set; } = string.Empty;
        [Required] [MinLength(2)] public string FirstName { get; set; } = string.Empty;
        [Required] [MinLength(2)] public string LastName { get; set; } = string.Empty;
        [Required] public string EnglishLevel { get; set; } = "beginner";
    }

    public class ProfileUpdateDto
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Password { get; set; }
    }

    public class StudyGoalUpdateDto
    {
        public int DailyGoalMinutes { get; set; }
    }

    public class FavoriteWordCreateDto
    {
        [Required] public Guid WordId { get; set; }
    }
    
    public class LearningStatisticsDto
    {
        public int MemorizedWordsCount { get; set; }
        public int CompletedLessonsCount { get; set; }
    }
}
