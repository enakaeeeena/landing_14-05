using lending_skills_backend.Dtos.Responses;
using lending_skills_backend.Models;

namespace lending_skills_backend.Mappers
{
    public static class FormResponseMapper
    {
        public static FormResponse ToResponse(this DbForm form)
        {
            if (form == null) return null;

            return new FormResponse
            {
                Id = form.Id,
                Data = form.Data,
                Date = form.Date,
                IsHidden = form.IsHidden,
                BlockId = form.BlockId
            };
        }

        public static FormResponse Map(DbForm form)
        {
            return form.ToResponse();
        }
    }
}
