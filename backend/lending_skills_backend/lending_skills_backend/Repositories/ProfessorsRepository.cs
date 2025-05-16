using lending_skills_backend.DataAccess;
using lending_skills_backend.Models;
using Microsoft.EntityFrameworkCore;

namespace lending_skills_backend.Repositories
{
    public class ProfessorsRepository
    {
        private readonly ApplicationDbContext _context;

        public ProfessorsRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<DbProfessor?> GetProfessorByIdAsync(Guid professorId)
        {
            return await _context.Professors
                .FirstOrDefaultAsync(p => p.Id == professorId);
        }

        public async Task<(IEnumerable<DbProfessor> Professors, int TotalCount)> GetProfessorsAsync(
            Guid? programId,
            string? firstName,
            string? lastName,
            string? patronymic,
            int? pageNumber,
            int? pageSize)
        {
            var professorProgramsQuery = _context.ProfessorsPrograms
                .Include(pp => pp.Professor)
                .AsQueryable();

            // Фильтрация по programId
            if (programId.HasValue)
            {
                professorProgramsQuery = professorProgramsQuery
                    .Where(pp => pp.ProgramId == programId.Value);
            }

            // Получаем все записи ProfessorProgram, чтобы построить порядок
            var professorPrograms = await professorProgramsQuery.ToListAsync();

            // Фильтрация профессоров по имени, фамилии, отчеству
            var professorsQuery = _context.Professors.AsQueryable();
            if (!string.IsNullOrEmpty(firstName))
            {
                professorsQuery = professorsQuery.Where(p => p.FirstName.Contains(firstName));
            }
            if (!string.IsNullOrEmpty(lastName))
            {
                professorsQuery = professorsQuery.Where(p => p.LastName.Contains(lastName));
            }
            if (!string.IsNullOrEmpty(patronymic))
            {
                professorsQuery = professorsQuery.Where(p => p.Patronymic != null && p.Patronymic.Contains(patronymic));
            }

            var professors = await professorsQuery.ToListAsync();

            // Если указан programId, фильтруем профессоров по ProfessorPrograms
            if (programId.HasValue)
            {
                var professorIdsInProgram = professorPrograms.Select(pp => pp.ProfessorId).ToHashSet();
                professors = professors.Where(p => professorIdsInProgram.Contains(p.Id)).ToList();
            }

            // Сортировка по порядку (NextProfessorId, PreviousProfessorId)
            var orderedProfessors = new List<DbProfessor>();
            var professorProgramDict = professorPrograms.ToDictionary(pp => pp.ProfessorId, pp => pp);
            var visited = new HashSet<Guid>();

            foreach (var pp in professorPrograms.Where(pp => pp.PreviousProfessorId == null))
            {
                var currentProfessorId = pp.ProfessorId;
                while (currentProfessorId != Guid.Empty && !visited.Contains(currentProfessorId))
                {
                    visited.Add(currentProfessorId);
                    var professor = professors.FirstOrDefault(p => p.Id == currentProfessorId);
                    if (professor != null)
                    {
                        orderedProfessors.Add(professor);
                    }
                    var currentPp = professorProgramDict.GetValueOrDefault(currentProfessorId);
                    currentProfessorId = currentPp?.NextProfessorId ?? Guid.Empty;
                }
            }

            // Добавляем профессоров, которые не входят в цепочку (если programId не указан)
            if (!programId.HasValue)
            {
                var remainingProfessors = professors
                    .Where(p => !visited.Contains(p.Id))
                    .ToList();
                orderedProfessors.AddRange(remainingProfessors);
            }

            // Подсчёт общего количества
            var totalCount = orderedProfessors.Count;

            // Пагинация
            if (pageNumber.HasValue && pageSize.HasValue)
            {
                orderedProfessors = orderedProfessors
                    .Skip((pageNumber.Value - 1) * pageSize.Value)
                    .Take(pageSize.Value)
                    .ToList();
            }

            return (orderedProfessors, totalCount);
        }

        public async Task AddProfessorAsync(DbProfessor professor, Guid? programId = null)
        {
            _context.Professors.Add(professor);
            if (programId.HasValue)
            {
                _context.ProfessorsPrograms.Add(new DbProfessorProgram
                {
                    Id = Guid.NewGuid(),
                    ProfessorId = professor.Id,
                    ProgramId = programId.Value
                });
            }
            await _context.SaveChangesAsync();
        }

        public async Task UpdateProfessorAsync(DbProfessor professor)
        {
            _context.Professors.Update(professor);
            await _context.SaveChangesAsync();
        }

        public async Task RemoveProfessorFromProgramAsync(Guid professorId, Guid programId)
        {
            var professorProgram = await _context.ProfessorsPrograms
                .FirstOrDefaultAsync(pp => pp.ProfessorId == professorId && pp.ProgramId == programId);
            if (professorProgram == null)
            {
                return;
            }

            // Обновляем ссылки
            var previousProfessor = await _context.ProfessorsPrograms
                .FirstOrDefaultAsync(pp => pp.NextProfessorId == professorProgram.Id);
            var nextProfessor = await _context.ProfessorsPrograms
                .FirstOrDefaultAsync(pp => pp.PreviousProfessorId == professorProgram.Id);

            if (previousProfessor != null)
            {
                previousProfessor.NextProfessorId = professorProgram.NextProfessorId;
            }
            if (nextProfessor != null)
            {
                nextProfessor.PreviousProfessorId = professorProgram.PreviousProfessorId;
            }

            _context.ProfessorsPrograms.Remove(professorProgram);
            await _context.SaveChangesAsync();
        }

        public async Task AddProfessorToProgramAsync(Guid professorId, Guid programId, Guid? afterProfessorId)
        {
            var professorProgram = new DbProfessorProgram
            {
                Id = Guid.NewGuid(),
                ProfessorId = professorId,
                ProgramId = programId
            };

            if (afterProfessorId.HasValue)
            {
                var afterProfessorProgram = await _context.ProfessorsPrograms
                    .FirstOrDefaultAsync(pp => pp.ProfessorId == afterProfessorId.Value && pp.ProgramId == programId);
                if (afterProfessorProgram != null)
                {
                    // Вставляем между afterProfessorProgram и его следующим профессором
                    professorProgram.PreviousProfessorId = afterProfessorProgram.Id;
                    professorProgram.NextProfessorId = afterProfessorProgram.NextProfessorId;

                    if (afterProfessorProgram.NextProfessorId.HasValue)
                    {
                        var nextProfessorProgram = await _context.ProfessorsPrograms
                            .FirstOrDefaultAsync(pp => pp.Id == afterProfessorProgram.NextProfessorId.Value);
                        if (nextProfessorProgram != null)
                        {
                            nextProfessorProgram.PreviousProfessorId = professorProgram.Id;
                        }
                    }

                    afterProfessorProgram.NextProfessorId = professorProgram.Id;
                }
                else
                {
                    // Если afterProfessorId указан, но не найден, добавляем в конец
                    var lastProfessorProgram = await _context.ProfessorsPrograms
                        .Where(pp => pp.ProgramId == programId && pp.NextProfessorId == null)
                        .FirstOrDefaultAsync();
                    if (lastProfessorProgram != null)
                    {
                        lastProfessorProgram.NextProfessorId = professorProgram.Id;
                        professorProgram.PreviousProfessorId = lastProfessorProgram.Id;
                    }
                }
            }
            else
            {
                // Добавляем в конец
                var lastProfessorProgram = await _context.ProfessorsPrograms
                    .Where(pp => pp.ProgramId == programId && pp.NextProfessorId == null)
                    .FirstOrDefaultAsync();
                if (lastProfessorProgram != null)
                {
                    lastProfessorProgram.NextProfessorId = professorProgram.Id;
                    professorProgram.PreviousProfessorId = lastProfessorProgram.Id;
                }
            }

            _context.ProfessorsPrograms.Add(professorProgram);
            await _context.SaveChangesAsync();
        }

        public async Task ChangeProfessorProgramPositionAsync(Guid professorId, Guid programId, Guid? afterProfessorId)
        {
            var professorProgram = await _context.ProfessorsPrograms
                .FirstOrDefaultAsync(pp => pp.ProfessorId == professorId && pp.ProgramId == programId);
            if (professorProgram == null)
            {
                return;
            }

            // Удаляем из текущей позиции
            var previousProfessor = await _context.ProfessorsPrograms
                .FirstOrDefaultAsync(pp => pp.NextProfessorId == professorProgram.Id);
            var nextProfessor = await _context.ProfessorsPrograms
                .FirstOrDefaultAsync(pp => pp.PreviousProfessorId == professorProgram.Id);

            if (previousProfessor != null)
            {
                previousProfessor.NextProfessorId = professorProgram.NextProfessorId;
            }
            if (nextProfessor != null)
            {
                nextProfessor.PreviousProfessorId = professorProgram.PreviousProfessorId;
            }

            // Очищаем ссылки
            professorProgram.PreviousProfessorId = null;
            professorProgram.NextProfessorId = null;

            // Вставляем в новую позицию
            if (afterProfessorId.HasValue)
            {
                var afterProfessorProgram = await _context.ProfessorsPrograms
                    .FirstOrDefaultAsync(pp => pp.ProfessorId == afterProfessorId.Value && pp.ProgramId == programId);
                if (afterProfessorProgram != null)
                {
                    professorProgram.PreviousProfessorId = afterProfessorProgram.Id;
                    professorProgram.NextProfessorId = afterProfessorProgram.NextProfessorId;

                    if (afterProfessorProgram.NextProfessorId.HasValue)
                    {
                        var nextProfessorProgram = await _context.ProfessorsPrograms
                            .FirstOrDefaultAsync(pp => pp.Id == afterProfessorProgram.NextProfessorId.Value);
                        if (nextProfessorProgram != null)
                        {
                            nextProfessorProgram.PreviousProfessorId = professorProgram.Id;
                        }
                    }

                    afterProfessorProgram.NextProfessorId = professorProgram.Id;
                }
                else
                {
                    // Если afterProfessorId указан, но не найден, добавляем в конец
                    var lastProfessorProgram = await _context.ProfessorsPrograms
                        .Where(pp => pp.ProgramId == programId && pp.NextProfessorId == null)
                        .FirstOrDefaultAsync();
                    if (lastProfessorProgram != null)
                    {
                        lastProfessorProgram.NextProfessorId = professorProgram.Id;
                        professorProgram.PreviousProfessorId = lastProfessorProgram.Id;
                    }
                }
            }
            else
            {
                // Добавляем в конец
                var lastProfessorProgram = await _context.ProfessorsPrograms
                    .Where(pp => pp.ProgramId == programId && pp.NextProfessorId == null)
                    .FirstOrDefaultAsync();
                if (lastProfessorProgram != null)
                {
                    lastProfessorProgram.NextProfessorId = professorProgram.Id;
                    professorProgram.PreviousProfessorId = lastProfessorProgram.Id;
                }
            }

            await _context.SaveChangesAsync();
        }

        public async Task<bool> IsProgramAdminAsync(Guid userId, Guid programId)
        {
            return await _context.Admins
                .AnyAsync(a => a.UserId == userId && a.ProgramId == programId);
        }
    }
}
