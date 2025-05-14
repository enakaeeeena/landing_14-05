using lending_skills_backend.Dtos.Requests;
using lending_skills_backend.Models;

namespace lending_skills_backend.Mappers;

public class DbReviewMapper
{
    public static DbReview Map(AddReviewRequest request)
    {
        return new DbReview
        {
            ProgramId = request.ProgramId,
            Content = request.Content
        };
    }
}