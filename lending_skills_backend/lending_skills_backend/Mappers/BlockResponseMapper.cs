﻿using lending_skills_backend.Dtos.Responses;
using lending_skills_backend.Models;

namespace lending_skills_backend.Mappers
{
    public static class BlockResponseMapper
    {
        // Преобразование модели блока в объект ответа API
        public static BlockResponse ToResponse(this DbBlock block)
        {
            if (block == null) return null;

            // Создание объекта ответа с данными блока
            return new BlockResponse
            {
                Id = block.Id,
                Data = block.Content,
                IsExample = block.IsExample,
                Type = block.Type,
                NextBlockId = block.NextBlockId,
                PreviousBlockId = block.PreviousBlockId,
                Form = block.Form?.ToResponse()
            };
        }

        // Вспомогательный метод для маппинга блока в ответ API
        public static BlockResponse Map(DbBlock block)
        {
            return block.ToResponse();
        }
    }
}
