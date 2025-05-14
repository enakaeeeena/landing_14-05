namespace lending_skills_backend.Dtos.Requests;

public class UnlikeWorkRequest
{
    public Guid WorkId { get; set; }
    public Guid? UserId { get; set; }
}