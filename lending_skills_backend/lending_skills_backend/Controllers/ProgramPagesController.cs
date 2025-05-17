using Microsoft.AspNetCore.Mvc;
using lending_skills_backend.Repositories;
using Microsoft.EntityFrameworkCore;
using lending_skills_backend.Models;
using lending_skills_backend.DataAccess;
using lending_skills_backend.Dtos.Responses;
using lending_skills_backend.Mappers;
using lending_skills_backend.Dtos.Requests;

namespace lending_skills_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProgramPagesController : ControllerBase
    {
        private readonly ProgramsRepository _programsRepository;
        private readonly BlocksRepository _blocksRepository;
        private readonly ApplicationDbContext _context;

        public ProgramPagesController(
            ProgramsRepository programsRepository, 
            BlocksRepository blocksRepository, 
            ApplicationDbContext context)
        {
            _programsRepository = programsRepository;
            _blocksRepository = blocksRepository;
            _context = context;
        }

        [HttpGet("GetProgramMainPage/{programId}")]
        public async Task<ActionResult<ProgramResponse>> GetProgramMainPage(Guid programId)
        {
            var program = await _programsRepository.GetProgramByIdAsync(programId);
            if (program == null)
            {
                return NotFound("Program not found.");
            }

            return Ok(ProgramResponseMapper.Map(program));
        }

        [HttpPost("GetPage")]
        public async Task<ActionResult<ProgramResponse>> GetPage([FromBody] GetPageRequest request)
        {
            var program = await _programsRepository.GetProgramByIdAsync(request.ProgramId);
            if (program == null)
            {
                return NotFound("Program not found.");
            }

            var blocks = await _blocksRepository.GetBlocksAsync();
            blocks = blocks.Where(b => b.Page != null && program.Pages.Any(p => p.Id == b.PageId));

            if (!request.IncludeExample)
            {
                blocks = blocks.Where(b => b.IsExample == "false");
            }

            // Сортировка блоков по порядку (цепочка NextBlockId/PreviousBlockId)
            var orderedBlocks = new List<DbBlock>();
            var pageBlocks = blocks.Where(b => b.PageId.HasValue).ToList();
            var visited = new HashSet<Guid>();

            foreach (var block in pageBlocks.Where(b => b.PreviousBlockId == null))
            {
                var currentBlockId = block.Id;
                while (currentBlockId != Guid.Empty && !visited.Contains(currentBlockId))
                {
                    visited.Add(currentBlockId);
                    var currentBlock = pageBlocks.FirstOrDefault(b => b.Id == currentBlockId);
                    if (currentBlock != null)
                    {
                        orderedBlocks.Add(currentBlock);
                    }
                    currentBlockId = currentBlock?.NextBlockId ?? Guid.Empty;
                }
            }

            var programResponse = ProgramResponseMapper.Map(program);
            programResponse.Pages.ForEach(p =>
            {
                p.Blocks = p.Blocks.Where(b => blocks.Any(b2 => b2.Id == b.Id)).ToList();
            });

            return Ok(programResponse);
        }

        [HttpPost("AddBlockToPage")]
        public async Task<ActionResult<BlockResponse>> AddBlockToPage([FromBody] AddBlockToPageRequest request)
        {
            var page = await _context.Pages
                .Include(p => p.Program)
                .FirstOrDefaultAsync(p => p.Id == request.PageId);
            if (page == null)
            {
                return NotFound("Page not found.");
            }

            // Проверка прав админа (предполагаем, что UserId доступен из контекста авторизации)
            var userId = Guid.NewGuid(); // Заменить на реальный UserId из контекста авторизации
            if (!await _programsRepository.IsAdminOfProgramAsync(userId, page.ProgramId))
            {
                return Forbid("User is not an admin of this program.");
            }

            var block = DbBlockMapper.Map(request);
            block.Id = Guid.NewGuid();
            await _blocksRepository.AddBlockToPageAsync(request.PageId, block, request.AfterBlockId);

            return CreatedAtAction(nameof(GetBlock), new { id = block.Id }, BlockResponseMapper.Map(block));
        }

        [HttpPost("ChangeBlockPosition")]
        public async Task<IActionResult> ChangeBlockPosition([FromBody] ChangeBlockPositionRequest request)
        {
            var block = await _blocksRepository.GetBlockByIdAsync(request.BlockId);
            if (block == null)
            {
                return NotFound("Block not found.");
            }

            var page = await _context.Pages
                .Include(p => p.Program)
                .FirstOrDefaultAsync(p => p.Id == block.PageId);
            if (page == null)
            {
                return NotFound("Page not found.");
            }

            // Проверка прав админа 
            var userId = Guid.NewGuid(); // Заменить на реальный UserId
            if (!await _programsRepository.IsAdminOfProgramAsync(userId, page.ProgramId))
            {
                return Forbid("User is not an admin of this program.");
            }

            await _blocksRepository.ChangeBlockPositionAsync(request.BlockId, request.AfterBlockId);
            return NoContent();
        }

        [HttpPut("EditBlock")]
        public async Task<IActionResult> EditBlock([FromBody] EditBlockRequest request)
        {
            try
            {
                if (request == null)
                {
                    return BadRequest(new { error = "Request cannot be null" });
                }

                Console.WriteLine($"Received EditBlock request: {System.Text.Json.JsonSerializer.Serialize(request)}");

                var block = await _blocksRepository.GetBlockByIdAsync(request.id);
                if (block == null)
                {
                    return NotFound(new { error = "Block not found" });
                }

                try
                {
                    // Validate content size
                    if (request.content != null && request.content.Length > 1000000) // 1MB limit
                    {
                        return BadRequest(new { error = "Content size exceeds maximum allowed size" });
                    }

                    // Update block fields
                    block.Type = request.type?.ToLower() ?? block.Type;
                    block.Title = request.title ?? block.Title;
                    block.Content = request.content ?? block.Content;
                    block.Visible = request.visible ?? block.Visible;
                    block.Date = request.date ?? block.Date;
                    block.IsExample = request.isExample ?? block.IsExample;
                    block.UpdatedAt = DateTime.UtcNow;

                    Console.WriteLine($"Updating block with values: {System.Text.Json.JsonSerializer.Serialize(block)}");

                    await _blocksRepository.UpdateBlockAsync(block);
                    return Ok(new { message = "Block updated successfully", block = block });
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error updating block {request.id}: {ex.Message}");
                    Console.WriteLine($"Stack trace: {ex.StackTrace}");
                    return StatusCode(500, new { error = "Failed to update block", details = ex.Message });
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Critical error in EditBlock: {ex.Message}");
                Console.WriteLine($"Stack trace: {ex.StackTrace}");
                return StatusCode(500, new { error = "A critical error occurred", details = ex.Message });
            }
        }

        [HttpDelete("RemoveBlock/{id}")]
        public async Task<IActionResult> RemoveBlock(Guid id)
        {
            var block = await _blocksRepository.GetBlockByIdAsync(id);
            if (block == null)
            {
                return NotFound("Block not found.");
            }

            var page = await _context.Pages
                .Include(p => p.Program)
                .FirstOrDefaultAsync(p => p.Id == block.PageId);
            if (page == null)
            {
                return NotFound("Page not found.");
            }

            // Проверка прав админа
            var userId = Guid.NewGuid(); // Заменить на реальный UserId
            if (!await _programsRepository.IsAdminOfProgramAsync(userId, page.ProgramId))
            {
                return Forbid("User is not an admin of this program.");
            }


            await _blocksRepository.DeleteBlockAsync(id);
            return NoContent();
        }

        [HttpPost("AddProgram")]
        public async Task<ActionResult<ProgramResponse>> AddProgram([FromBody] AddProgramRequest request)
        {
            var userId = Guid.NewGuid(); // Заменить на реальный UserId
            var isSuperAdmin = await _context.Users.AnyAsync(u => u.Id == userId && u.IsAdmin);
            if (!isSuperAdmin)
            {
                return Forbid("Only super admins can add programs.");
            }

            var program = DbProgramMapper.Map(request);
            program.Id = Guid.NewGuid();
            program.IsActive = false;

            await _programsRepository.AddProgramAsync(program);
            return CreatedAtAction(nameof(GetProgramMainPage), new { programId = program.Id }, ProgramResponseMapper.Map(program));
        }


        [HttpPut("EditProgram")]
        public async Task<IActionResult> EditProgram([FromBody] EditProgramRequest request)
        {
            var program = await _programsRepository.GetProgramByIdAsync(request.Id);
            if (program == null)
            {
                return NotFound("Program not found.");
            }

            var userId = Guid.NewGuid(); // Заменить на реальный UserId
            if (!await _programsRepository.IsAdminOfProgramAsync(userId, program.Id))
            {
                return Forbid("User is not an admin of this program.");
            }


            UpdateDbProgramMapper.Map(program, request);
            await _programsRepository.UpdateProgramAsync(program);
            return NoContent();
        }

        [HttpDelete("DeleteProgram/{id}")]
        public async Task<IActionResult> DeleteProgram(Guid id)
        {
            var program = await _programsRepository.GetProgramByIdAsync(id);
            if (program == null)
            {
                return NotFound("Program not found.");
            }
            var userId = Guid.NewGuid(); // Заменить на реальный UserId
            var isSuperAdmin = await _context.Users.AnyAsync(u => u.Id == userId && u.IsAdmin);
            if (!isSuperAdmin)
            {
                return Forbid("Only super admins can delete programs.");
            }

            await _programsRepository.DeleteProgramAsync(id);
            return NoContent();
        }

        private async Task<ActionResult<DbBlock>> GetBlock(Guid id)
        {
            var block = await _blocksRepository.GetBlockByIdAsync(id);
            if (block == null)
            {
                return NotFound();
            }
            return block;
        }
    }
}
