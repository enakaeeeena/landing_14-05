using lending_skills_backend.DataAccess;
using lending_skills_backend.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace lending_skills_backend.Repositories
{
    public class PagesRepository
    {
        private readonly ApplicationDbContext _context;

        public PagesRepository(ApplicationDbContext context)
        {
            _context = context;
        }


        public async Task<IEnumerable<DbPage>> GetPagesAsync()
        {
            return await _context.Pages
                .Include(p => p.Blocks)
                .Include(p => p.Program)
                .ToListAsync();
        }

        public async Task<DbPage?> GetPageByIdAsync(Guid pageId)
        {
            return await _context.Pages
                .Include(p => p.Blocks)
                .Include(p => p.Program)
                .FirstOrDefaultAsync(p => p.Id == pageId);
        }

        public async Task AddPageAsync(DbPage page)
        {
            _context.Pages.Add(page);
            await _context.SaveChangesAsync();
        }

        public async Task UpdatePageAsync(DbPage page)
        {
            _context.Pages.Update(page);
            await _context.SaveChangesAsync();
        }

        public async Task RemovePageAsync(Guid pageId)
        {
            var page = await GetPageByIdAsync(pageId);
            if (page != null)
            {
                _context.Pages.Remove(page);
                await _context.SaveChangesAsync();
            }
        }

        public async Task AddBlockToPageAsync(Guid pageId, DbBlock block, Guid? afterBlockId)
        {
            block.PageId = pageId;

            if (afterBlockId.HasValue)
            {
                var afterBlock = await _context.Blocks
                    .FirstOrDefaultAsync(b => b.Id == afterBlockId.Value && b.PageId == pageId);
                if (afterBlock != null)
                {
                    // Вставляем блок после afterBlock
                    block.PreviousBlockId = afterBlock.Id;
                    block.NextBlockId = afterBlock.NextBlockId;

                    if (afterBlock.NextBlockId.HasValue)
                    {
                        var nextBlock = await _context.Blocks
                            .FirstOrDefaultAsync(b => b.Id == afterBlock.NextBlockId.Value);
                        if (nextBlock != null)
                        {
                            nextBlock.PreviousBlockId = block.Id;
                        }
                    }

                    afterBlock.NextBlockId = block.Id;
                }
                else
                {
                    // Если afterBlockId указан, но блок не найден, добавляем в конец
                    var lastBlock = await _context.Blocks
                        .Where(b => b.PageId == pageId && b.NextBlockId == null)
                        .FirstOrDefaultAsync();
                    if (lastBlock != null)
                    {
                        lastBlock.NextBlockId = block.Id;
                        block.PreviousBlockId = lastBlock.Id;
                    }
                }
            }
            else
            {
                // Добавляем блок последним, если afterBlockId не указан
                var lastBlock = await _context.Blocks
                    .Where(b => b.PageId == pageId && b.NextBlockId == null)
                    .FirstOrDefaultAsync();
                if (lastBlock != null)
                {
                    lastBlock.NextBlockId = block.Id;
                    block.PreviousBlockId = lastBlock.Id;
                }
            }

            _context.Blocks.Add(block);
            await _context.SaveChangesAsync();
        }

        public async Task ChangeBlockPositionAsync(Guid blockId, Guid? afterBlockId)
        {
            var block = await _context.Blocks
                .FirstOrDefaultAsync(b => b.Id == blockId);
            if (block == null)
            {
                return;
            }

            var pageId = block.PageId;

            // Удаляем блок из текущей позиции
            var previousBlock = await _context.Blocks
                .FirstOrDefaultAsync(b => b.NextBlockId == blockId);
            var nextBlock = await _context.Blocks
                .FirstOrDefaultAsync(b => b.PreviousBlockId == blockId);

            if (previousBlock != null)
            {
                previousBlock.NextBlockId = block.NextBlockId;
            }
            if (nextBlock != null)
            {
                nextBlock.PreviousBlockId = block.PreviousBlockId;
            }

            // Очищаем ссылки у перемещаемого блока
            block.PreviousBlockId = null;
            block.NextBlockId = null;

            // Вставляем блок в новую позицию
            if (afterBlockId.HasValue)
            {
                var afterBlock = await _context.Blocks
                    .FirstOrDefaultAsync(b => b.Id == afterBlockId.Value && b.PageId == pageId);
                if (afterBlock != null)
                {
                    block.PreviousBlockId = afterBlock.Id;
                    block.NextBlockId = afterBlock.NextBlockId;

                    if (afterBlock.NextBlockId.HasValue)
                    {
                        var nextBlockAfter = await _context.Blocks
                            .FirstOrDefaultAsync(b => b.Id == afterBlock.NextBlockId.Value);
                        if (nextBlockAfter != null)
                        {
                            nextBlockAfter.PreviousBlockId = block.Id;
                        }
                    }

                    afterBlock.NextBlockId = block.Id;
                }
                else
                {
                    // Если afterBlockId указан, но блок не найден, добавляем в конец
                    var lastBlock = await _context.Blocks
                        .Where(b => b.PageId == pageId && b.NextBlockId == null)
                        .FirstOrDefaultAsync();
                    if (lastBlock != null)
                    {
                        lastBlock.NextBlockId = block.Id;
                        block.PreviousBlockId = lastBlock.Id;
                    }
                }
            }
            else
            {
                // Добавляем в конец
                var lastBlock = await _context.Blocks
                    .Where(b => b.PageId == pageId && b.NextBlockId == null)
                    .FirstOrDefaultAsync();
                if (lastBlock != null)
                {
                    lastBlock.NextBlockId = block.Id;
                    block.PreviousBlockId = lastBlock.Id;
                }
            }

            await _context.SaveChangesAsync();
        }
    }
}


