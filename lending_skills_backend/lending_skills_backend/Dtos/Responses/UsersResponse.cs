namespace lending_skills_backend.Dtos.Responses
{
    public class GetUsersResponse
    {
        public List<UserResponse> Users { get; set; }
        public int TotalCount { get; set; }
    }
}
