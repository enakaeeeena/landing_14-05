namespace lending_skills_backend.Dtos.Requests;

public class PasswordResetConfirmRequest
{
    public string Email { get; set; } = null!;
    public string Code { get; set; } = null!;
    public string NewPassword { get; set; } = null!;
}
