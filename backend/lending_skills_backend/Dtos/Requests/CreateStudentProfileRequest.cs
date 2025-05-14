namespace lending_skills_backend.Dtos.Requests;

public class CreateStudentProfileRequest
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Patronymic { get; set; }
    public string Email { get; set; }
    public int? YearOfStudyStart { get; set; }
    public Guid? ProgramId { get; set; }
}