using lending_skills_backend.Dtos.Requests;
using lending_skills_backend.Models;

namespace lending_skills_backend.Mappers;

public class DbWorkMapper
{
    public static DbWork Map(AddWorkRequest request)
    {
        return new DbWork
        {
            ProgramId = request.ProgramId,
            Name = request.Title,
            WorkDescription = request.Description,
            MainPhotoUrl = request.MainPhotoUrl,
            AdditionalPhotoUrls = request.AdditionalPhotoUrls,
            Tags = request.Tags,
            PublishDate = DateTime.UtcNow,
            Course = request.Course
        };
    }

    public static void Map(DbWork work, UpdateWorkRequest request)
    {
        work.ProgramId = request.ProgramId;
        work.Name = request.Title;
        work.WorkDescription = request.Description;
        work.MainPhotoUrl = request.MainPhotoUrl;
        work.AdditionalPhotoUrls = request.AdditionalPhotoUrls;
        work.Tags = request.Tags;
        work.Course = request.Course;
    }
}