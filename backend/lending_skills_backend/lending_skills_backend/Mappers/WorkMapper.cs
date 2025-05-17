using lending_skills_backend.Models;

namespace lending_skills_backend.Mappers;

public static class WorkMapper
{
    public static Work ToWork(this DbWork dbWork)
    {
        return new Work
        {
            Id = dbWork.Id.GetHashCode(),
            Title = dbWork.Name,
            Description = dbWork.WorkDescription,
            Image = dbWork.MainPhotoUrl,
            IsFeatured = dbWork.Favorite,
            CreatedAt = dbWork.PublishDate,
            Author = dbWork.User?.FirstName + " " + dbWork.User?.LastName
        };
    }

    public static DbWork ToDbWork(this Work work)
    {
        return new DbWork
        {
            Id = Guid.NewGuid(),
            Name = work.Title,
            WorkDescription = work.Description,
            MainPhotoUrl = work.Image,
            Favorite = work.IsFeatured,
            PublishDate = work.CreatedAt
        };
    }
} 