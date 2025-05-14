using lending_skills_backend.Dtos.Requests;
using lending_skills_backend.Dtos.Responses;
using lending_skills_backend.Mappers;
using lending_skills_backend.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace lending_skills_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminsController : ControllerBase
    {
        private readonly UsersRepository _usersRepository;

        public AdminsController(UsersRepository usersRepository)
        {
            _usersRepository = usersRepository;
        }

        [HttpPut("AddAdmin/{id}")]
        public async Task<IActionResult> AddAdmin(Guid id)
        {
            var user = await _usersRepository.GetUserByIdAsync(id);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            // Проверка прав админа админов
            var adminId = Guid.NewGuid(); // Заменить на реальный AdminId из контекста авторизации
            if (!await _usersRepository.IsSuperAdminAsync(adminId))
            {
                return Forbid("Only super admins can perform this action.");
            }

            user.IsAdmin = true;
            await _usersRepository.UpdateUserAsync(user);
            return NoContent();
        }

        [HttpPut("RemoveAdmin/{id}")]
        public async Task<IActionResult> RemoveAdmin(Guid id)
        {
            var user = await _usersRepository.GetUserByIdAsync(id);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            // Проверка прав админа админов
            var adminId = Guid.NewGuid(); // Заменить на реальный AdminId
            if (!await _usersRepository.IsSuperAdminAsync(adminId))
            {
                return Forbid("Only super admins can perform this action.");
            }

            user.IsAdmin = false;
            await _usersRepository.UpdateUserAsync(user);
            return NoContent();
        }

        [HttpGet("GetAdmins")]
        public async Task<ActionResult<List<UserResponse>>> GetAdmins()
        {
            // Проверка прав админа админов
            var adminId = Guid.NewGuid(); // Заменить на реальный AdminId
            if (!await _usersRepository.IsSuperAdminAsync(adminId))
            {
                return Forbid("Only super admins can perform this action.");
            }

            var admins = await _usersRepository.GetAdminsAsync();
            return Ok(admins.Select(UserResponseMapper.Map).ToList());
        }

        [HttpPost("AddProgramAdmin")]
        public async Task<IActionResult> AddProgramAdmin([FromBody] AddProgramAdminRequest request)
        {
            // Проверка прав админа админов
            if (!await _usersRepository.IsSuperAdminAsync(request.AdminId))
            {
                return Forbid("Only super admins can perform this action.");
            }

            var user = await _usersRepository.GetUserByIdAsync(request.UserId);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            await _usersRepository.AddProgramAdminAsync(request.UserId, request.ProgramId);
            return NoContent();
        }

        [HttpPost("RemoveProgramAdmin")]
        public async Task<IActionResult> RemoveProgramAdmin([FromBody] RemoveProgramAdminRequest request)
        {
            // Проверка прав админа админов
            if (!await _usersRepository.IsSuperAdminAsync(request.AdminId))
            {
                return Forbid("Only super admins can perform this action.");
            }

            var user = await _usersRepository.GetUserByIdAsync(request.UserId);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            await _usersRepository.RemoveProgramAdminAsync(request.UserId, request.ProgramId);
            return NoContent();
        }

        [HttpPost("GetUsers")]
        public async Task<ActionResult<GetUsersResponse>> GetUsers([FromBody] GetUsersRequest request)
        {
            // Проверка прав админа админов
            var adminId = Guid.NewGuid(); // Заменить на реальный AdminId
            if (!await _usersRepository.IsSuperAdminAsync(adminId))
            {
                return Forbid("Only super admins can perform this action.");
            }

            var (users, totalCount) = await _usersRepository.GetUsersAsync(
                request.FirstName,
                request.LastName,
                request.Patronymic,
                request.PageNumber,
                request.PageSize);

            var response = new GetUsersResponse
            {
                Users = users.Select(UserResponseMapper.Map).ToList(),
                TotalCount = totalCount
            };

            return Ok(response);
        }
    }
}
