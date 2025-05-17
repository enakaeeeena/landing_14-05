namespace lending_skills_backend.Dtos.Requests;

public class VerifyEmailRequest
{
    public string Email { get; set; } = null!;
    public string Code { get; set; } = null!;
}
