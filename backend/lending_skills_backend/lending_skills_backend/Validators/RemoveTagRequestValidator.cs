using FluentValidation;
using lending_skills_backend.Dtos.Requests;

namespace lending_skills_backend.Validators;

public class RemoveTagRequestValidator : AbstractValidator<RemoveTagRequest>
{
    public RemoveTagRequestValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty().When(x => string.IsNullOrEmpty(x.Name))
            .WithMessage("Either Id or Name must be provided.");

        RuleFor(x => x.Name)
            .NotEmpty().When(x => !x.Id.HasValue)
            .WithMessage("Either Id or Name must be provided.");
    }
}