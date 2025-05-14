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


        public async Task ChangeBlockPositionAsync(Guid blockToMoveId, Guid? newPreviousBlockId, Guid pageId)
        {
            var blockToMove = await _context.Blocks.FirstOrDefaultAsync(b => b.Id == blockToMoveId && b.PageId == pageId);
            if (blockToMove == null)
                throw new KeyNotFoundException($"Block with ID {blockToMoveId} not found on page {pageId}.");

            if (newPreviousBlockId.HasValue && newPreviousBlockId.Value == blockToMoveId)
                throw new InvalidOperationException("Cannot move a block to be after itself.");

            // Check if the block is already in the desired position
            if (blockToMove.PreviousBlockId == newPreviousBlockId)
            {
                return; // No change needed
            }

            // --- 1. Unlink blockToMove from its original position --- 
            DbBlock originalPreviousBlock = null;
            if (blockToMove.PreviousBlockId.HasValue)
                originalPreviousBlock = await _context.Blocks.FirstOrDefaultAsync(b => b.Id == blockToMove.PreviousBlockId.Value && b.PageId == pageId);

            DbBlock originalNextBlock = null;
            if (blockToMove.NextBlockId.HasValue)
                originalNextBlock = await _context.Blocks.FirstOrDefaultAsync(b => b.Id == blockToMove.NextBlockId.Value && b.PageId == pageId);

            if (originalPreviousBlock != null)
            {
                originalPreviousBlock.NextBlockId = blockToMove.NextBlockId;
                _context.Update(originalPreviousBlock);
            }
            if (originalNextBlock != null)
            {
                originalNextBlock.PreviousBlockId = blockToMove.PreviousBlockId;
                _context.Update(originalNextBlock);
            }

            // --- 2. Link blockToMove to its new position --- 
            DbBlock newPreviousBlock = null; 
            DbBlock newNextBlockForMoved = null;

            if (newPreviousBlockId.HasValue) // Placing blockToMove AFTER newPreviousBlockId
            {
                newPreviousBlock = await _context.Blocks.FirstOrDefaultAsync(b => b.Id == newPreviousBlockId.Value && b.PageId == pageId);
                if (newPreviousBlock == null)
                    throw new KeyNotFoundException($"The target position block (afterBlockId: {newPreviousBlockId.Value}) not found on page {pageId}.");
                
                // blockToMove will be after newPreviousBlock. The block originally after newPreviousBlock will be after blockToMove.
                if (newPreviousBlock.NextBlockId.HasValue)
                {
                    newNextBlockForMoved = await _context.Blocks.FirstOrDefaultAsync(b => b.Id == newPreviousBlock.NextBlockId.Value && b.PageId == pageId);
                }
                
                newPreviousBlock.NextBlockId = blockToMove.Id;
                _context.Update(newPreviousBlock);

                blockToMove.PreviousBlockId = newPreviousBlock.Id;
                blockToMove.NextBlockId = newNextBlockForMoved?.Id;
            }
            else // Placing blockToMove at the beginning of the list for this page
            {
                var currentFirstBlockOnPage = await _context.Blocks
                                            .Where(b => b.PageId == pageId && b.PreviousBlockId == null && b.Id != blockToMove.Id)
                                            .FirstOrDefaultAsync(); // Add OrderBy if tie-breaking is needed
                newNextBlockForMoved = currentFirstBlockOnPage;
                
                blockToMove.PreviousBlockId = null;
                blockToMove.NextBlockId = newNextBlockForMoved?.Id;
            }
            
            // Update the block that is now after blockToMove (if any)
            if (newNextBlockForMoved != null)
            {
                if (newNextBlockForMoved.Id == blockToMove.Id) // Should not happen with correct logic
                     throw new InvalidOperationException("Cannot form a circular link where a block's next is itself.");

                newNextBlockForMoved.PreviousBlockId = blockToMove.Id;
                _context.Update(newNextBlockForMoved);
            }

            _context.Update(blockToMove);
            await _context.SaveChangesAsync();
        }
    }
}
