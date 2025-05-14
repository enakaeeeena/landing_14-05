using FluentValidation;
using lending_skills_backend.Dtos.Requests;

namespace lending_skills_backend.Validators;

public class HideWorkRequestValidator : AbstractValidator<HideWorkRequest>
{
    public HideWorkRequestValidator()
    {
        RuleFor(x => x.WorkId).NotEmpty().WithMessage("WorkId is required.");
    }
}