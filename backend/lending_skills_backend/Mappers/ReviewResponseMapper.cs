using lending_skills_backend.Dtos.Responses;
using lending_skills_backend.Models;

namespace lending_skills_backend.Mappers;

public class ReviewResponseMapper
{
    public static ReviewResponse Map(DbReview review)
    {
        if (review == null) return null;

        return new ReviewResponse
        {
            Id = review.Id,
            UserId = review.UserId,
            ProgramId = review.ProgramId,
            Content = review.Content,
            CreatedDate = review.CreatedDate,
            IsSelected = review.IsSelected
        };
    }
}