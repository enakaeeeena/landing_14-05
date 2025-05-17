namespace lending_skills_backend.Dtos.Responses
{
    public class ProfessorResponse
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Patronymic { get; set; }

        public string? Photo { get; set; }
        public string? Link { get; set; }
        public string Position { get; set; }
    }
}
