using System;

namespace lending_skills_backend.Dtos.Requests;

public class GetReviewsRequest
{
    public int PageNumber { get; set; }
    public int PageSize { get; set; }
    public Guid? ProgramId { get; set; }
    public Guid? UserId { get; set; }
    public DateTime? DateFrom { get; set; }
    public DateTime? DateTo { get; set; }
}