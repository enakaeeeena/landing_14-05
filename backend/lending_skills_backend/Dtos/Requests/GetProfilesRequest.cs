namespace lending_skills_backend.Dtos.Requests;

public class GetProfilesRequest
{
    public int PageNumber { get; set; }
    public int PageSize { get; set; }
    public Guid? ProgramId { get; set; }
    public string SearchQuery { get; set; }
}