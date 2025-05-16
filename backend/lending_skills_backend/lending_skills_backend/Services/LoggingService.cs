using lending_skills_backend.DataAccess;
using lending_skills_backend.Models;

namespace lending_skills_backend.Services;
/*
public class LoggingService
{
    private readonly ApplicationDbContext _context;

    public LoggingService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task LogAsync(string action, string? description = null, Guid? userId = null)
    {
        var log = new DbLog
        {
            Action = action,
            Description = description,
            UserId = userId
        };

        _context.Logs.Add(log);
        await _context.SaveChangesAsync();
    }
}
*/