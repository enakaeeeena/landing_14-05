using lending_skills_backend.Dtos.Responses;
using lending_skills_backend.Models;

namespace lending_skills_backend.Mappers
{
    public class ProfessorResponseMapper
    {
        public static ProfessorResponse Map(DbProfessor professor)
        {
            if (professor == null) return null;

            return new ProfessorResponse
            {
                Id = professor.Id,
                FirstName = professor.FirstName,
                LastName = professor.LastName,
                Patronymic = professor.Patronymic,
                Photo = professor.Photo,
                Link = professor.Link,
                Position = professor.Position
            };
        }
    }
}
