using lending_skills_backend.DataAccess;
using lending_skills_backend.Models;
using Microsoft.EntityFrameworkCore;

namespace lending_skills_backend.Repositories;

public class TokensRepository
{
    private readonly ApplicationDbContext _context;

    public TokensRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<DbToken>> GetTokensAsync()
    {
        return await _context.Tokens.ToListAsync();
    }

    public async Task AddTokenAsync(DbToken token)
    {
        _context.Tokens.Add(token);
        await _context.SaveChangesAsync();
    }
}