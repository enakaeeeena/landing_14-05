// Контроллер для управления навыками в системе
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
        // Репозитории для работы с данными
        private readonly SkillsRepository _skillsRepository;
        private readonly WorksRepository _worksRepository;
        private readonly UsersRepository _usersRepository;
        private readonly ProgramsRepository _programsRepository;

        // Конструктор контроллера с внедрением зависимостей
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

        // Получение списка всех навыков
        [HttpGet("GetSkills")]
        public async Task<ActionResult<List<SkillResponse>>> GetSkills()
        {
            var skills = await _skillsRepository.GetSkillsAsync();
            return Ok(skills.Select(SkillResponseMapper.Map).ToList());
        }

        // Добавление нового навыка
        [HttpPost("AddSkill")]
        public async Task<ActionResult<SkillResponse>> AddSkill([FromBody] AddSkillRequest request)
        {
            // Проверка прав доступа
            var userId = Guid.NewGuid(); // TODO: Заменить на получение из токена
            var isSuperAdmin = await _usersRepository.IsSuperAdminAsync(userId);
            var isProgramAdmin = request.ProgramId.HasValue && await _programsRepository.IsAdminOfProgramAsync(userId, request.ProgramId.Value);
            if (!isSuperAdmin && !isProgramAdmin)
            {
                return Forbid("Only super admins or program admins can add skills.");
            }

            // Проверка уникальности навыка
            var existingSkill = await _skillsRepository.GetSkillByNameAsync(request.Name);
            if (existingSkill != null)
            {
                return BadRequest("Skill with this name already exists.");
            }

            // Создание нового навыка
            var skill = DbSkillMapper.Map(request);
            skill.Id = Guid.NewGuid();
            await _skillsRepository.AddSkillAsync(skill);

            return CreatedAtAction(nameof(GetSkill), new { id = skill.Id }, SkillResponseMapper.Map(skill));
        }

        // Обновление существующего навыка
        [HttpPut("UpdateSkill")]
        public async Task<IActionResult> UpdateSkill([FromBody] UpdateSkillRequest request)
        {
            // Поиск навыка по ID или имени
            var skill = request.Id.HasValue
                ? await _skillsRepository.GetSkillByIdAsync(request.Id.Value)
                : await _skillsRepository.GetSkillByNameAsync(request.OldName);
            if (skill == null)
            {
                return NotFound("Skill not found.");
            }

            // Проверка прав доступа
            var userId = Guid.NewGuid(); // TODO: Заменить на получение из токена
            var isSuperAdmin = await _usersRepository.IsSuperAdminAsync(userId);
            var isProgramAdmin = request.ProgramId.HasValue && await _programsRepository.IsAdminOfProgramAsync(userId, request.ProgramId.Value);
            if (!isSuperAdmin && !isProgramAdmin)
            {
                return Forbid("Only super admins or program admins can update skills.");
            }

            // Проверка уникальности нового имени
            var existingSkill = await _skillsRepository.GetSkillByNameAsync(request.NewName);
            if (existingSkill != null && existingSkill.Id != skill.Id)
            {
                return BadRequest("Skill with this name already exists.");
            }

            // Обновление навыка
            DbSkillMapper.Map(skill, request);
            await _skillsRepository.UpdateSkillAsync(skill);
            return NoContent();
        }

        // Удаление навыка
        [HttpDelete("RemoveSkill")]
        public async Task<IActionResult> RemoveSkill([FromBody] RemoveSkillRequest request)
        {
            // Поиск навыка по ID или имени
            var skill = request.Id.HasValue
                ? await _skillsRepository.GetSkillByIdAsync(request.Id.Value)
                : await _skillsRepository.GetSkillByNameAsync(request.Name);
            if (skill == null)
            {
                return NotFound("Skill not found.");
            }

            // Проверка прав доступа
            var userId = Guid.NewGuid(); // TODO: Заменить на получение из токена
            var isSuperAdmin = await _usersRepository.IsSuperAdminAsync(userId);
            var isProgramAdmin = request.ProgramId.HasValue && await _programsRepository.IsAdminOfProgramAsync(userId, request.ProgramId.Value);
            if (!isSuperAdmin && !isProgramAdmin)
            {
                return Forbid("Only super admins or program admins can remove skills.");
            }

            // Удаление навыка
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

        // Добавление навыка к работе
        [HttpPost("AddSkillToWork")]
        public async Task<IActionResult> AddSkillToWork([FromBody] AddSkillToWorkRequest request)
        {
            // Проверка существования работы и навыка
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

            // Проверка прав доступа
            var userId = Guid.NewGuid(); // TODO: Заменить на получение из токена
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

        // Удаление навыка из работы
        [HttpPost("RemoveSkillFromWork")]
        public async Task<IActionResult> RemoveSkillFromWork([FromBody] RemoveSkillFromWorkRequest request)
        {
            // Проверка существования работы и навыка
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

            // Проверка прав доступа
            var userId = Guid.NewGuid(); // TODO: Заменить на получение из токена
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

        // Добавление навыка пользователю
        [HttpPost("AddSkillToUser")]
        public async Task<IActionResult> AddSkillToUser([FromBody] AddSkillToUserRequest request)
        {
            // Проверка существования пользователя и навыка
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

            // Проверка прав доступа
            var userId = Guid.NewGuid(); // TODO: Заменить на получение из токена
            var isSuperAdmin = await _usersRepository.IsSuperAdminAsync(userId);
            var isUserOwner = request.UserId == userId;
            if (!isSuperAdmin && !isUserOwner)
            {
                return Forbid("Only super admins or the user themselves can add skills to users.");
            }

            await _skillsRepository.AddSkillToUserAsync(request.SkillId, request.UserId);
            return NoContent();
        }

        // Удаление навыка у пользователя
        [HttpPost("RemoveSkillFromUser")]
        public async Task<IActionResult> RemoveSkillFromUser([FromBody] RemoveSkillFromUserRequest request)
        {
            // Проверка существования пользователя и навыка
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

            // Проверка прав доступа
            var userId = Guid.NewGuid(); // TODO: Заменить на получение из токена
            var isSuperAdmin = await _usersRepository.IsSuperAdminAsync(userId);
            var isUserOwner = request.UserId == userId;
            if (!isSuperAdmin && !isUserOwner)
            {
                return Forbid("Only super admins or the user themselves can remove skills from users.");
            }

            await _skillsRepository.RemoveSkillFromUserAsync(request.SkillId, request.UserId);
            return NoContent();
        }

        // Вспомогательный метод для получения навыка по ID
        private async Task<ActionResult<DbSkill>> GetSkill(Guid id)
        {
            var skill = await _skillsRepository.GetSkillByIdAsync(id);
            if (skill == null)
            {
                return NotFound("Skill not found.");
            }
            return skill;
        }
    }
}