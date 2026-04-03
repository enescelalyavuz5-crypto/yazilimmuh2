using System.ComponentModel.DataAnnotations;

namespace FluentBee.Api.Models
{
    public class Word
    {
        [Key]
        public Guid Id { get; set; }
        
        [Required]
        public string English { get; set; } = string.Empty;
        
        [Required]
        public string Turkish { get; set; } = string.Empty;
        
        public string PartOfSpeech { get; set; } = string.Empty;
        public string ExampleSentence { get; set; } = string.Empty;
        
        [Required]
        public string Level { get; set; } = string.Empty; // beginner, elementary, etc.
    }
}
