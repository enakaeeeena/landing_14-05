// Контроллер для управления пользователями системы
using lending_skills_backend.DataAccess;
using lending_skills_backend.Dtos.Requests;
using lending_skills_backend.Dtos.Responses;
using lending_skills_backend.Mappers;
using lending_skills_backend.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace lending_skills_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        // Репозитории для работы с данными
        private readonly UsersRepository _usersRepository;
        private readonly ProgramsRepository _programsRepository;
        private readonly SkillsRepository _skillsRepository;
        private readonly ApplicationDbContext _context;

        // Конструктор контроллера с внедрением зависимостей
        public UsersController(
            UsersRepository usersRepository,
            ProgramsRepository programsRepository,
            SkillsRepository skillsRepository)
        {
            _usersRepository = usersRepository;
            _programsRepository = programsRepository;
            _skillsRepository = skillsRepository;
        }

        // Получение списка профилей пользователей с фильтрацией и пагинацией
        [HttpPost("GetProfiles")]
        public async Task<ActionResult<List<ProfileResponse>>> GetProfiles([FromBody] GetProfilesRequest request)
        {
            // Получение идентификатора текущего пользователя из токена
            var currentUserId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

            // Проверка прав доступа
            var isSuperAdmin = await _usersRepository.IsSuperAdminAsync(currentUserId);
            var isProgramAdmin = request.ProgramId.HasValue && await _programsRepository.IsAdminOfProgramAsync(currentUserId, request.ProgramId.Value);
            if (!isSuperAdmin && !isProgramAdmin)
            {
                return Forbid("Only super admins or program admins can view profiles.");
            }

            // Получение профилей из репозитория
            var profiles = await _usersRepository.GetProfilesAsync(
                request.PageNumber,
                request.PageSize,
                request.ProgramId,
                request.SearchQuery);

            // Формирование ответа с навыками пользователей
            var profileResponses = new List<ProfileResponse>();
            foreach (var profile in profiles)
            {
                var skillsForUser = (await _context.SkillsUsers
                    .Where(su => su.UserId == profile.Id)
                    .Select(su => su.Skill)
                    .ToListAsync())
                    .Select(SkillResponseMapper.Map)
                    .ToList();

                profileResponses.Add(ProfileResponseMapper.Map(profile, skillsForUser));
            }

            return Ok(profileResponses);
        }

        // Получение профиля конкретного пользователя
        [HttpGet("GetProfile/{userId}")]
        public async Task<ActionResult<ProfileResponse>> GetProfile(Guid userId)
        {
            // Проверка прав доступа к профилю
            var currentUserId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            if (userId != currentUserId)
            {
                return Forbid("You can only view your own profile.");
            }

            // Получение данных профиля
            var profile = await _usersRepository.GetProfileByIdAsync(userId);
            if (profile == null)
            {
                return NotFound("Profile not found.");
            }

            // Получение навыков пользователя
            var skillsForUser = (await _context.SkillsUsers
                .Where(su => su.UserId == profile.Id)
                .Select(su => su.Skill)
                .ToListAsync())
                .Select(SkillResponseMapper.Map)
                .ToList();

            return Ok(ProfileResponseMapper.Map(profile, skillsForUser));
        }

        // Создание профиля студента
        [HttpPost("CreateStudentProfile")]
        public async Task<ActionResult<ProfileResponse>> CreateStudentProfile([FromBody] CreateStudentProfileRequest request)
        {
            // Проверка прав доступа
            var currentUserId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var isSuperAdmin = await _usersRepository.IsSuperAdminAsync(currentUserId);
            var isProgramAdmin = request.ProgramId.HasValue && await _programsRepository.IsAdminOfProgramAsync(currentUserId, request.ProgramId.Value);
            if (!isSuperAdmin && !isProgramAdmin)
            {
                return Forbid("Only super admins or program admins can create student profiles.");
            }

            // Проверка уникальности email
            var existingUser = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == request.Email);
            if (existingUser != null)
            {
                return BadRequest("User with this email already exists.");
            }

            // Создание нового пользователя
            var user = DbUserMapper.Map(request);
            user.Id = Guid.NewGuid();
            user.Role = "Student";
            user.IsActive = true;
            await _usersRepository.AddUserAsync(user);

            return CreatedAtAction(
                nameof(GetProfile),
                new { userId = user.Id },
                ProfileResponseMapper.Map(user, new List<SkillResponse>()));
        }

        // Обновление профиля пользователя
        [HttpPut("UpdateProfile")]
        public async Task<IActionResult> UpdateProfile([FromBody] UpdateProfileRequest request)
        {
            // Проверка существования профиля
            var user = await _usersRepository.GetProfileByIdAsync(request.Id);
            if (user == null)
            {
                return NotFound("Profile not found.");
            }

            // Проверка прав доступа
            var currentUserId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            if (currentUserId != request.Id)
            {
                return Forbid("Only the student can update their own profile.");
            }

            // Проверка уникальности email
            var existingUser = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == request.Email && u.Id != request.Id);
            if (existingUser != null)
            {
                return BadRequest("Another user with this email already exists.");
            }

            // Обновление данных пользователя
            DbUserMapper.Map(user, request);
            await _usersRepository.UpdateUserAsync(user);
            return NoContent();
        }

        // Скрытие профиля пользователя
        [HttpPost("HideProfile")]
        public async Task<IActionResult> HideProfile([FromBody] HideProfileRequest request)
        {
            // Проверка существования профиля
            var user = await _usersRepository.GetProfileByIdAsync(request.UserId);
            if (user == null)
            {
                return NotFound("Profile not found.");
            }

            // Проверка прав доступа
            var currentUserId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            if (currentUserId != request.UserId)
            {
                return Forbid("Only the student can hide their own profile.");
            }

            await _usersRepository.HideProfileAsync(request.UserId);
            return NoContent();
        }

        // Показ профиля пользователя
        [HttpPost("ShowProfile")]
        public async Task<IActionResult> ShowProfile([FromBody] ShowProfileRequest request)
        {
            // Проверка существования профиля
            var user = await _usersRepository.GetProfileByIdAsync(request.UserId);
            if (user == null)
            {
                return NotFound("Profile not found.");
            }

            // Проверка прав доступа
            var currentUserId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            if (currentUserId != request.UserId)
            {
                return Forbid("Only the student can show their own profile.");
            }

            await _usersRepository.ShowProfileAsync(request.UserId);
            return NoContent();
        }

        // Удаление профиля пользователя
        [HttpDelete("DeleteProfile/{userId}")]
        public async Task<IActionResult> DeleteProfile(Guid userId)
        {
            // Проверка существования профиля
            var user = await _usersRepository.GetProfileByIdAsync(userId);
            if (user == null)
            {
                return NotFound("Profile not found.");
            }

            // Проверка прав доступа
            var currentUserId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var isSuperAdmin = await _usersRepository.IsSuperAdminAsync(currentUserId);
            if (!isSuperAdmin)
            {
                return Forbid("Only super admins can delete profiles.");
            }

            await _usersRepository.DeleteProfileAsync(userId);
            return NoContent();
        }
    }
}
