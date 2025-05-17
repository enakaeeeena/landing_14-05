namespace lending_skills_backend.Dtos.Requests;

public class GetWorksRequest
{
    public int PageNumber { get; set; }
    public int PageSize { get; set; }
    public int? Year { get; set; }
    public Guid? UserId { get; set; }
    public Guid? ProgramId { get; set; }
    public bool? Favorite { get; set; }
    public bool ShowHidedWorks { get; set; }
}