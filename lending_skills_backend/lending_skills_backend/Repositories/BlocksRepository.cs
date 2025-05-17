using lending_skills_backend.DataAccess;
using lending_skills_backend.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace lending_skills_backend.Repositories
{
    public class BlocksRepository
    {
        private readonly ApplicationDbContext _context;

        public BlocksRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<DbBlock>> GetBlocksAsync()
        {
            return await _context.Blocks
                .Include(b => b.Form)
                .Include(b => b.Page)
                .Include(b => b.NextBlock)
                .Include(b => b.PreviousBlock)
                .ToListAsync();
        }

        public async Task<DbBlock?> GetBlockByIdAsync(Guid blockId)
        {
            return await _context.Blocks
                .Include(b => b.Form)
                .Include(b => b.Page)
                .Include(b => b.NextBlock)
                .Include(b => b.PreviousBlock)
                .FirstOrDefaultAsync(b => b.Id == blockId);
        }
        public async Task AddBlockAsync(DbBlock block)
        {
            _context.Blocks.Add(block);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateBlockAsync(DbBlock block)
        {
            _context.Blocks.Update(block);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteBlockAsync(Guid id)
        {
            var block = await _context.Blocks.FindAsync(id);
            if (block != null)
            {
                // Обновляем ссылки
                var previousBlock = await _context.Blocks
                    .FirstOrDefaultAsync(b => b.NextBlockId == block.Id);
                var nextBlock = await _context.Blocks
                    .FirstOrDefaultAsync(b => b.Id == block.NextBlockId);

                if (previousBlock != null)
                {
                    previousBlock.NextBlockId = block.NextBlockId;
                }

                if (nextBlock != null)
                {
                    nextBlock.PreviousBlockId = block.PreviousBlockId;
                }

                _context.Blocks.Remove(block);
                await _context.SaveChangesAsync();
            }
        }
        public async Task AddBlockToPageAsync(Guid pageId, DbBlock newBlock, Guid? afterBlockId)
        {
            newBlock.PageId = pageId;

            if (afterBlockId.HasValue)
            {
                var afterBlock = await _context.Blocks
                    .FirstOrDefaultAsync(b => b.Id == afterBlockId.Value && b.PageId == pageId);
                if (afterBlock != null)
                {
                    newBlock.PreviousBlockId = afterBlock.Id;
                    newBlock.NextBlockId = afterBlock.NextBlockId;

                    if (afterBlock.NextBlockId.HasValue)
                    {
                        var nextBlock = await _context.Blocks
                            .FirstOrDefaultAsync(b => b.Id == afterBlock.NextBlockId.Value);
                        if (nextBlock != null)
                        {
                            nextBlock.PreviousBlockId = newBlock.Id;
                        }
                    }

                    afterBlock.NextBlockId = newBlock.Id;
                }
                else
                {
                    // Если afterBlockId указан, но блок не найден, добавляем в конец
                    var lastBlock = await _context.Blocks
                        .Where(b => b.PageId == pageId && b.NextBlockId == null)
                        .FirstOrDefaultAsync();
                    if (lastBlock != null)
                    {
                        lastBlock.NextBlockId = newBlock.Id;
                        newBlock.PreviousBlockId = lastBlock.Id;
                    }
                }
            }
            else
            {
                // Если afterBlockId не указан, добавляем в конец
                var lastBlock = await _context.Blocks
                    .Where(b => b.PageId == pageId && b.NextBlockId == null)
                    .FirstOrDefaultAsync();
                if (lastBlock != null)
                {
                    lastBlock.NextBlockId = newBlock.Id;
                    newBlock.PreviousBlockId = lastBlock.Id;
                }
            }

            await AddBlockAsync(newBlock);
        }


        public async Task ChangeBlockPositionAsync(Guid blockId, Guid? afterBlockId)
        {
            var block = await GetBlockByIdAsync(blockId);
            if (block == null) return;

            // Обновляем ссылки на текущем месте
            var previousBlock = await _context.Blocks
                .FirstOrDefaultAsync(b => b.NextBlockId == block.Id);
            var nextBlock = await _context.Blocks
                .FirstOrDefaultAsync(b => b.Id == block.NextBlockId);

            if (previousBlock != null)
            {
                previousBlock.NextBlockId = block.NextBlockId;
            }

            if (nextBlock != null)
            {
                nextBlock.PreviousBlockId = block.PreviousBlockId;
            }

            // Перемещаем блок
            block.PreviousBlockId = afterBlockId;
            if (afterBlockId.HasValue)
            {
                var afterBlock = await GetBlockByIdAsync(afterBlockId.Value);
                if (afterBlock != null)
                {
                    block.NextBlockId = afterBlock.NextBlockId;
                    afterBlock.NextBlockId = block.Id;

                    if (block.NextBlockId.HasValue)
                    {
                        var newNextBlock = await GetBlockByIdAsync(block.NextBlockId.Value);
                        if (newNextBlock != null)
                        {
                            newNextBlock.PreviousBlockId = block.Id;
                        }
                    }
                }
            }
            else
            {
                block.NextBlockId = null;
            }

            await UpdateBlockAsync(block);
        }
    }
}
