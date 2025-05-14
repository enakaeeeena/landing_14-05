namespace lending_skills_backend.Models;

public class PasswordResetCode
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Email { get; set; } = null!;
    public string Code { get; set; } = null!;
    public DateTime Expiration { get; set; }
}
