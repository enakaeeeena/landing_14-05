namespace lending_skills_backend.Dtos.Requests;

public class GetPageRequest
{
    public Guid ProgramId { get; set; }
    public bool IncludeExample { get; set; }
}
