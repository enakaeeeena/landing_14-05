namespace lending_skills_backend.Dtos.Requests;

public class AddSkillToWorkRequest
{
    public Guid SkillId { get; set; }
    public Guid WorkId { get; set; }
}