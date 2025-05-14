using System;

namespace lending_skills_backend.Dtos.Responses;

public class ReviewResponse
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public Guid ProgramId { get; set; }
    public string Content { get; set; }
    public DateTime CreatedDate { get; set; }
    public bool IsSelected { get; set; }
}