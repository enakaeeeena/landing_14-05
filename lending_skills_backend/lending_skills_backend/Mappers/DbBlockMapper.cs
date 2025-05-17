using lending_skills_backend.Dtos.Requests;
using lending_skills_backend.Models;

namespace lending_skills_backend.Mappers
{
    public static class DbBlockMapper
    {
        // Преобразование запроса создания блока в модель базы данных
        public static DbBlock ToDbBlock(this CreateBlockRequest request)
        {
            if (request == null) return null;

            // Создание нового блока с заполнением всех полей из запроса
            return new DbBlock
            {
                Id = Guid.NewGuid(),
                Type = request.type,
                Title = request.title,
                Content = request.content,
                Visible = request.visible,
                CreatedAt = DateTime.UtcNow,
                Date = request.date,
                IsExample = request.isExample
            };
        }

        // Преобразование запроса добавления блока на страницу в модель базы данных
        public static DbBlock Map(AddBlockToPageRequest request)
        {
            if (request == null) return null;

            // Создание нового блока для страницы с установкой значений по умолчанию
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
