using lending_skills_backend.DataAccess;
using lending_skills_backend.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace lending_skills_backend.Repositories
{
    public class ProgramsRepository
    {
        private readonly ApplicationDbContext _context;

        public ProgramsRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<DbProgram>> GetProgramsAsync()
        {
            return await _context.Programs
                .Where(p => p.IsActive) // Только активные программы
                .ToListAsync();
        }

        public async Task<DbProgram?> GetProgramByIdAsync(Guid id)
        {
            return await _context.Programs
                .Include(p => p.Pages)
                .ThenInclude(pg => pg.Blocks)
                .ThenInclude(b => b.Form)
                .FirstOrDefaultAsync(p => p.Id == id && p.IsActive);
        }

        public async Task AddProgramAsync(DbProgram program)
        {
            _context.Programs.Add(program);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteProgramAsync(Guid id)
        {
            var program = await _context.Programs.FindAsync(id);
            if (program != null)
            {
                program.IsActive = false;
                await _context.SaveChangesAsync();
            }
        }

        public async Task UpdateProgramAsync(DbProgram program)
        {
            _context.Programs.Update(program);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> IsAdminOfProgramAsync(Guid userId, Guid programId)
        {
            return await _context.Admins
                .AnyAsync(a => a.UserId == userId && a.ProgramId == programId);
        }

    }
}
