namespace lending_skills_backend.Dtos.Requests
{
    public class GetProfessorsRequest
    {
        public Guid? ProgramId { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Patronymic { get; set; }
        public int? PageNumber { get; set; }
        public int? PageSize { get; set; }
    }
}
