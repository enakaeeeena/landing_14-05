using System.ComponentModel.DataAnnotations;

namespace lending_skills_backend.Models;

public class DbEmailConfirmation
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    public string Email { get; set; } = null!;

    [Required]
    public string Code { get; set; } = null!;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
