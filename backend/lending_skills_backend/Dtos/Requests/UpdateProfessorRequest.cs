namespace lending_skills_backend.Dtos.Requests
{
    public class UpdateProfessorRequest
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Patronymic { get; set; }
        public Guid AdminId { get; set; }
    }
}
