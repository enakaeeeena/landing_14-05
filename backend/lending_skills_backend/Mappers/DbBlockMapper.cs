using lending_skills_backend.Dtos.Requests;
using lending_skills_backend.Models;

namespace lending_skills_backend.Mappers
{
    public static class DbBlockMapper
    {
        public static DbBlock ToDbBlock(this CreateBlockRequest request)
        {
            if (request == null) return null;

            return new DbBlock
            {
                Id = Guid.NewGuid(),
                Type = request.Type,
                Title = request.Title,
                Content = request.Content,
                Visible = request.Visible,
                CreatedAt = DateTime.UtcNow,
                Date = request.Date,
                IsExample = request.IsExample
            };
        }

        public static DbBlock Map(AddBlockToPageRequest request)
        {
            if (request == null) return null;

            return new DbBlock
            {
                Id = Guid.NewGuid(),
                Type = request.Type,
                Title = request.Data,
                Content = request.Data,
                Visible = true,
                CreatedAt = DateTime.UtcNow,
                Date = DateTime.UtcNow.ToString("yyyy-MM-dd"),
                IsExample = request.IsExample
            };
        }
    }
}
