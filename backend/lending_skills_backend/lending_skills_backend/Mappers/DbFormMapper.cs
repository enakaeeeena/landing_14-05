using lending_skills_backend.Dtos.Requests;
using lending_skills_backend.Models;

namespace lending_skills_backend.Mappers
{
    public class DbFormMapper
    {
        public static DbForm Map(FormRequest request)
        {
            return new DbForm
            {
                BlockId = request.BlockId,
                Data = request.Data,
                Date = DateTime.UtcNow,
                IsHidden = false
            };
        }
    }
}
