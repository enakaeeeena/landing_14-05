using FluentValidation;
using lending_skills_backend.Dtos.Requests;

namespace lending_skills_backend.Validators;

public class ShowWorkRequestValidator : AbstractValidator<ShowWorkRequest>
{
    public ShowWorkRequestValidator()
    {
        RuleFor(x => x.WorkId).NotEmpty().WithMessage("WorkId is required.");
    }
}