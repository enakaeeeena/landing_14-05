// Контроллер для управления блоками контента
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using lending_skills_backend.Models;
using lending_skills_backend.DataAccess;
using lending_skills_backend.Dtos.Requests;
using System;
using System.Threading.Tasks;

namespace lending_skills_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BlocksController : ControllerBase
    {
        // Контекст базы данных
        private readonly ApplicationDbContext _context;

        // Конструктор контроллера
        public BlocksController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Получение всех блоков
        [HttpGet]
        public async Task<IActionResult> GetBlocks()
        {
            try
            {
                var blocks = await _context.Blocks.ToListAsync();
                return Ok(blocks);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = $"Internal server error: {ex.Message}" });
            }
        }

        // Получение конкретного блока по идентификатору
        [HttpGet("{id}")]
        public async Task<IActionResult> GetBlock(Guid id)
        {
            try
            {
                var block = await _context.Blocks.FindAsync(id);
                if (block == null)
                {
                    return NotFound(new { error = "Block not found" });
                }
                return Ok(block);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = $"Internal server error: {ex.Message}" });
            }
        }

        // Создание нового блока
        [HttpPost]
        public async Task<IActionResult> CreateBlock([FromBody] CreateBlockRequest request)
        {
            try
            {
                var block = new DbBlock
                {
                    Id = Guid.NewGuid(),
                    Type = request.type.ToLower(),
                    Title = request.title,
                    Content = request.content,
                    Visible = request.visible,
                    CreatedAt = DateTime.UtcNow,
                    Date = request.date,
                    IsExample = request.isExample
                };

                _context.Blocks.Add(block);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetBlock), new { id = block.Id }, block);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = $"Internal server error: {ex.Message}" });
            }
        }

        // Обновление блока
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBlock(Guid id, [FromBody] EditBlockRequest request)
        {
            try 
            {
                if (id != request.id)
                {
                    return BadRequest(new { error = "Id mismatch" });
                }

                var block = await _context.Blocks.FindAsync(id);
                if (block == null)
                {
                    return NotFound(new { error = "Block not found" });
                }

                try
                {
                    // Обновляем базовые поля блока
                    block.Type = request.type?.ToLower() ?? block.Type;
                    block.Title = request.title ?? block.Title;
                    block.Visible = request.visible ?? block.Visible;
                    block.Date = request.date ?? block.Date;
                    block.IsExample = request.isExample ?? block.IsExample;
                    block.UpdatedAt = DateTime.UtcNow;

                    // Обновляем контент только если он предоставлен
                    if (request.content != null)
                    {
                        // Проверяем размер контента
                        if (request.content.Length > 1000000) // Если контент больше 1MB
                        {
                            return BadRequest(new { error = "Content size exceeds maximum allowed size" });
                        }
                        block.Content = request.content;
                    }

                    // Сохраняем изменения порциями
                    await _context.SaveChangesAsync();
                    return Ok(block);
                }
                catch (DbUpdateException dbEx)
                {
                    Console.WriteLine($"Database error while updating block {id}: {dbEx.Message}");
                    Console.WriteLine($"Inner exception: {dbEx.InnerException?.Message}");
                    return BadRequest(new { error = $"Database error: {dbEx.InnerException?.Message ?? dbEx.Message}" });
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error while updating block {id}: {ex.Message}");
                    Console.WriteLine($"Stack trace: {ex.StackTrace}");
                    return StatusCode(500, new { error = $"Internal server error: {ex.Message}" });
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Critical error in UpdateBlock for id {id}: {ex.Message}");
                Console.WriteLine($"Stack trace: {ex.StackTrace}");
                return StatusCode(500, new { error = "A critical error occurred while processing your request" });
            }
        }

        [HttpPut("{id}/content")]
        public async Task<IActionResult> UpdateBlockContent(Guid id, [FromBody] UpdateBlockContentRequest request)
        {
            try
            {
                var block = await _context.Blocks.FindAsync(id);
                if (block == null)
                {
                    return NotFound(new { error = "Block not found" });
                }

                try
                {
                    // Проверяем размер контента
                    if (request.content.Length > 1000000) // Если контент больше 1MB
                    {
                        return BadRequest(new { error = "Content size exceeds maximum allowed size" });
                    }

                    block.Content = request.content;
                    block.UpdatedAt = DateTime.UtcNow;

                    await _context.SaveChangesAsync();
                    return Ok(block);
                }
                catch (DbUpdateException dbEx)
                {
                    Console.WriteLine($"Database error while updating block content {id}: {dbEx.Message}");
                    Console.WriteLine($"Inner exception: {dbEx.InnerException?.Message}");
                    return BadRequest(new { error = $"Database error: {dbEx.InnerException?.Message ?? dbEx.Message}" });
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error while updating block content {id}: {ex.Message}");
                    Console.WriteLine($"Stack trace: {ex.StackTrace}");
                    return StatusCode(500, new { error = $"Internal server error: {ex.Message}" });
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Critical error in UpdateBlockContent for id {id}: {ex.Message}");
                Console.WriteLine($"Stack trace: {ex.StackTrace}");
                return StatusCode(500, new { error = "A critical error occurred while processing your request" });
            }
        }

        // Удаление блока
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBlock(Guid id)
        {
            try
            {
                var block = await _context.Blocks.FindAsync(id);
                if (block == null)
                {
                    return NotFound(new { error = "Block not found" });
                }

                _context.Blocks.Remove(block);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = $"Internal server error: {ex.Message}" });
            }
        }
    }

    public class UpdateBlockContentRequest
    {
        public string content { get; set; }
    }
} 