namespace lending_skills_backend.Dtos.Requests
{
    public class RemoveProfessorFromProgramRequest
    {
        public Guid ProfessorId { get; set; }
        public Guid ProgramId { get; set; }
        public Guid AdminId { get; set; }
    }
}
