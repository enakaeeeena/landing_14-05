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
    public class TagsController : ControllerBase
    {
        private readonly TagsRepository _tagsRepository;
        private readonly WorksRepository _worksRepository;
        private readonly UsersRepository _usersRepository;
        private readonly ProgramsRepository _programsRepository;

        public TagsController(
            TagsRepository tagsRepository,
            WorksRepository worksRepository,
            UsersRepository usersRepository,
            ProgramsRepository programsRepository)
        {
            _tagsRepository = tagsRepository;
            _worksRepository = worksRepository;
            _usersRepository = usersRepository;
            _programsRepository = programsRepository;
        }

        [HttpGet("GetTags")]
        public async Task<ActionResult<List<TagResponse>>> GetTags()
        {
            var tags = await _tagsRepository.GetTagsAsync();
            return Ok(tags.Select(TagResponseMapper.Map).ToList());
        }

        [HttpPost("AddTag")]
        public async Task<ActionResult<TagResponse>> AddTag([FromBody] AddTagRequest request)
        {
            var userId = Guid.NewGuid(); // Заменить на реальный UserId
            var isSuperAdmin = await _usersRepository.IsSuperAdminAsync(userId);
            var isProgramAdmin = request.ProgramId.HasValue && await _programsRepository.IsAdminOfProgramAsync(userId, request.ProgramId.Value);
            if (!isSuperAdmin && !isProgramAdmin)
            {
                return Forbid("Only super admins or program admins can add tags.");
            }

            var existingTag = await _tagsRepository.GetTagByNameAsync(request.Name);
            if (existingTag != null)
            {
                return BadRequest("Tag with this name already exists.");
            }

            var tag = DbTagMapper.Map(request);
            tag.Id = Guid.NewGuid();
            await _tagsRepository.AddTagAsync(tag);

            return CreatedAtAction(nameof(GetTag), new { id = tag.Id }, TagResponseMapper.Map(tag));
        }

        [HttpPut("UpdateTag")]
        public async Task<IActionResult> UpdateTag([FromBody] UpdateTagRequest request)
        {
            var tag = request.Id.HasValue
                ? await _tagsRepository.GetTagByIdAsync(request.Id.Value)
                : await _tagsRepository.GetTagByNameAsync(request.OldName);
            if (tag == null)
            {
                return NotFound("Tag not found.");
            }

            var userId = Guid.NewGuid(); // Заменить на реальный UserId
            var isSuperAdmin = await _usersRepository.IsSuperAdminAsync(userId);
            var isProgramAdmin = request.ProgramId.HasValue && await _programsRepository.IsAdminOfProgramAsync(userId, request.ProgramId.Value);
            if (!isSuperAdmin && !isProgramAdmin)
            {
                return Forbid("Only super admins or program admins can update tags.");
            }

            var existingTag = await _tagsRepository.GetTagByNameAsync(request.NewName);
            if (existingTag != null && existingTag.Id != tag.Id)
            {
                return BadRequest("Tag with this name already exists.");
            }

            DbTagMapper.Map(tag, request);
            await _tagsRepository.UpdateTagAsync(tag);
            return NoContent();
        }

        [HttpDelete("RemoveTag")]
        public async Task<IActionResult> RemoveTag([FromBody] RemoveTagRequest request)
        {
            var tag = request.Id.HasValue
                ? await _tagsRepository.GetTagByIdAsync(request.Id.Value)
                : await _tagsRepository.GetTagByNameAsync(request.Name);
            if (tag == null)
            {
                return NotFound("Tag not found.");
            }

            var userId = Guid.NewGuid(); // Заменить на реальный UserId
            var isSuperAdmin = await _usersRepository.IsSuperAdminAsync(userId);
            var isProgramAdmin = request.ProgramId.HasValue && await _programsRepository.IsAdminOfProgramAsync(userId, request.ProgramId.Value);
            if (!isSuperAdmin && !isProgramAdmin)
            {
                return Forbid("Only super admins or program admins can remove tags.");
            }

            if (request.Id.HasValue)
            {
                await _tagsRepository.RemoveTagAsync(request.Id.Value);
            }
            else
            {
                await _tagsRepository.RemoveTagByNameAsync(request.Name);
            }
            return NoContent();
        }

        [HttpPost("AddTagToWork")]
        public async Task<IActionResult> AddTagToWork([FromBody] AddTagToWorkRequest request)
        {
            var work = await _worksRepository.GetWorkByIdAsync(request.WorkId);
            if (work == null)
            {
                return NotFound("Work not found.");
            }

            var tag = await _tagsRepository.GetTagByIdAsync(request.TagId);
            if (tag == null)
            {
                return NotFound("Tag not found.");
            }

            var userId = Guid.NewGuid(); // Заменить на реальный UserId
            var isSuperAdmin = await _usersRepository.IsSuperAdminAsync(userId);
            var isProgramAdmin = await _programsRepository.IsAdminOfProgramAsync(userId, work.ProgramId);
            var isWorkOwner = work.UserId == userId;
            if (!isSuperAdmin && !isProgramAdmin && !isWorkOwner)
            {
                return Forbid("Only super admins, program admins, or work owners can add tags to works.");
            }

            await _tagsRepository.AddTagToWorkAsync(request.TagId, request.WorkId);
            return NoContent();
        }

        [HttpPost("RemoveTagFromWork")]
        public async Task<IActionResult> RemoveTagFromWork([FromBody] RemoveTagFromWorkRequest request)
        {
            var work = await _worksRepository.GetWorkByIdAsync(request.WorkId);
            if (work == null)
            {
                return NotFound("Work not found.");
            }

            var tag = await _tagsRepository.GetTagByIdAsync(request.TagId);
            if (tag == null)
            {
                return NotFound("Tag not found.");
            }

            var userId = Guid.NewGuid(); // Заменить на реальный UserId
            var isSuperAdmin = await _usersRepository.IsSuperAdminAsync(userId);
            var isProgramAdmin = await _programsRepository.IsAdminOfProgramAsync(userId, work.ProgramId);
            var isWorkOwner = work.UserId == userId;
            if (!isSuperAdmin && !isProgramAdmin && !isWorkOwner)
            {
                return Forbid("Only super admins, program admins, or work owners can remove tags from works.");
            }

            await _tagsRepository.RemoveTagFromWorkAsync(request.TagId, request.WorkId);
            return NoContent();
        }

        private async Task<ActionResult<DbTag>> GetTag(Guid id)
        {
            var tag = await _tagsRepository.GetTagByIdAsync(id);
            if (tag == null)
            {
                return NotFound();
            }
            return tag;
        }
    }
}