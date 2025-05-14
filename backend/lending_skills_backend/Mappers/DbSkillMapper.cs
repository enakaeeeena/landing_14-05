using lending_skills_backend.Dtos.Requests;
using lending_skills_backend.Models;

namespace lending_skills_backend.Mappers;

public class DbSkillMapper
{
    public static DbSkill Map(AddSkillRequest request)
    {
        return new DbSkill
        {
            Name = request.Name
        };
    }

    public static void Map(DbSkill skill, UpdateSkillRequest request)
    {
        skill.Name = request.NewName;
    }
}