using lending_skills_backend.Dtos.Requests;
using lending_skills_backend.Dtos.Responses;
using lending_skills_backend.Mappers;
using lending_skills_backend.Models;
using lending_skills_backend.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace lending_skills_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SkillsController : ControllerBase
    {
        private readonly SkillsRepository _skillsRepository;
        private readonly WorksRepository _worksRepository;
        private readonly UsersRepository _usersRepository;
        private readonly ProgramsRepository _programsRepository;

        public SkillsController(
            SkillsRepository skillsRepository,
            WorksRepository worksRepository,
            UsersRepository usersRepository,
            ProgramsRepository programsRepository)
        {
            _skillsRepository = skillsRepository;
            _worksRepository = worksRepository;
            _usersRepository = usersRepository;
            _programsRepository = programsRepository;
        }

        [HttpGet("GetSkills")]
        public async Task<ActionResult<List<SkillResponse>>> GetSkills()
        {
            var skills = await _skillsRepository.GetSkillsAsync();
            return Ok(skills.Select(SkillResponseMapper.Map).ToList());
        }

        [HttpPost("AddSkill")]
        public async Task<ActionResult<SkillResponse>> AddSkill([FromBody] AddSkillRequest request)
        {
            var userId = Guid.NewGuid(); // Заменить на реальный UserId
            var isSuperAdmin = await _usersRepository.IsSuperAdminAsync(userId);
            var isProgramAdmin = request.ProgramId.HasValue && await _programsRepository.IsAdminOfProgramAsync(userId, request.ProgramId.Value);
            if (!isSuperAdmin && !isProgramAdmin)
            {
                return Forbid("Only super admins or program admins can add skills.");
            }

            var existingSkill = await _skillsRepository.GetSkillByNameAsync(request.Name);
            if (existingSkill != null)
            {
                return BadRequest("Skill with this name already exists.");
            }

            var skill = DbSkillMapper.Map(request);
            skill.Id = Guid.NewGuid();
            await _skillsRepository.AddSkillAsync(skill);

            return CreatedAtAction(nameof(GetSkill), new { id = skill.Id }, SkillResponseMapper.Map(skill));
        }

        [HttpPut("UpdateSkill")]
        public async Task<IActionResult> UpdateSkill([FromBody] UpdateSkillRequest request)
        {
            var skill = request.Id.HasValue
                ? await _skillsRepository.GetSkillByIdAsync(request.Id.Value)
                : await _skillsRepository.GetSkillByNameAsync(request.OldName);
            if (skill == null)
            {
                return NotFound("Skill not found.");
            }

            var userId = Guid.NewGuid(); // Заменить на реальный UserId
            var isSuperAdmin = await _usersRepository.IsSuperAdminAsync(userId);
            var isProgramAdmin = request.ProgramId.HasValue && await _programsRepository.IsAdminOfProgramAsync(userId, request.ProgramId.Value);
            if (!isSuperAdmin && !isProgramAdmin)
            {
                return Forbid("Only super admins or program admins can update skills.");
            }

            var existingSkill = await _skillsRepository.GetSkillByNameAsync(request.NewName);
            if (existingSkill != null && existingSkill.Id != skill.Id)
            {
                return BadRequest("Skill with this name already exists.");
            }

            DbSkillMapper.Map(skill, request);
            await _skillsRepository.UpdateSkillAsync(skill);
            return NoContent();
        }

        [HttpDelete("RemoveSkill")]
        public async Task<IActionResult> RemoveSkill([FromBody] RemoveSkillRequest request)
        {
            var skill = request.Id.HasValue
                ? await _skillsRepository.GetSkillByIdAsync(request.Id.Value)
                : await _skillsRepository.GetSkillByNameAsync(request.Name);
            if (skill == null)
            {
                return NotFound("Skill not found.");
            }

            var userId = Guid.NewGuid(); // Заменить на реальный UserId
            var isSuperAdmin = await _usersRepository.IsSuperAdminAsync(userId);
            var isProgramAdmin = request.ProgramId.HasValue && await _programsRepository.IsAdminOfProgramAsync(userId, request.ProgramId.Value);
            if (!isSuperAdmin && !isProgramAdmin)
            {
                return Forbid("Only super admins or program admins can remove skills.");
            }

            if (request.Id.HasValue)
            {
                await _skillsRepository.RemoveSkillAsync(request.Id.Value);
            }
            else
            {
                await _skillsRepository.RemoveSkillByNameAsync(request.Name);
            }
            return NoContent();
        }

        [HttpPost("AddSkillToWork")]
        public async Task<IActionResult> AddSkillToWork([FromBody] AddSkillToWorkRequest request)
        {
            var work = await _worksRepository.GetWorkByIdAsync(request.WorkId);
            if (work == null)
            {
                return NotFound("Work not found.");
            }

            var skill = await _skillsRepository.GetSkillByIdAsync(request.SkillId);
            if (skill == null)
            {
                return NotFound("Skill not found.");
            }

            var userId = Guid.NewGuid(); // Заменить на реальный UserId
            var isSuperAdmin = await _usersRepository.IsSuperAdminAsync(userId);
            var isProgramAdmin = await _programsRepository.IsAdminOfProgramAsync(userId, work.ProgramId);
            var isWorkOwner = work.UserId == userId;
            if (!isSuperAdmin && !isProgramAdmin && !isWorkOwner)
            {
                return Forbid("Only super admins, program admins, or work owners can add skills to works.");
            }

            await _skillsRepository.AddSkillToWorkAsync(request.SkillId, request.WorkId);
            return NoContent();
        }

        [HttpPost("RemoveSkillFromWork")]
        public async Task<IActionResult> RemoveSkillFromWork([FromBody] RemoveSkillFromWorkRequest request)
        {
            var work = await _worksRepository.GetWorkByIdAsync(request.WorkId);
            if (work == null)
            {
                return NotFound("Work not found.");
            }

            var skill = await _skillsRepository.GetSkillByIdAsync(request.SkillId);
            if (skill == null)
            {
                return NotFound("Skill not found.");
            }

            var userId = Guid.NewGuid(); // Заменить на реальный UserId
            var isSuperAdmin = await _usersRepository.IsSuperAdminAsync(userId);
            var isProgramAdmin = await _programsRepository.IsAdminOfProgramAsync(userId, work.ProgramId);
            var isWorkOwner = work.UserId == userId;
            if (!isSuperAdmin && !isProgramAdmin && !isWorkOwner)
            {
                return Forbid("Only super admins, program admins, or work owners can remove skills from works.");
            }

            await _skillsRepository.RemoveSkillFromWorkAsync(request.SkillId, request.WorkId);
            return NoContent();
        }

        [HttpPost("AddSkillToUser")]
        public async Task<IActionResult> AddSkillToUser([FromBody] AddSkillToUserRequest request)
        {
            var user = await _usersRepository.GetUserByIdAsync(request.UserId);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            var skill = await _skillsRepository.GetSkillByIdAsync(request.SkillId);
            if (skill == null)
            {
                return NotFound("Skill not found.");
            }

            var userId = Guid.NewGuid(); // Заменить на реальный UserId
            var isSuperAdmin = await _usersRepository.IsSuperAdminAsync(userId);
            var isUserOwner = request.UserId == userId;
            if (!isSuperAdmin && !isUserOwner)
            {
                return Forbid("Only super admins or the user themselves can add skills to users.");
            }

            await _skillsRepository.AddSkillToUserAsync(request.SkillId, request.UserId);
            return NoContent();
        }

        [HttpPost("RemoveSkillFromUser")]
        public async Task<IActionResult> RemoveSkillFromUser([FromBody] RemoveSkillFromUserRequest request)
        {
            var user = await _usersRepository.GetUserByIdAsync(request.UserId);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            var skill = await _skillsRepository.GetSkillByIdAsync(request.SkillId);
            if (skill == null)
            {
                return NotFound("Skill not found.");
            }

            var userId = Guid.NewGuid(); // Заменить на реальный UserId
            var isSuperAdmin = await _usersRepository.IsSuperAdminAsync(userId);
            var isUserOwner = request.UserId == userId;
            if (!isSuperAdmin && !isUserOwner)
            {
                return Forbid("Only super admins or the user themselves can remove skills from users.");
            }

            await _skillsRepository.RemoveSkillFromUserAsync(request.SkillId, request.UserId);
            return NoContent();
        }

        private async Task<ActionResult<DbSkill>> GetSkill(Guid id)
        {
            var skill = await _skillsRepository.GetSkillByIdAsync(id);
            if (skill == null)
            {
                return NotFound();
            }
            return skill;
        }
    }
}