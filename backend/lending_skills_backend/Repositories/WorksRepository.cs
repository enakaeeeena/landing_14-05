using lending_skills_backend.DataAccess;
using lending_skills_backend.Models;
using Microsoft.EntityFrameworkCore;

namespace lending_skills_backend.Repositories
{
    public class WorksRepository
    {
        private readonly ApplicationDbContext _context;

        public WorksRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<DbWork>> GetWorksAsync(
            int pageNumber,
            int pageSize,
            int? year,
            Guid? userId,
            Guid? programId,
            bool? favorite,
            Guid? currentUserId,
            bool showHidedWorks = false)
        {
            var query = _context.Works
                .Include(w => w.User)
                .Include(w => w.Program)
                .AsQueryable();

            if (year.HasValue)
            {
                query = query.Where(w => w.PublishDate.Year == year.Value);
            }

            if (userId.HasValue)
            {
                query = query.Where(w => w.UserId == userId.Value);
            }

            if (programId.HasValue)
            {
                query = query.Where(w => w.ProgramId == programId.Value);
            }

            if (favorite.HasValue && favorite.Value && currentUserId.HasValue)
            {
                query = query.Where(w => _context.Likes.Any(l => l.WorkId == w.Id && l.UserId == currentUserId.Value));
            }

            if (!showHidedWorks)
            {
                query = query.Where(w => !w.IsHide);
            }

            return await query
                .OrderByDescending(w => w.PublishDate)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }

        public async Task<DbWork?> GetWorkByIdAsync(Guid workId)
        {
            return await _context.Works
                .Include(w => w.User)
                .Include(w => w.Program)
                .FirstOrDefaultAsync(w => w.Id == workId);
        }

        public async Task AddWorkAsync(DbWork work)
        {
            _context.Works.Add(work);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateWorkAsync(DbWork work)
        {
            _context.Works.Update(work);
            await _context.SaveChangesAsync();
        }

        public async Task HideWorkAsync(Guid workId)
        {
            var work = await GetWorkByIdAsync(workId);
            if (work != null)
            {
                work.IsHide = true;
                await _context.SaveChangesAsync();
            }
        }

        public async Task ShowWorkAsync(Guid workId)
        {
            var work = await GetWorkByIdAsync(workId);
            if (work != null)
            {
                work.IsHide = false;
                await _context.SaveChangesAsync();
            }
        }

        public async Task AddLikeAsync(Guid workId, Guid userId)
        {
            var like = new DbLike
            {
                Id = Guid.NewGuid(),
                UserId = userId,
                WorkId = workId
            };
            _context.Likes.Add(like);
            await _context.SaveChangesAsync();
        }

        public async Task RemoveLikeAsync(Guid workId, Guid? userId)
        {
            var like = await _context.Likes
                .FirstOrDefaultAsync(l => l.WorkId == workId && l.UserId == userId);
            if (like != null)
            {
                _context.Likes.Remove(like);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<int> GetLikesCountAsync(Guid workId)
        {
            return await _context.Likes
                .CountAsync(l => l.WorkId == workId);
        }

        internal async Task AddLikeAsync(Guid workId, Guid? userId)
        {
            throw new NotImplementedException();
        }
    }
}
