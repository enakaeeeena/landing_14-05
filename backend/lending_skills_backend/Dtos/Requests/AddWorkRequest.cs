namespace lending_skills_backend.Dtos.Requests;

public class AddWorkRequest
{
    public Guid ProgramId { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string MainPhotoUrl { get; set; }
    public string AdditionalPhotoUrls { get; set; }
    public string Tags { get; set; }
    public int Course { get; set; }
}