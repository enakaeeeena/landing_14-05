using lending_skills_backend.Models;
using lending_skills_backend.Dtos.Requests;

namespace lending_skills_backend.Mappers
{
    public static class UpdateDbBlockMapper
    {
        public static void UpdateFromRequest(this DbBlock block, EditBlockRequest request)
        {
            if (request == null) return;

            block.Type = request.Type;
            block.Title = request.Title;
            block.Content = request.Content;
            block.Visible = request.Visible;
            block.Date = request.Date;
            block.IsExample = request.IsExample;
            block.UpdatedAt = DateTime.UtcNow;
        }

        public static void Map(DbBlock block, EditBlockRequest request)
        {
            block.UpdateFromRequest(request);
        }
    }
}
