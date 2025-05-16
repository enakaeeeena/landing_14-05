using System.ComponentModel.DataAnnotations;

namespace lending_skills_backend.Models;

public class DbLog
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();

    public DateTime Timestamp { get; set; } = DateTime.UtcNow;

    [Required]
    public string Action { get; set; } = string.Empty; // Например: "Register", "Login", "FailedLogin"

    public string? Description { get; set; } // Доп. инфо: Email, ошибка и т.д.

    public Guid? UserId { get; set; } // Можно null для неавторизованных попыток
}
