using FluentValidation;
using lending_skills_backend.Dtos.Requests;

namespace lending_skills_backend.Validators;

public class GetWorksRequestValidator : AbstractValidator<GetWorksRequest>
{
    public GetWorksRequestValidator()
    {
        RuleFor(x => x.PageNumber)
            .GreaterThan(0).WithMessage("PageNumber must be greater than 0.");
        RuleFor(x => x.PageSize)
            .GreaterThan(0).WithMessage("PageSize must be greater than 0.");
        RuleFor(x => x.Year)
            .GreaterThan(0).When(x => x.Year.HasValue).WithMessage("Year must be greater than 0.");
    }
}