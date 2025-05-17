namespace lending_skills_backend.Dtos.Requests
{
    public class ChangeBlockPositionRequest
    {
        public Guid BlockId { get; set; }
        public Guid? AfterBlockId { get; set; }
    }
}
