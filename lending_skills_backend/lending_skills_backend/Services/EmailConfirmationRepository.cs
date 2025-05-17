using lending_skills_backend.DataAccess;
using lending_skills_backend.Models;
using Microsoft.EntityFrameworkCore;

namespace lending_skills_backend.Repositories;

public class EmailConfirmationRepository
{
    private readonly ApplicationDbContext _context;

    public EmailConfirmationRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task SaveCodeAsync(string email, string code)
    {
        var entity = new DbEmailConfirmation
        {
            Id = Guid.NewGuid(),
            Email = email,
            Code = code,
            CreatedAt = DateTime.UtcNow
        };

        _context.EmailConfirmations.Add(entity);
        await _context.SaveChangesAsync();
    }

    public async Task<string?> GetCodeAsync(string email)
    {
        var record = await _context.EmailConfirmations
            .Where(e => e.Email == email)
            .OrderByDescending(e => e.CreatedAt)
            .FirstOrDefaultAsync();

        return record?.Code;
    }

    public async Task RemoveCodeAsync(string email)
    {
        var records = await _context.EmailConfirmations
            .Where(e => e.Email == email)
            .ToListAsync();

        _context.EmailConfirmations.RemoveRange(records);
        await _context.SaveChangesAsync();
    }
}
