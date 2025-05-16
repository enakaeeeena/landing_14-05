namespace lending_skills_backend.Dtos.Requests
{
    public class EditProgramRequest
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Menu { get; set; }
        public bool IsActive { get; set; }
    }
}
