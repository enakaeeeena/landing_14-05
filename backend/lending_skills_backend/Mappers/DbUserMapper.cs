using lending_skills_backend.Dtos.Requests;
using lending_skills_backend.Models;

namespace lending_skills_backend.Mappers;

public class DbUserMapper
{
    public static DbUser Map(CreateStudentProfileRequest request)
    {
        return new DbUser
        {
            FirstName = request.FirstName,
            LastName = request.LastName,
            Patronymic = request.Patronymic,
            Email = request.Email,
            YearOfStudyStart = request.YearOfStudyStart
        };
    }

    public static void Map(DbUser user, UpdateProfileRequest request)
    {
        user.FirstName = request.FirstName;
        user.LastName = request.LastName;
        user.Patronymic = request.Patronymic;
        user.Email = request.Email;
        user.YearOfStudyStart = request.YearOfStudyStart;
    }
}