namespace lending_skills_backend.Dtos.Requests
{
    public class GetFormsRequest
    {
        public Guid UserId { get; set; }
        public Guid? ProgramId { get; set; }
        public Guid? BlockId { get; set; }
        public bool IncludeHidden { get; set; } = false;
        public int? PageNumber { get; set; }
        public int? PageSize { get; set; }
    }
}
