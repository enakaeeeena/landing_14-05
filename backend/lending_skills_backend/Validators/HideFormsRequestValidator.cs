using FluentValidation;
using lending_skills_backend.Dtos.Requests;

namespace lending_skills_backend.Validators
{
    public class HideFormsRequestValidator : AbstractValidator<HideFormsRequest>
    {
        public HideFormsRequestValidator()
        {
            RuleFor(x => x.UserId).NotEmpty().WithMessage("UserId is required.");

            RuleFor(x => x.FormIds)
                .NotNull().WithMessage("FormIds cannot be null.")
                .Must(ids => ids == null || ids.All(id => id != Guid.Empty))
                .WithMessage("FormIds cannot contain empty GUIDs.");

            RuleFor(x => x.FromDate)
                .LessThanOrEqualTo(x => x.ToDate)
                .When(x => x.FromDate.HasValue && x.ToDate.HasValue)
                .WithMessage("FromDate must be less than or equal to ToDate.");
        }
    }
}
