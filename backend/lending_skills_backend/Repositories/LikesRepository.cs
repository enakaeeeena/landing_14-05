using lending_skills_backend.DataAccess;
using lending_skills_backend.Models;
using Microsoft.EntityFrameworkCore;

namespace lending_skills_backend.Repositories;

public class LikesRepository
{
    private readonly ApplicationDbContext _context;

    public LikesRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<DbLike>> GetLikesAsync()
    {
        return await _context.Likes.ToListAsync();
    }

    public async Task<DbLike?> GetLikeByIdAsync(int likeId)
    {
        return await _context.Likes.FindAsync(likeId);
    }

    public async Task AddLikeAsync(DbLike like)
    {
        _context.Likes.Add(like);
        await _context.SaveChangesAsync();
    }

    public async Task RemoveLikeAsync(int likeId)
    {
        var like = await _context.Likes.FindAsync(likeId);
        if (like != null)
        {
            _context.Likes.Remove(like);
            await _context.SaveChangesAsync();
        }
    }
}
