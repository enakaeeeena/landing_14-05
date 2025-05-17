using System;
using System.Collections.Generic;

namespace lending_skills_backend.Dtos.Responses;

public class WorkResponse
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public Guid ProgramId { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string MainPhotoUrl { get; set; }
    public string AdditionalPhotoUrls { get; set; }
    public string Tags { get; set; }
    public DateTime PublishDate { get; set; }
    public int Course { get; set; }
    public bool IsHide { get; set; }
    public List<TagResponse> TagList { get; set; }
    public List<SkillResponse> SkillList { get; set; }
    public int LikesCount { get; set; }
}