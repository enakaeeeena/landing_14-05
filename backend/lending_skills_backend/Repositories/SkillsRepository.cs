using lending_skills_backend.DataAccess;
using lending_skills_backend.Models;
using Microsoft.EntityFrameworkCore;

namespace lending_skills_backend.Repositories;

public class SkillsRepository
{
    private readonly ApplicationDbContext _context;

    public SkillsRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<DbSkill>> GetSkillsAsync()
    {
        return await _context.Skills.ToListAsync();
    }

    public async Task<DbSkill?> GetSkillByIdAsync(Guid skillId)
    {
        return await _context.Skills.FirstOrDefaultAsync(s => s.Id == skillId);
    }

    public async Task<DbSkill?> GetSkillByNameAsync(string name)
    {
        return await _context.Skills.FirstOrDefaultAsync(s => s.Name == name);
    }

    public async Task AddSkillAsync(DbSkill skill)
    {
        _context.Skills.Add(skill);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateSkillAsync(DbSkill skill)
    {
        _context.Skills.Update(skill);
        await _context.SaveChangesAsync();
    }

    public async Task RemoveSkillAsync(Guid skillId)
    {
        var skill = await GetSkillByIdAsync(skillId);
        if (skill != null)
        {
            _context.Skills.Remove(skill);
            // Каскадное удаление записей в DbSkillsWorks и DbSkillsUsers обеспечивается конфигурацией
            await _context.SaveChangesAsync();
        }
    }

    public async Task RemoveSkillByNameAsync(string name)
    {
        var skill = await GetSkillByNameAsync(name);
        if (skill != null)
        {
            _context.Skills.Remove(skill);
            await _context.SaveChangesAsync();
        }
    }

    public async Task AddSkillToWorkAsync(Guid skillId, Guid workId)
    {
        var skillWork = new DbSkillWorks
        {
            Id = Guid.NewGuid(),
            SkillId = skillId,
            WorkId = workId
        };
        _context.SkillsWorks.Add(skillWork);
        await _context.SaveChangesAsync();
    }

    public async Task RemoveSkillFromWorkAsync(Guid skillId, Guid workId)
    {
        var skillWork = await _context.SkillsWorks
            .FirstOrDefaultAsync(sw => sw.SkillId == skillId && sw.WorkId == workId);
        if (skillWork != null)
        {
            _context.SkillsWorks.Remove(skillWork);
            await _context.SaveChangesAsync();
        }
    }

    public async Task AddSkillToUserAsync(Guid skillId, Guid userId)
    {
        var skillUser = new DbSkillsUsers
        {
            Id = Guid.NewGuid(),
            SkillId = skillId,
            UserId = userId
        };
        _context.SkillsUsers.Add(skillUser);
        await _context.SaveChangesAsync();
    }

    public async Task RemoveSkillFromUserAsync(Guid skillId, Guid userId)
    {
        var skillUser = await _context.SkillsUsers
            .FirstOrDefaultAsync(su => su.SkillId == skillId && su.UserId == userId);
        if (skillUser != null)
        {
            _context.SkillsUsers.Remove(skillUser);
            await _context.SaveChangesAsync();
        }
    }
}