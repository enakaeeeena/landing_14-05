namespace lending_skills_backend.Dtos.Requests
{
    public class AddProfessorRequest
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string? Patronymic { get; set; }
        public string? Photo { get; set; }
        public string? Link { get; set; }
        public string Position { get; set; }
        public Guid AdminId { get; set; }
        public Guid? ProgramId { get; set; }
    }
}
