using lending_skills_backend.DataAccess;
using lending_skills_backend.Dtos.Requests;
using lending_skills_backend.Dtos.Responses;
using lending_skills_backend.Mappers;
using lending_skills_backend.Models;
using lending_skills_backend.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace lending_skills_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WorksController : ControllerBase
    {
        private readonly WorksRepository _worksRepository;
        private readonly UsersRepository _usersRepository;
        private readonly ProgramsRepository _programsRepository;
        private readonly TagsRepository _tagsRepository;
        private readonly SkillsRepository _skillsRepository;
        private readonly ApplicationDbContext _context;

        public WorksController(
            WorksRepository worksRepository,
            UsersRepository usersRepository,
            ProgramsRepository programsRepository,
            TagsRepository tagsRepository,
            SkillsRepository skillsRepository)
        {
            _worksRepository = worksRepository;
            _usersRepository = usersRepository;
            _programsRepository = programsRepository;
            _tagsRepository = tagsRepository;
            _skillsRepository = skillsRepository;
        }

        [HttpPost("GetWorks")]
        public async Task<ActionResult<List<WorkResponse>>> GetWorks([FromBody] GetWorksRequest request)
        {
            var userId = Guid.NewGuid(); // Заменить на реальный UserId из контекста авторизации
            var works = await _worksRepository.GetWorksAsync(
                request.PageNumber,
                request.PageSize,
                request.Year,
                request.UserId,
                request.ProgramId,
                request.Favorite,
                userId,
                request.ShowHidedWorks);

            var workResponses = new List<WorkResponse>();
            foreach (var work in works)
            {
                var tags = await _tagsRepository.GetTagsAsync();
                var tagsForWork = (await _context.TagsWorks
                    .Where(tw => tw.WorkId == work.Id)
                    .Select(tw => tw.Tag)
                    .ToListAsync())
                    .Select(TagResponseMapper.Map)
                    .ToList();

                var skills = await _skillsRepository.GetSkillsAsync();
                var skillsForWork = (await _context.SkillsWorks
                    .Where(sw => sw.WorkId == work.Id)
                    .Select(sw => sw.Skill)
                    .ToListAsync())
                    .Select(SkillResponseMapper.Map)
                    .ToList();

                var likesCount = await _worksRepository.GetLikesCountAsync(work.Id);

                workResponses.Add(WorkResponseMapper.Map(work, tagsForWork, skillsForWork, likesCount));
            }

            return Ok(workResponses);
        }

        [HttpPut("UpdateWork")]
        public async Task<IActionResult> UpdateWork([FromBody] UpdateWorkRequest request)
        {
            var work = await _worksRepository.GetWorkByIdAsync(request.Id);
            if (work == null)
            {
                return NotFound("Work not found.");
            }

            var userId = Guid.NewGuid(); // Заменить на реальный UserId
            var isSuperAdmin = await _usersRepository.IsSuperAdminAsync(userId);
            var isProgramAdmin = await _programsRepository.IsAdminOfProgramAsync(userId, work.ProgramId);
            var isWorkOwner = work.UserId == userId;
            if (!isSuperAdmin && !isProgramAdmin && !isWorkOwner)
            {
                return Forbid("Only super admins, program admins, or work owners can update works.");
            }

            DbWorkMapper.Map(work, request);
            await _worksRepository.UpdateWorkAsync(work);
            return NoContent();
        }

        [HttpPost("AddWork")]
        public async Task<ActionResult<WorkResponse>> AddWork([FromBody] AddWorkRequest request)
        {
            var userId = Guid.NewGuid(); // Заменить на реальный UserId
            var user = await _usersRepository.GetUserByIdAsync(userId);
            if (user == null || user.Role != "Student")
            {
                return Forbid("Only students can add works.");
            }

            var program = await _programsRepository.GetProgramByIdAsync(request.ProgramId);
            if (program == null)
            {
                return NotFound("Program not found.");
            }

            var work = DbWorkMapper.Map(request);
            work.Id = Guid.NewGuid();
            work.UserId = userId;
            work.IsHide = false;
            await _worksRepository.AddWorkAsync(work);

            var tagsForWork = new List<TagResponse>();
            var skillsForWork = new List<SkillResponse>();
            var likesCount = 0;

            return CreatedAtAction(
                nameof(GetWork),
                new { id = work.Id },
                WorkResponseMapper.Map(work, tagsForWork, skillsForWork, likesCount));
        }

        [HttpPost("HideWork")]
        public async Task<IActionResult> HideWork([FromBody] HideWorkRequest request)
        {
            var work = await _worksRepository.GetWorkByIdAsync(request.WorkId);
            if (work == null)
            {
                return NotFound("Work not found.");
            }

            var userId = Guid.NewGuid(); // Заменить на реальный UserId
            var isSuperAdmin = await _usersRepository.IsSuperAdminAsync(userId);
            var isProgramAdmin = await _programsRepository.IsAdminOfProgramAsync(userId, work.ProgramId);
            var isWorkOwner = work.UserId == userId;
            if (!isSuperAdmin && !isProgramAdmin && !isWorkOwner)
            {
                return Forbid("Only super admins, program admins, or work owners can hide works.");
            }

            await _worksRepository.HideWorkAsync(request.WorkId);
            return NoContent();
        }

        [HttpPost("ShowWork")]
        public async Task<IActionResult> ShowWork([FromBody] ShowWorkRequest request)
        {
            var work = await _worksRepository.GetWorkByIdAsync(request.WorkId);
            if (work == null)
            {
                return NotFound("Work not found.");
            }

            var userId = Guid.NewGuid(); // Заменить на реальный UserId
            var isSuperAdmin = await _usersRepository.IsSuperAdminAsync(userId);
            var isProgramAdmin = await _programsRepository.IsAdminOfProgramAsync(userId, work.ProgramId);
            var isWorkOwner = work.UserId == userId;
            if (!isSuperAdmin && !isProgramAdmin && !isWorkOwner)
            {
                return Forbid("Only super admins, program admins, or work owners can show works.");
            }

            await _worksRepository.ShowWorkAsync(request.WorkId);
            return NoContent();
        }

        [HttpPost("LikeWork")]
        public async Task<IActionResult> LikeWork([FromBody] LikeWorkRequest request)
        {
            var work = await _worksRepository.GetWorkByIdAsync(request.WorkId);
            if (work == null)
            {
                return NotFound("Work not found.");
            }

            var userId = Guid.NewGuid(); // Заменить на реальный UserId
            if (request.UserId != userId)
            {
                return Forbid("Users can only like works on their own behalf.");
            }

            await _worksRepository.AddLikeAsync(request.WorkId, request.UserId);
            return NoContent();
        }

        [HttpPost("UnlikeWork")]
        public async Task<IActionResult> UnlikeWork([FromBody] UnlikeWorkRequest request)
        {
            var work = await _worksRepository.GetWorkByIdAsync(request.WorkId);
            if (work == null)
            {
                return NotFound("Work not found.");
            }

            var userId = Guid.NewGuid(); // Заменить на реальный UserId
            if (request.UserId != userId)
            {
                return Forbid("Users can only unlike works on their own behalf.");
            }

            await _worksRepository.RemoveLikeAsync(request.WorkId, request.UserId);
            return NoContent();
        }

        private async Task<ActionResult<DbWork>> GetWork(Guid id)
        {
            var work = await _worksRepository.GetWorkByIdAsync(id);
            if (work == null)
            {
                return NotFound();
            }
            return work;
        }
    }
}