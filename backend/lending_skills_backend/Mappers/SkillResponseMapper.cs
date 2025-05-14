using lending_skills_backend.Dtos.Responses;
using lending_skills_backend.Models;

namespace lending_skills_backend.Mappers;

public class SkillResponseMapper
{
    public static SkillResponse Map(DbSkill skill)
    {
        if (skill == null) return null;

        return new SkillResponse
        {
            Id = skill.Id,
            Name = skill.Name
        };
    }
}