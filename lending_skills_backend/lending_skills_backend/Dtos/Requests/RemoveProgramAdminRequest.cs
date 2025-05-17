namespace lending_skills_backend.Dtos.Requests
{
    public class RemoveProgramAdminRequest
    {
        public Guid UserId { get; set; }
        public Guid ProgramId { get; set; }
        public Guid AdminId { get; set; }
    }
}
