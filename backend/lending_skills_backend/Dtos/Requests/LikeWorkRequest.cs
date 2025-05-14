namespace lending_skills_backend.Dtos.Requests;

public class LikeWorkRequest
{
    public Guid WorkId { get; set; }
    public Guid? UserId { get; set; }
}