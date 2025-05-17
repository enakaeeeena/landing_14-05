using FluentValidation;
using lending_skills_backend.Dtos.Requests;

namespace lending_skills_backend.Validators;

public class UnlikeWorkRequestValidator : AbstractValidator<UnlikeWorkRequest>
{
    public UnlikeWorkRequestValidator()
    {
        RuleFor(x => x.WorkId).NotEmpty().WithMessage("WorkId is required.");
    }
}