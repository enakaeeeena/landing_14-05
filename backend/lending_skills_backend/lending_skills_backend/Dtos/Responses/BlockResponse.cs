using System;

namespace lending_skills_backend.Dtos.Responses;

public class BlockResponse
{
    public Guid Id { get; set; }
    public string Data { get; set; }
    public string IsExample { get; set; }
    public string Type { get; set; }
    public Guid? NextBlockId { get; set; }
    public Guid? PreviousBlockId { get; set; }
    public FormResponse Form { get; set; }
}
