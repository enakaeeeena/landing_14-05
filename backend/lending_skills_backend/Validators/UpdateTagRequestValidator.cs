using FluentValidation;
using lending_skills_backend.Dtos.Requests;

namespace lending_skills_backend.Validators;

public class UpdateTagRequestValidator : AbstractValidator<UpdateTagRequest>
{
    public UpdateTagRequestValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty().When(x => string.IsNullOrEmpty(x.OldName))
            .WithMessage("Either Id or OldName must be provided.");

        RuleFor(x => x.OldName)
            .NotEmpty().When(x => !x.Id.HasValue)
            .WithMessage("Either Id or OldName must be provided.");

        RuleFor(x => x.NewName)
            .NotEmpty().WithMessage("NewName is required.")
            .MaximumLength(100).WithMessage("NewName cannot exceed 100 characters.");
    }
}