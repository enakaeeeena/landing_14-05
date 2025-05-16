using lending_skills_backend.Dtos.Responses;
using lending_skills_backend.Models;

namespace lending_skills_backend.Mappers;

public class TagResponseMapper
{
    public static TagResponse Map(DbTag tag)
    {
        if (tag == null) return null;

        return new TagResponse
        {
            Id = tag.Id,
            Name = tag.Name
        };
    }
}