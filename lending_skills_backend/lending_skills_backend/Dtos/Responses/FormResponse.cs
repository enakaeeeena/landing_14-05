namespace lending_skills_backend.Dtos.Responses;

public class FormResponse
{
    public Guid Id { get; set; }
    public string Data { get; set; }
    public DateTime Date { get; set; }
    public bool IsHidden { get; set; }
    public Guid BlockId { get; set; }
}
