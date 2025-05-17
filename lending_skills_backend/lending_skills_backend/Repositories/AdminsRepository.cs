using lending_skills_backend.DataAccess;
using lending_skills_backend.Models;
using Microsoft.EntityFrameworkCore;

namespace lending_skills_backend.Repositories;

public class AdminsRepository
{
    private readonly ApplicationDbContext _context;

    public AdminsRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<DbAdmin>> GetAdminsAsync()
    {
        return await _context.Admins.ToListAsync();
    }

    public async Task<DbAdmin?> GetAdminByIdAsync(Guid userId, Guid programId)
    {
        return await _context.Admins.FindAsync(userId, programId);
    }

    public async Task AddAdminAsync(DbAdmin admin)
    {
        _context.Admins.Add(admin);
        await _context.SaveChangesAsync();
    }

    public async Task RemoveAdminAsync(Guid userId, Guid programId)
    {
        var admin = await _context.Admins.FindAsync(userId, programId);
        if (admin != null)
        {
            _context.Admins.Remove(admin);
            await _context.SaveChangesAsync();
        }
    }
}