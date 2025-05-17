namespace lending_skills_backend.Dtos.Requests;

public class RemoveTagRequest
{
    public Guid? Id { get; set; }
    public string Name { get; set; }
    public Guid? ProgramId { get; set; }
}