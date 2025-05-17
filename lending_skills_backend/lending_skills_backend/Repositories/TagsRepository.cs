using lending_skills_backend.DataAccess;
using lending_skills_backend.Models;
using Microsoft.EntityFrameworkCore;

namespace lending_skills_backend.Repositories;

public class TagsRepository
{
    private readonly ApplicationDbContext _context;

    public TagsRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<DbTag>> GetTagsAsync()
    {
        return await _context.Tags.ToListAsync();
    }

    public async Task<DbTag?> GetTagByIdAsync(Guid tagId)
    {
        return await _context.Tags.FirstOrDefaultAsync(t => t.Id == tagId);
    }

    public async Task<DbTag?> GetTagByNameAsync(string name)
    {
        return await _context.Tags.FirstOrDefaultAsync(t => t.Name == name);
    }

    public async Task AddTagAsync(DbTag tag)
    {
        _context.Tags.Add(tag);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateTagAsync(DbTag tag)
    {
        _context.Tags.Update(tag);
        await _context.SaveChangesAsync();
    }

    public async Task RemoveTagAsync(Guid tagId)
    {
        var tag = await GetTagByIdAsync(tagId);
        if (tag != null)
        {
            _context.Tags.Remove(tag);
            // Каскадное удаление записей в DbTagsWorks обеспечивается конфигурацией
            await _context.SaveChangesAsync();
        }
    }

    public async Task RemoveTagByNameAsync(string name)
    {
        var tag = await GetTagByNameAsync(name);
        if (tag != null)
        {
            _context.Tags.Remove(tag);
            await _context.SaveChangesAsync();
        }
    }

    public async Task AddTagToWorkAsync(Guid tagId, Guid workId)
    {
        var tagWork = new DbTagsWorks
        {
            Id = Guid.NewGuid(),
            TagId = tagId,
            WorkId = workId
        };
        _context.TagsWorks.Add(tagWork);
        await _context.SaveChangesAsync();
    }

    public async Task RemoveTagFromWorkAsync(Guid tagId, Guid workId)
    {
        var tagWork = await _context.TagsWorks
            .FirstOrDefaultAsync(tw => tw.TagId == tagId && tw.WorkId == workId);
        if (tagWork != null)
        {
            _context.TagsWorks.Remove(tagWork);
            await _context.SaveChangesAsync();
        }
    }
}