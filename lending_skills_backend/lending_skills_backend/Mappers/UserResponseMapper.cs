using lending_skills_backend.Dtos.Responses;
using lending_skills_backend.Models;

namespace lending_skills_backend.Mappers
{
    public class UserResponseMapper
    {
        public static UserResponse Map(DbUser user)
        {
            if (user == null) return null;

            return new UserResponse
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Patronymic = user.Patronymic
            };
        }
    }
}
