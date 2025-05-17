using lending_skills_backend.Dtos.Requests;
using lending_skills_backend.Models;

namespace lending_skills_backend.Mappers;

public class DbTagMapper
{
    public static DbTag Map(AddTagRequest request)
    {
        return new DbTag
        {
            Name = request.Name
        };
    }

    public static void Map(DbTag tag, UpdateTagRequest request)
    {
        tag.Name = request.NewName;
    }
}