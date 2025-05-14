using lending_skills_backend.Dtos.Responses;
using lending_skills_backend.Models;

namespace lending_skills_backend.Mappers
{
    public class ProgramResponseMapper
    {
        public static ProgramResponse Map(DbProgram program)
        {
            if (program == null) return null;

            return new ProgramResponse
            {
                Id = program.Id,
                Name = program.Name,
                Menu = program.Menu,
                IsActive = program.IsActive,
                Pages = program.Pages?.Select(PageResponseMapper.Map).ToList() ?? new List<PageResponse>()
            };
        }
    }
}
