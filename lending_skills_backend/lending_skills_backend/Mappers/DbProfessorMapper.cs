using lending_skills_backend.Dtos.Requests;
using lending_skills_backend.Models;

namespace lending_skills_backend.Mappers
{
    public class DbProfessorMapper
    {
        public static DbProfessor Map(AddProfessorRequest request)
        {
            return new DbProfessor
            {
                Id = Guid.NewGuid(),
                FirstName = request.FirstName,
                LastName = request.LastName,
                Patronymic = request.Patronymic,
                Photo = request.Photo,
                Link = request.Link,
                Position = request.Position
            };
        }

        public static void Map(DbProfessor professor, UpdateProfessorRequest request)
        {
            professor.FirstName = request.FirstName;
            professor.LastName = request.LastName;
            professor.Patronymic = request.Patronymic;
        }
    }
}
