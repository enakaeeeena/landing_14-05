namespace lending_skills_backend.Dtos.Requests;

public class AddTagRequest
{
    public string Name { get; set; }
    public Guid? ProgramId { get; set; }
}