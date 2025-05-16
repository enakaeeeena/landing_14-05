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
    public class FormsController : ControllerBase
    {
        private readonly FormsRepository _formsRepository;


        public FormsController(
            FormsRepository formsRepository)
        {
            _formsRepository = formsRepository;
        }

        [HttpPost("AddForm")]
        public async Task<ActionResult<FormResponse>> AddForm([FromBody] FormRequest request)
        {
            var form = DbFormMapper.Map(request);
            form.Id = Guid.NewGuid();
            await _formsRepository.AddFormAsync(form);

            return CreatedAtAction(nameof(GetForm), new { id = form.Id }, FormResponseMapper.Map(form));
        }

        [HttpPost("GetForms")]
        public async Task<ActionResult<FormsResponse>> GetForms([FromBody] GetFormsRequest request)
        {
            var (forms, totalCount) = await _formsRepository.GetFormsForAdminAsync(
                request.UserId,
                request.ProgramId,
                request.BlockId,
                request.IncludeHidden,
                request.PageNumber,
                request.PageSize);

            var response = new FormsResponse
            {
                Forms = forms.Select(FormResponseMapper.Map).ToList(),
                TotalCount = totalCount
            };

            return Ok(response);
        }

        [HttpPut("HideForm/{id}")]
        public async Task<IActionResult> HideForm(Guid id)
        {
            var form = await _formsRepository.GetFormByIdAsync(id);
            if (form == null)
            {
                return NotFound("Form not found.");
            }

            // Проверка прав админа
            var userId = Guid.NewGuid(); // Заменить на реальный UserId
            if (!await _formsRepository.CheckAdminAccessAsync(userId, id))
            {
                return Forbid("User is not an admin of this program.");
            }

            form.IsHidden = true;
            await _formsRepository.UpdateFormAsync(form);
            return NoContent();
        }

        [HttpPost("HideForms")]
        public async Task<IActionResult> HideForms([FromBody] HideFormsRequest request)
        {
            await _formsRepository.HideFormsAsync(
                request.UserId,
                request.BlockId,
                request.FormIds,
                request.FromDate,
                request.ToDate);
            return NoContent();
        }

        [HttpPut("ShowForm/{id}")]
        public async Task<IActionResult> ShowForm(Guid id)
        {
            var form = await _formsRepository.GetFormByIdAsync(id);
            if (form == null)
            {
                return NotFound("Form not found.");
            }

            // Проверка прав админа
            var userId = Guid.NewGuid(); // Заменить на реальный UserId
            if (!await _formsRepository.CheckAdminAccessAsync(userId, id))
            {
                return Forbid("User is not an admin of this program.");
            }

            form.IsHidden = false;
            await _formsRepository.UpdateFormAsync(form);
            return NoContent();
        }

        [HttpPost("ShowForms")]
        public async Task<IActionResult> ShowForms([FromBody] ShowFormsRequest request)
        {
            await _formsRepository.ShowFormsAsync(
                request.UserId,
                request.BlockId,
                request.FormIds,
                request.FromDate,
                request.ToDate);
            return NoContent();
        }

        [HttpDelete("RemoveForm/{id}")]
        public async Task<IActionResult> RemoveForm(Guid id)
        {
            var form = await _formsRepository.GetFormByIdAsync(id);
            if (form == null)
            {
                return NotFound("Form not found.");
            }

            // Проверка прав админа
            var userId = Guid.NewGuid(); // Заменить на реальный UserId
            if (!await _formsRepository.CheckAdminAccessAsync(userId, id))
            {
                return Forbid("User is not an admin of this program.");
            }

            await _formsRepository.RemoveFormAsync(id);
            return NoContent();
        }

        [HttpPost("RemoveForms")]
        public async Task<IActionResult> RemoveForms([FromBody] RemoveFormsRequest request)
        {
            await _formsRepository.RemoveFormsAsync(
                request.UserId,
                request.BlockId,
                request.FormIds,
                request.FromDate,
                request.ToDate);
            return NoContent();
        }


        private async Task<ActionResult<DbForm>> GetForm(Guid id)
        {
            var form = await _formsRepository.GetFormByIdAsync(id);
            if (form == null)
            {
                return NotFound();
            }

            // Проверка прав админа

            var userId = Guid.NewGuid(); // Заменить на реальный UserId
            if (!await _formsRepository.CheckAdminAccessAsync(userId, id))
            {
                return Forbid("User is not an admin of this program.");
            }

            return form;
        }
    }
}
