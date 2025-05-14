namespace lending_skills_backend.Dtos.Requests;

public class RegisterRequest
{
    public string Email { get; set; } = null!;
    public string Login { get; set; } = null!;
    public string Password { get; set; } = null!;
    public bool IsStudent { get; set; }

    // Добавь это:
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
}
