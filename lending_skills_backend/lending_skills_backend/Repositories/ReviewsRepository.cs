using lending_skills_backend.DataAccess;
using lending_skills_backend.Models;
using Microsoft.EntityFrameworkCore;

namespace lending_skills_backend.Repositories;

public class ReviewsRepository
{
    private readonly ApplicationDbContext _context;

    public ReviewsRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<DbReview>> GetReviewsAsync(
        int pageNumber,
        int pageSize,
        Guid? programId,
        Guid? userId,
        DateTime? dateFrom,
        DateTime? dateTo)
    {
        var query = _context.Reviews
            .Include(r => r.User)
            .Include(r => r.Program)
            .AsQueryable();

        if (programId.HasValue)
        {
            query = query.Where(r => r.ProgramId == programId.Value);
        }

        if (userId.HasValue)
        {
            query = query.Where(r => r.UserId == userId.Value);
        }

        if (dateFrom.HasValue)
        {
            query = query.Where(r => r.CreatedDate >= dateFrom.Value);
        }

        if (dateTo.HasValue)
        {
            query = query.Where(r => r.CreatedDate <= dateTo.Value);
        }

        return await query
            .OrderByDescending(r => r.CreatedDate)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();
    }

    public async Task<DbReview?> GetReviewByIdAsync(Guid reviewId)
    {
        return await _context.Reviews
            .Include(r => r.User)
            .Include(r => r.Program)
            .FirstOrDefaultAsync(r => r.Id == reviewId);
    }

    public async Task AddReviewAsync(DbReview review)
    {
        _context.Reviews.Add(review);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateSelectedReviewsAsync(IEnumerable<Guid> reviewIds)
    {
        var allReviews = await _context.Reviews.ToListAsync();
        foreach (var review in allReviews)
        {
            review.IsSelected = reviewIds.Contains(review.Id);
        }
        await _context.SaveChangesAsync();
    }
}
