using System;
using System.Collections.Generic;

namespace lending_skills_backend.Dtos.Responses;

public class ProfileResponse
{
    public Guid Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Patronymic { get; set; }
    public string Email { get; set; }
    public int? YearOfStudyStart { get; set; }
    public bool IsActive { get; set; }
    public List<SkillResponse> Skills { get; set; }
}