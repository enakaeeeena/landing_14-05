namespace lending_skills_backend.Dtos.Responses;

public class PageResponse
{
    public Guid Id { get; set; }
    public List<BlockResponse> Blocks { get; set; }
}
