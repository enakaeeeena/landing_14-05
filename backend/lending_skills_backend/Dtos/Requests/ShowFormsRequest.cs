namespace lending_skills_backend.Dtos.Requests
{
    public class ShowFormsRequest
    {
        public Guid UserId { get; set; }
        public Guid? BlockId { get; set; }
        public List<Guid> FormIds { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
    }
}
