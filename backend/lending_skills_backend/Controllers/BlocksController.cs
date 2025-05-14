using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using lending_skills_backend.Models;
using lending_skills_backend.DataAccess;
using lending_skills_backend.Dtos.Requests;
using lending_skills_backend.Mappers;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Text.Json;
using lending_skills_backend.Repositories;
using System.Linq;
using System.IO;

namespace lending_skills_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BlocksController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly BlocksRepository _blocksRepository;

        public BlocksController(ApplicationDbContext context, BlocksRepository blocksRepository)
        {
            _context = context;
            _blocksRepository = blocksRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DbBlock>>> GetBlocks()
        {
            return await _context.Blocks
                .Select(b => new DbBlock
                {
                    Id = b.Id,
                    Type = b.Type,
                    Title = b.Title,
                    Content = b.Content,
                    Visible = b.Visible,
                    CreatedAt = b.CreatedAt,
                    UpdatedAt = b.UpdatedAt,
                    Date = b.Date,
                    IsExample = b.IsExample,
                    NextBlockId = b.NextBlockId,
                    PreviousBlockId = b.PreviousBlockId,
                    FormId = b.FormId,
                    PageId = b.PageId
                })
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DbBlock>> GetBlock(Guid id)
        {
            var block = await _context.Blocks
                .Select(b => new DbBlock
                {
                    Id = b.Id,
                    Type = b.Type,
                    Title = b.Title,
                    Content = b.Content,
                    Visible = b.Visible,
                    CreatedAt = b.CreatedAt,
                    UpdatedAt = b.UpdatedAt,
                    Date = b.Date,
                    IsExample = b.IsExample,
                    NextBlockId = b.NextBlockId,
                    PreviousBlockId = b.PreviousBlockId,
                    FormId = b.FormId,
                    PageId = b.PageId
                })
                .FirstOrDefaultAsync(b => b.Id == id);

            if (block == null)
            {
                return NotFound();
            }

            return block;
        }

        [HttpPost]
        public async Task<ActionResult<DbBlock>> CreateBlock(CreateBlockRequest request)
        {
            try
            {
                if (request == null)
                {
                    return BadRequest(new { error = "Block data is required" });
                }

                // Validate required fields
                if (string.IsNullOrEmpty(request.Type))
                {
                    return BadRequest(new { error = "Type is required" });
                }

                if (string.IsNullOrEmpty(request.Title))
                {
                    return BadRequest(new { error = "Title is required" });
                }

                if (string.IsNullOrEmpty(request.Content))
                {
                    return BadRequest(new { error = "Content is required" });
                }

                if (string.IsNullOrEmpty(request.Date))
                {
                    return BadRequest(new { error = "Date is required" });
                }

                if (string.IsNullOrEmpty(request.IsExample))
                {
                    return BadRequest(new { error = "IsExample is required" });
                }

                var newBlock = request.ToDbBlock();
                _context.Blocks.Add(newBlock);
                
                try 
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateException dbEx)
                {
                    var innerMessage = dbEx.InnerException?.Message ?? "Unknown database error";
                    return BadRequest(new { error = $"Database error: {innerMessage}" });
                }

                return CreatedAtAction(nameof(GetBlock), new { id = newBlock.Id }, newBlock);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error creating block: {ex.Message}");
                Console.WriteLine($"Stack trace: {ex.StackTrace}");
                
                if (ex.InnerException != null)
                {
                    Console.WriteLine($"Inner exception: {ex.InnerException.Message}");
                    Console.WriteLine($"Inner exception stack trace: {ex.InnerException.StackTrace}");
                }

                return BadRequest(new { error = $"Server error: {ex.Message}" });
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<DbBlock>> UpdateBlock(Guid id, EditBlockRequest request)
        {
            var block = await _context.Blocks.FindAsync(id);
            if (block == null)
            {
                return NotFound();
            }

            block.UpdateFromRequest(request);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BlockExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(block);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateBlocks(IEnumerable<DbBlock> blocks)
        {
            foreach (var block in blocks)
            {
                block.UpdatedAt = DateTime.UtcNow;
                _context.Entry(block).State = EntityState.Modified;
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBlock(Guid id)
        {
            var block = await _context.Blocks.FindAsync(id);
            if (block == null)
            {
                return NotFound();
            }

            _context.Blocks.Remove(block);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut]
        [Route("ChangePosition")]
        [ApiExplorerSettings(IgnoreApi = false)]
        public async Task<IActionResult> ChangeBlockPosition([FromBody] Dtos.Requests.ChangeBlockPositionRequest request)
        {
            Console.WriteLine($"Received request: {JsonSerializer.Serialize(request)}");
            Console.WriteLine($"Request body: {await new StreamReader(Request.Body).ReadToEndAsync()}");

            if (request == null)
            {
                Console.WriteLine("Request is null");
                return BadRequest(new { message = "Request body is required" });
            }

            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage);
                Console.WriteLine($"Model state is invalid: {string.Join(", ", errors)}");
                foreach (var error in ModelState.Values.SelectMany(v => v.Errors))
                {
                    Console.WriteLine($"Validation error: {error.ErrorMessage}");
                }
                return BadRequest(new { message = "Invalid request data", errors = ModelState.ToDictionary(
                    kvp => kvp.Key,
                    kvp => kvp.Value.Errors.Select(e => e.ErrorMessage).ToArray()
                )});
            }

            try
            {
                if (request.BlockId == Guid.Empty)
                {
                    return BadRequest(new { message = "BlockId is required and must be a valid GUID" });
                }

                var blockToMove = await _context.Blocks.AsNoTracking().FirstOrDefaultAsync(b => b.Id == request.BlockId);
                if (blockToMove == null)
                {
                    Console.WriteLine($"Block with Id {request.BlockId} not found");
                    return NotFound(new { message = $"Block with Id {request.BlockId} not found." });
                }

                if (!blockToMove.PageId.HasValue)
                {
                    Console.WriteLine($"Block with Id {request.BlockId} does not belong to a page");
                    return BadRequest(new { message = $"Block with Id {request.BlockId} does not belong to a page or PageId is null." });
                }
                Guid pageId = blockToMove.PageId.Value;

                Console.WriteLine($"Moving block {request.BlockId} after {request.AfterBlockId} on page {pageId}");
                await _blocksRepository.ChangeBlockPositionAsync(request.BlockId, request.AfterBlockId, pageId);
                return Ok(new { message = "Block position changed successfully." });
            }
            catch (KeyNotFoundException ex)
            {
                Console.WriteLine($"KeyNotFoundException: {ex.Message}");
                return NotFound(new { message = ex.Message });
            }
            catch (InvalidOperationException ex)
            {
                Console.WriteLine($"InvalidOperationException: {ex.Message}");
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error changing block position: {ex.ToString()}"); 
                return StatusCode(500, new { message = "An unexpected error occurred while changing block position.", details = ex.Message });
            }
        }

        private bool BlockExists(Guid id)
        {
            return _context.Blocks.Any(e => e.Id == id);
        }
    }
} 