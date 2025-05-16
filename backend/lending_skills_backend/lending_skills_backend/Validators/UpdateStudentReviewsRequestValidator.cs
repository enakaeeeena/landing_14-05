using FluentValidation;
using lending_skills_backend.Dtos.Requests;

namespace lending_skills_backend.Validators;

public class UpdateStudentReviewsRequestValidator : AbstractValidator<UpdateStudentReviewsRequest>
{
    public UpdateStudentReviewsRequestValidator()
    {
        RuleFor(x => x.ReviewIds)
            .NotNull().WithMessage("ReviewIds cannot be null.")
            .Must(ids => ids.All(id => id != Guid.Empty)).WithMessage("ReviewIds cannot contain empty GUIDs.");
    }
}