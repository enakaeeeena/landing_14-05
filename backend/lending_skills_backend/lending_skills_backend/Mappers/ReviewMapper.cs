using lending_skills_backend.Models;

namespace lending_skills_backend.Mappers;

public static class ReviewMapper
{
    public static Review ToReview(this DbReview dbReview)
    {
        return new Review
        {
            Id = dbReview.Id,
            AuthorName = dbReview.User?.FirstName + " " + dbReview.User?.LastName,
            AuthorTitle = dbReview.User?.Role,
            AuthorImage = "", // TODO: Add user image if needed
            Content = dbReview.Content,
            IsFeatured = dbReview.IsFeatured,
            CreatedAt = dbReview.CreatedDate
        };
    }

    public static DbReview ToDbReview(this Review review)
    {
        return new DbReview
        {
            Id = review.Id,
            Content = review.Content,
            IsFeatured = review.IsFeatured,
            CreatedDate = review.CreatedAt
        };
    }
} 