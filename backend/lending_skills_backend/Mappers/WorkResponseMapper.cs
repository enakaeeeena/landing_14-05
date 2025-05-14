using lending_skills_backend.Dtos.Responses;
using lending_skills_backend.Models;
using System.Collections.Generic;

namespace lending_skills_backend.Mappers;

public class WorkResponseMapper
{
    public static WorkResponse Map(DbWork work, List<TagResponse> tags, List<SkillResponse> skills, int likesCount)
    {
        if (work == null) return null;

        return new WorkResponse
        {
            Id = work.Id,
            UserId = work.UserId,
            ProgramId = work.ProgramId,
            Title = work.Name,
            Description = work.WorkDescription,
            MainPhotoUrl = work.MainPhotoUrl,
            AdditionalPhotoUrls = work.AdditionalPhotoUrls,
            Tags = work.Tags,
            PublishDate = work.PublishDate,
            Course = work.Course,
            IsHide = work.IsHide,
            TagList = tags,
            SkillList = skills,
            LikesCount = likesCount
        };
    }
}