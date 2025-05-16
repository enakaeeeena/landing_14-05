namespace lending_skills_backend.Dtos.Requests;

public class AddTagToWorkRequest
{
    public Guid TagId { get; set; }
    public Guid WorkId { get; set; }
}