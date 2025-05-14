
using lending_skills_backend.DataAccess;
using lending_skills_backend.Models;
using Microsoft.EntityFrameworkCore;

namespace lending_skills_backend.Repositories;

public class UsersRepository
{
    private readonly ApplicationDbContext _context;

    public UsersRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<DbUser>> GetProfilesAsync(
        int pageNumber,
        int pageSize,
        Guid? programId,
        string searchQuery)
    {
        var query = _context.Users
            .Where(u => u.Role == "Student")
            .AsQueryable();

        if (programId.HasValue)
        {
            query = query.Where(u => _context.Works.Any(w => w.UserId == u.Id && w.ProgramId == programId.Value));
        }

        if (!string.IsNullOrEmpty(searchQuery))
        {
            query = query.Where(u =>
                u.FirstName.Contains(searchQuery) ||
                u.LastName.Contains(searchQuery) ||
                u.Patronymic.Contains(searchQuery));
        }

        return await query
            .OrderBy(u => u.LastName)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();
    }

    public async Task<DbUser?> GetProfileByIdAsync(Guid userId)
    {
        return await _context.Users
            .FirstOrDefaultAsync(u => u.Id == userId && u.Role == "Student");
    }

    public async Task<IEnumerable<DbUser>> GetAdminsAsync()
    {
        return await _context.Users
            .Where(u => u.IsAdmin)
            .ToListAsync();
    }

    public async Task<DbUser?> GetUserByIdAsync(Guid userId)
    {
        return await _context.Users
            .FirstOrDefaultAsync(u => u.Id == userId);
    }

    public async Task AddUserAsync(DbUser user)
    {
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
    }


    public async Task UpdateUserAsync(DbUser user)
    {
        _context.Users.Update(user);
        await _context.SaveChangesAsync();
    }

    public async Task<bool> SwitchActiveStatusAsync(Guid userId, bool isActive)
    {
        var user = await _context.Users.FindAsync(userId);
        if (user == null) return false;

        user.Role = isActive ? "Active" : "Inactive"; 
        _context.Users.Update(user);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<(IEnumerable<DbUser> Users, int TotalCount)> GetUsersAsync(
        string? firstName,
        string? lastName,
        string? patronymic,
        int? pageNumber,
        int? pageSize)
    {
        var query = _context.Users.AsQueryable();

        // Фильтрация по имени, фамилии, отчеству
        if (!string.IsNullOrEmpty(firstName))
        {
            query = query.Where(u => u.FirstName.Contains(firstName));
        }
        if (!string.IsNullOrEmpty(lastName))
        {
            query = query.Where(u => u.LastName.Contains(lastName));
        }
        if (!string.IsNullOrEmpty(patronymic))
        {
            query = query.Where(u => u.Patronymic != null && u.Patronymic.Contains(patronymic));
        }

        // Подсчёт общего количества
        var totalCount = await query.CountAsync();

        // Пагинация
        if (pageNumber.HasValue && pageSize.HasValue)
        {
            query = query
                .Skip((pageNumber.Value - 1) * pageSize.Value)
                .Take(pageSize.Value);
        }

        var users = await query.ToListAsync();
        return (users, totalCount);
    }

    public async Task AddProgramAdminAsync(Guid userId, Guid programId)
    {
        var admin = new DbAdmin
        {
            Id = Guid.NewGuid(),
            UserId = userId,
            ProgramId = programId
        };
        _context.Admins.Add(admin);
        await _context.SaveChangesAsync();
    }

    public async Task RemoveProgramAdminAsync(Guid userId, Guid programId)
    {
        var admin = await _context.Admins
            .FirstOrDefaultAsync(a => a.UserId == userId && a.ProgramId == programId);
        if (admin != null)
        {
            _context.Admins.Remove(admin);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<bool> IsSuperAdminAsync(Guid userId)
    {
        var admin = await _context.Admins
            .FirstOrDefaultAsync(a => a.UserId == userId);
        return admin != null && admin.Role == "SuperAdmin";
    }

    public async Task HideProfileAsync(Guid userId)
    {
        var user = await GetProfileByIdAsync(userId);
        if (user != null)
        {
            user.IsActive = false;
            var works = await _context.Works
                .Where(w => w.UserId == userId)
                .ToListAsync();
            foreach (var work in works)
            {
                work.IsHide = true;
            }
            await _context.SaveChangesAsync();
        }
    }

    public async Task ShowProfileAsync(Guid userId)
    {
        var user = await GetProfileByIdAsync(userId);
        if (user != null)
        {
            user.IsActive = true;
            await _context.SaveChangesAsync();
        }
    }

    public async Task DeleteProfileAsync(Guid userId)
    {
        var user = await GetProfileByIdAsync(userId);
        if (user != null)
        {
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
        }
    }
}