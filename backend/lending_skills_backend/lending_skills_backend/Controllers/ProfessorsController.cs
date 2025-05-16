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
    public class ProfessorsController : ControllerBase
    {
        private readonly ProfessorsRepository _professorsRepository;
        private readonly UsersRepository _usersRepository;
        private readonly ApplicationDbContext _context;

        public ProfessorsController(
            ProfessorsRepository professorsRepository,
            UsersRepository usersRepository,
            ApplicationDbContext context)
        {
            _professorsRepository = professorsRepository;
            _usersRepository = usersRepository;
            _context = context;
        }

        [HttpPost("GetProfessors")]
        public async Task<ActionResult<ProfessorsResponse>> GetProfessors([FromBody] GetProfessorsRequest request)
        {
            var (professors, totalCount) = await _professorsRepository.GetProfessorsAsync(
                request.ProgramId,
                request.FirstName,
                request.LastName,
                request.Patronymic,
                request.PageNumber,
                request.PageSize);

            var response = new ProfessorsResponse
            {
                Professors = professors.Select(ProfessorResponseMapper.Map).ToList(),
                TotalCount = totalCount
            };

            return Ok(response);
        }

        [HttpPost("AddProfessor")]
        public async Task<ActionResult<ProfessorResponse>> AddProfessor([FromBody] AddProfessorRequest request)
        {
            // Проверка валидации запроса
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                // Проверка прав
                var isSuperAdmin = await _usersRepository.IsSuperAdminAsync(request.AdminId);
                bool isProgramAdmin = false;
                if (request.ProgramId.HasValue)
                {
                    // Проверка существования программы
                    var programExists = await _context.Programs.AnyAsync(p => p.Id == request.ProgramId.Value);
                    if (!programExists)
                    {
                        return BadRequest("Program with the specified ProgramId does not exist.");
                    }

                    isProgramAdmin = await _professorsRepository.IsProgramAdminAsync(request.AdminId, request.ProgramId.Value);
                }

                if (!isSuperAdmin && !isProgramAdmin)
                {
                    return Forbid("Only super admins or program admins can perform this action.");
                }

                var professor = DbProfessorMapper.Map(request);
                await _professorsRepository.AddProfessorAsync(professor, request.ProgramId);

                return CreatedAtAction(nameof(GetProfessor), new { id = professor.Id }, ProfessorResponseMapper.Map(professor));
            }
            catch (DbUpdateException ex)
            {
                //_logger.LogError(ex, "Error occurred while adding professor.");
                return StatusCode(500, "An error occurred while adding the professor.");
            }
            catch (Exception ex)
            {
                //_logger.LogError(ex, "Unexpected error occurred while adding professor.");
                return StatusCode(500, "An unexpected error occurred.");
            }
        }

        [HttpPut("UpdateProfessor")]
        public async Task<IActionResult> UpdateProfessor([FromBody] UpdateProfessorRequest request)
        {
            var professor = await _professorsRepository.GetProfessorByIdAsync(request.Id);
            if (professor == null)
            {
                return NotFound("Professor not found.");
            }

            // Проверка прав
            var isSuperAdmin = await _usersRepository.IsSuperAdminAsync(request.AdminId);
            bool isProgramAdmin = false;

            var professorPrograms = await _context.ProfessorsPrograms
                .Where(pp => pp.ProfessorId == request.Id)
                .ToListAsync();
            foreach (var pp in professorPrograms)
            {
                if (await _professorsRepository.IsProgramAdminAsync(request.AdminId, pp.ProgramId))
                {
                    isProgramAdmin = true;
                    break;
                }
            }

            if (!isSuperAdmin && !isProgramAdmin)
            {
                return Forbid("Only super admins or program admins can perform this action.");
            }

            DbProfessorMapper.Map(professor, request);
            await _professorsRepository.UpdateProfessorAsync(professor);
            return NoContent();
        }

        [HttpPost("RemoveProfessorFromProgram")]
        public async Task<IActionResult> RemoveProfessorFromProgram([FromBody] RemoveProfessorFromProgramRequest request)
        {
            // Проверка прав
            var isSuperAdmin = await _usersRepository.IsSuperAdminAsync(request.AdminId);
            var isProgramAdmin = await _professorsRepository.IsProgramAdminAsync(request.AdminId, request.ProgramId);

            if (!isSuperAdmin && !isProgramAdmin)
            {
                return Forbid("Only super admins or program admins can perform this action.");
            }

            var professor = await _professorsRepository.GetProfessorByIdAsync(request.ProfessorId);
            if (professor == null)
            {
                return NotFound("Professor not found.");
            }

            await _professorsRepository.RemoveProfessorFromProgramAsync(request.ProfessorId, request.ProgramId);
            return NoContent();
        }

        [HttpPost("AddProfessorToProgram")]
        public async Task<IActionResult> AddProfessorToProgram([FromBody] AddProfessorToProgramRequest request)
        {
            // Проверка прав
            var isSuperAdmin = await _usersRepository.IsSuperAdminAsync(request.AdminId);
            var isProgramAdmin = await _professorsRepository.IsProgramAdminAsync(request.AdminId, request.ProgramId);

            if (!isSuperAdmin && !isProgramAdmin)
            {
                return Forbid("Only super admins or program admins can perform this action.");
            }

            var professor = await _professorsRepository.GetProfessorByIdAsync(request.ProfessorId);
            if (professor == null)
            {
                return NotFound("Professor not found.");
            }

            await _professorsRepository.AddProfessorToProgramAsync(request.ProfessorId, request.ProgramId, request.AfterProfessorId);
            return NoContent();
        }

        [HttpPost("ChangeProfessorProgramPosition")]
        public async Task<IActionResult> ChangeProfessorProgramPosition([FromBody] ChangeProfessorProgramPositionRequest request)
        {
            // Проверка прав
            var isSuperAdmin = await _usersRepository.IsSuperAdminAsync(request.AdminId);
            var isProgramAdmin = await _professorsRepository.IsProgramAdminAsync(request.AdminId, request.ProgramId);

            if (!isSuperAdmin && !isProgramAdmin)
            {
                return Forbid("Only super admins or program admins can perform this action.");
            }

            var professor = await _professorsRepository.GetProfessorByIdAsync(request.ProfessorId);
            if (professor == null)
            {
                return NotFound("Professor not found.");
            }

            await _professorsRepository.ChangeProfessorProgramPositionAsync(request.ProfessorId, request.ProgramId, request.AfterProfessorId);
            return NoContent();
        }

        private async Task<ActionResult<DbProfessor>> GetProfessor(Guid id)
        {
            var professor = await _professorsRepository.GetProfessorByIdAsync(id);
            if (professor == null)
            {
                return NotFound();
            }
            return professor;
        }
    }
}