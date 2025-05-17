namespace lending_skills_backend.Dtos.Requests;
public class LoginRequest
{
    public string EmailOrLogin { get; set; } = null!;
    public string Password { get; set; } = null!;
}
