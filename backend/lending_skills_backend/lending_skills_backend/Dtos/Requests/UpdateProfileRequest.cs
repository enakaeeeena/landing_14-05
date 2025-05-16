namespace lending_skills_backend.Dtos.Requests;

public class UpdateProfileRequest
{
    public Guid Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Patronymic { get; set; }
    public string Email { get; set; }
    public int? YearOfStudyStart { get; set; }
}