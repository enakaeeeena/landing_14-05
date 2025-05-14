using lending_skills_backend.DataAccess;
using lending_skills_backend.Models;
using Microsoft.EntityFrameworkCore;

namespace lending_skills_backend.Repositories;
public class FormsRepository
{
    private readonly ApplicationDbContext _context;

    public FormsRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<DbForm>> GetFormsAsync()
    {
        return await _context.Forms
            .Include(f => f.Block)
            .ThenInclude(b => b.Page)
            .ThenInclude(p => p.Program)
            .ToListAsync();
    }

    public async Task<DbForm?> GetFormByIdAsync(Guid formId)
    {
        return await _context.Forms
            .Include(f => f.Block)
            .ThenInclude(b => b.Page)
            .ThenInclude(p => p.Program)
            .FirstOrDefaultAsync(f => f.Id == formId);
    }

    public async Task<bool> CheckAdminAccessAsync(Guid userId, Guid formId)
    {
        var form = await GetFormByIdAsync(formId);
        if (form == null) return false;

        return await _context.Admins
            .AnyAsync(a => a.UserId == userId && a.ProgramId == form.Block.Page.ProgramId);
    }

    public async Task<(IEnumerable<DbForm> Forms, int TotalCount)> GetFormsForAdminAsync(
        Guid userId,
        Guid? programId,
        Guid? blockId,
        bool includeHidden,
        int? pageNumber,
        int? pageSize)
    {
        var query = _context.Forms
            .Include(f => f.Block)
            .ThenInclude(b => b.Page)
            .ThenInclude(p => p.Program)
            .AsQueryable();

        // Фильтрация по админу (программы, где пользователь является админом)
        var adminPrograms = _context.Admins
            .Where(a => a.UserId == userId)
            .Select(a => a.ProgramId);
        query = query.Where(f => f.Block != null && f.Block.Page != null && adminPrograms.Contains(f.Block.Page.ProgramId));

        // Фильтрация по programId
        if (programId.HasValue)
        {
            query = query.Where(f => f.Block != null && f.Block.Page != null && f.Block.Page.ProgramId == programId.Value);
        }

        // Фильтрация по blockId
        if (blockId.HasValue)
        {
            query = query.Where(f => f.BlockId == blockId.Value);
        }

        // Фильтрация по IsHidden
        if (!includeHidden)
        {
            query = query.Where(f => !f.IsHidden);
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

        var forms = await query.ToListAsync();
        return (forms, totalCount);
    }

    public async Task AddFormAsync(DbForm form)
    {
        _context.Forms.Add(form);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateFormAsync(DbForm form)
    {
        _context.Forms.Update(form);
        await _context.SaveChangesAsync();
    }

    public async Task RemoveFormAsync(Guid formId)
    {
        var form = await GetFormByIdAsync(formId);
        if (form != null)
        {
            _context.Forms.Remove(form);
            await _context.SaveChangesAsync();
        }
    }

    public async Task RemoveFormsAsync(Guid userId, Guid? blockId, List<Guid> formIds, DateTime? fromDate, DateTime? toDate)
    {
        var query = _context.Forms
            .Include(f => f.Block)
            .ThenInclude(b => b.Page)
            .ThenInclude(p => p.Program)
            .AsQueryable();

        // Фильтрация по админу: доступ только к формам программ, где пользователь является админом
        var adminPrograms = _context.Admins
            .Where(a => a.UserId == userId)
            .Select(a => a.ProgramId);
        query = query.Where(f => f.Block != null && f.Block.Page != null && adminPrograms.Contains(f.Block.Page.ProgramId));

        // Фильтрация по blockId, если указано
        if (blockId.HasValue)
        {
            query = query.Where(f => f.BlockId == blockId.Value);
        }

        // Фильтрация по formIds, если список не пустой
        if (formIds != null && formIds.Any())
        {
            query = query.Where(f => formIds.Contains(f.Id));
        }

        // Фильтрация по датам
        if (fromDate.HasValue)
        {
            query = query.Where(f => f.Date >= fromDate.Value);
        }
        if (toDate.HasValue)
        {
            query = query.Where(f => f.Date <= toDate.Value);
        }

        // Если ни один фильтр не указан, ничего не удаляем
        if (!blockId.HasValue && (formIds == null || !formIds.Any()) && !fromDate.HasValue && !toDate.HasValue)
        {
            return;
        }

        // Получаем формы и удаляем их
        var forms = await query.ToListAsync();
        if (!forms.Any())
        {
            return;
        }

        _context.Forms.RemoveRange(forms);
        await _context.SaveChangesAsync();
    }

    public async Task HideFormsAsync(Guid userId, Guid? blockId, List<Guid> formIds, DateTime? fromDate, DateTime? toDate)
    {
        var query = _context.Forms
            .Include(f => f.Block)
            .ThenInclude(b => b.Page)
            .ThenInclude(p => p.Program)
            .AsQueryable();

        // Фильтрация по админу
        var adminPrograms = _context.Admins
            .Where(a => a.UserId == userId)
            .Select(a => a.ProgramId);
        query = query.Where(f => f.Block != null && f.Block.Page != null && adminPrograms.Contains(f.Block.Page.ProgramId));

        // Фильтрация по blockId
        if (blockId.HasValue)
        {
            query = query.Where(f => f.BlockId == blockId.Value);
        }

        // Фильтрация по FormIds
        if (formIds != null && formIds.Any())
        {
            query = query.Where(f => formIds.Contains(f.Id));
        }

        // Фильтрация по датам
        if (fromDate.HasValue)
        {
            query = query.Where(f => f.Date >= fromDate.Value);
        }
        if (toDate.HasValue)
        {
            query = query.Where(f => f.Date <= toDate.Value);
        }

        var forms = await query.ToListAsync();
        foreach (var form in forms)
        {
            form.IsHidden = true;
        }
        await _context.SaveChangesAsync();
    }

    public async Task ShowFormsAsync(Guid userId, Guid? blockId, List<Guid> formIds, DateTime? fromDate, DateTime? toDate)
    {
        var query = _context.Forms
            .Include(f => f.Block)
            .ThenInclude(b => b.Page)
            .ThenInclude(p => p.Program)
            .AsQueryable();

        // Фильтрация по админу
        var adminPrograms = _context.Admins
            .Where(a => a.UserId == userId)
            .Select(a => a.ProgramId);
        query = query.Where(f => f.Block != null && f.Block.Page != null && adminPrograms.Contains(f.Block.Page.ProgramId));

        // Фильтрация по blockId
        if (blockId.HasValue)
        {
            query = query.Where(f => f.BlockId == blockId.Value);
        }

        // Фильтрация по FormIds
        if (formIds != null && formIds.Any())
        {
            query = query.Where(f => formIds.Contains(f.Id));
        }

        // Фильтрация по датам
        if (fromDate.HasValue)
        {
            query = query.Where(f => f.Date >= fromDate.Value);
        }
        if (toDate.HasValue)
        {
            query = query.Where(f => f.Date <= toDate.Value);
        }

        var forms = await query.ToListAsync();
        foreach (var form in forms)
        {
            form.IsHidden = false;
        }
        await _context.SaveChangesAsync();
    }
}
