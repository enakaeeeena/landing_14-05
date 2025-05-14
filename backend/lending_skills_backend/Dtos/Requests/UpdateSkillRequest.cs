namespace lending_skills_backend.Dtos.Requests;

public class UpdateSkillRequest
{
    public Guid? Id { get; set; }
    public string OldName { get; set; }
    public string NewName { get; set; }
    public Guid? ProgramId { get; set; }
}