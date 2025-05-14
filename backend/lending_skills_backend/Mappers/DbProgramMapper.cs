using lending_skills_backend.Dtos.Requests;
using lending_skills_backend.Models;

namespace lending_skills_backend.Mappers
{
    public class DbProgramMapper
    {
        public static DbProgram Map(AddProgramRequest request)
        {
            return new DbProgram
            {
                Name = request.Name,
                Menu = request.Menu,
                IsActive = false // По умолчанию
            };
        }
    }
}
