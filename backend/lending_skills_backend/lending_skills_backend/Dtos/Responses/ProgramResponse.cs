namespace lending_skills_backend.Dtos.Responses;

public class ProgramResponse
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Menu { get; set; }
    public bool IsActive { get; set; }
    public List<PageResponse> Pages { get; set; }
}
