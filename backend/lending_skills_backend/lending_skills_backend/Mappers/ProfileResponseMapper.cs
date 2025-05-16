using lending_skills_backend.Dtos.Responses;
using lending_skills_backend.Models;
using System.Collections.Generic;

namespace lending_skills_backend.Mappers;

public class ProfileResponseMapper
{
    public static ProfileResponse Map(DbUser user, List<SkillResponse> skills)
    {
        if (user == null) return null;

        return new ProfileResponse
        {
            Id = user.Id,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Patronymic = user.Patronymic,
            Email = user.Email,
            YearOfStudyStart = user.YearOfStudyStart,
            IsActive = user.IsActive,
            Skills = skills
        };
    }
}