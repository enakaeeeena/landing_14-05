using lending_skills_backend.Dtos.Requests;
using lending_skills_backend.Models;

namespace lending_skills_backend.Mappers
{
    public class UpdateDbProgramMapper
    {
        public static void Map(DbProgram program, EditProgramRequest request)
        {
            program.Name = request.Name;
            program.Menu = request.Menu;
            program.IsActive = request.IsActive;
        }
    }
}
