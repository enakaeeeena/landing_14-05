using lending_skills_backend.Models;
using lending_skills_backend.Dtos.Requests;
using System;

namespace lending_skills_backend.Mappers
{
    public static class UpdateDbBlockMapper
    {
        public static void UpdateFromRequest(this DbBlock block, EditBlockRequest request)
        {
            try
            {
                if (request == null) return;
                if (block == null) throw new ArgumentNullException(nameof(block));

                // Обновление типа блока с проверкой на null
                if (request.type != null)
                {
                    block.Type = request.type.ToLower();
                }

                // Обновление заголовка блока
                if (request.title != null)
                {
                    block.Title = request.title;
                }
                
                // Обновление контента с проверкой размера данных
                if (request.content != null)
                {
                    if (request.content.Length > 1000000) // Ограничение в 1MB
                    {
                        throw new InvalidOperationException("Размер контента превышает максимально допустимый размер");
                    }
                    block.Content = request.content is string ? request.content : System.Text.Json.JsonSerializer.Serialize(request.content);
                }
                
                // Обновление статуса видимости блока
                if (request.visible.HasValue)
                {
                    block.Visible = request.visible.Value;
                }

                // Обновление даты блока
                if (request.date != null)
                {
                    block.Date = request.date;
                }
                
                // Обновление флага примера блока
                if (request.isExample != null)
                {
                    block.IsExample = request.isExample.ToString();
                }
                
                // Обновление временной метки последнего изменения
                block.UpdatedAt = DateTime.UtcNow;
            }
            catch (Exception ex)
            {
                // Логирование ошибки обновления блока
                Console.WriteLine($"Ошибка в UpdateFromRequest: {ex.Message}");
                Console.WriteLine($"Стек вызовов: {ex.StackTrace}");
                throw; // Проброс исключения для обработки в контроллере
            }
        }

        public static void Map(DbBlock block, EditBlockRequest request)
        {
            try
            {
                // Вызов метода обновления блока из запроса
                block.UpdateFromRequest(request);
            }
            catch (Exception ex)
            {
                // Логирование ошибки маппинга
                Console.WriteLine($"Ошибка в Map: {ex.Message}");
                Console.WriteLine($"Стек вызовов: {ex.StackTrace}");
                throw;
            }
        }
    }
}
