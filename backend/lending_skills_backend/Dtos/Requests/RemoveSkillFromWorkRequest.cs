namespace lending_skills_backend.Dtos.Requests;

public class RemoveSkillFromWorkRequest
{
    public Guid SkillId { get; set; }
    public Guid WorkId { get; set; }
}