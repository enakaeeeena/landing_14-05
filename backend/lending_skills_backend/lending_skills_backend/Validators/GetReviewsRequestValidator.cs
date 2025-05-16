using FluentValidation;
using lending_skills_backend.Dtos.Requests;

namespace lending_skills_backend.Validators;

public class GetReviewsRequestValidator : AbstractValidator<GetReviewsRequest>
{
    public GetReviewsRequestValidator()
    {
        RuleFor(x => x.PageNumber)
            .GreaterThan(0).WithMessage("PageNumber must be greater than 0.");
        RuleFor(x => x.PageSize)
            .GreaterThan(0).WithMessage("PageSize must be greater than 0.");
        RuleFor(x => x.DateFrom)
            .LessThanOrEqualTo(x => x.DateTo)
            .When(x => x.DateFrom.HasValue && x.DateTo.HasValue)
            .WithMessage("DateFrom must be less than or equal to DateTo.");
    }
}