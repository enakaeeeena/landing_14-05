using System;

namespace lending_skills_backend.Dtos.Requests;

public class AddReviewRequest
{
    public Guid ProgramId { get; set; }
    public string Content { get; set; }
}