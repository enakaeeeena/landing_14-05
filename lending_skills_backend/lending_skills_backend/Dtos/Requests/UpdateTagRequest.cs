namespace lending_skills_backend.Dtos.Requests;

public class UpdateTagRequest
{
    public Guid? Id { get; set; }
    public string OldName { get; set; }
    public string NewName { get; set; }
    public Guid? ProgramId { get; set; }
}