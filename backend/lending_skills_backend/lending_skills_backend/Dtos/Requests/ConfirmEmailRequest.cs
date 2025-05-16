namespace lending_skills_backend.Dtos.Requests;

public class ConfirmCodeRequest
{
    public string Email { get; set; }
    public string Code { get; set; }
}
