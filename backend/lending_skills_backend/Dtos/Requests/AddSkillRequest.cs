namespace lending_skills_backend.Dtos.Requests;

public class AddSkillRequest
{
    public string Name { get; set; }
    public Guid? ProgramId { get; set; }
}