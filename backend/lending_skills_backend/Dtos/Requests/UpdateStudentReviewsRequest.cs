using System;
using System.Collections.Generic;

namespace lending_skills_backend.Dtos.Requests;

public class UpdateStudentReviewsRequest
{
    public List<Guid> ReviewIds { get; set; }
}