using FluentValidation;
using lending_skills_backend.Dtos.Requests;

namespace lending_skills_backend.Validators
{
    public class GetFormsRequestValidator : AbstractValidator<GetFormsRequest>
    {
        public GetFormsRequestValidator()
        {
            RuleFor(x => x.UserId).NotEmpty().WithMessage("UserId is required.");

            RuleFor(x => x.PageNumber)
                .GreaterThan(0)
                .When(x => x.PageNumber.HasValue)
                .WithMessage("PageNumber must be greater than 0.");

            RuleFor(x => x.PageSize)
                .GreaterThan(0)
                .When(x => x.PageSize.HasValue)
                .WithMessage("PageSize must be greater than 0.");
        }
    }
}
