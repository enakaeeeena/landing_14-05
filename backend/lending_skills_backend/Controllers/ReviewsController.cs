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
    public class ReviewsController : ControllerBase
    {
        private readonly ReviewsRepository _reviewsRepository;
        private readonly UsersRepository _usersRepository;
        private readonly ProgramsRepository _programsRepository;

        public ReviewsController(
            ReviewsRepository reviewsRepository,
            UsersRepository usersRepository,
            ProgramsRepository programsRepository)
        {
            _reviewsRepository = reviewsRepository;
            _usersRepository = usersRepository;
            _programsRepository = programsRepository;
        }

        [HttpPost("GetReviews")]
        public async Task<ActionResult<List<ReviewResponse>>> GetReviews([FromBody] GetReviewsRequest request)
        {
            var reviews = await _reviewsRepository.GetReviewsAsync(
                request.PageNumber,
                request.PageSize,
                request.ProgramId,
                request.UserId,
                request.DateFrom,
                request.DateTo);

            var reviewResponses = reviews.Select(ReviewResponseMapper.Map).ToList();
            return Ok(reviewResponses);
        }

        [HttpPut("UpdateStudentReviews")]
        public async Task<IActionResult> UpdateStudentReviews([FromBody] UpdateStudentReviewsRequest request)
        {
            var userId = Guid.NewGuid(); // Заменить на реальный UserId
            var isSuperAdmin = await _usersRepository.IsSuperAdminAsync(userId);
            var isProgramAdmin = request.ReviewIds.Any()
                && await _programsRepository.IsAdminOfProgramAsync(userId,
                    (await _reviewsRepository.GetReviewByIdAsync(request.ReviewIds.First())).ProgramId);
            if (!isSuperAdmin && !isProgramAdmin)
            {
                return Forbid("Only super admins or program admins can update selected reviews.");
            }

            foreach (var reviewId in request.ReviewIds)
            {
                if (await _reviewsRepository.GetReviewByIdAsync(reviewId) == null)
                {
                    return NotFound($"Review with ID {reviewId} not found.");
                }
            }

            await _reviewsRepository.UpdateSelectedReviewsAsync(request.ReviewIds);
            return NoContent();
        }

        [HttpPost("AddReview")]
        public async Task<ActionResult<ReviewResponse>> AddReview([FromBody] AddReviewRequest request)
        {
            var userId = Guid.NewGuid(); // Заменить на реальный UserId
            var user = await _usersRepository.GetUserByIdAsync(userId);
            if (user == null || user.Role != "Student")
            {
                return Forbid("Only students can add reviews.");
            }

            var program = await _programsRepository.GetProgramByIdAsync(request.ProgramId);
            if (program == null)
            {
                return NotFound("Program not found.");
            }

            var review = DbReviewMapper.Map(request);
            review.Id = Guid.NewGuid();
            review.UserId = userId;
            review.CreatedDate = DateTime.UtcNow;
            review.IsSelected = false;
            await _reviewsRepository.AddReviewAsync(review);

            return CreatedAtAction(
                nameof(GetReview),
                new { id = review.Id },
                ReviewResponseMapper.Map(review));
        }

        private async Task<ActionResult<DbReview>> GetReview(Guid id)
        {
            var review = await _reviewsRepository.GetReviewByIdAsync(id);
            if (review == null)
            {
                return NotFound();
            }
            return review;
        }
    }
}