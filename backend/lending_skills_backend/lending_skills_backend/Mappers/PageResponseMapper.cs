using lending_skills_backend.Dtos.Responses;
using lending_skills_backend.Models;

namespace lending_skills_backend.Mappers
{
    public class PageResponseMapper
    {
        public static PageResponse Map(DbPage page)
        {
            if (page == null) return null;

            return new PageResponse
            {
                Id = page.Id,
                Blocks = page.Blocks?.Select(BlockResponseMapper.Map).ToList() ?? new List<BlockResponse>()
            };
        }
    }
}
