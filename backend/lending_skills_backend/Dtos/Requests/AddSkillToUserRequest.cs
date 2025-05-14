namespace lending_skills_backend.Dtos.Requests;

public class AddSkillToUserRequest
{
    public Guid SkillId { get; set; }
    public Guid UserId { get; set; }
}