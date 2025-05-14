using FluentValidation;
using lending_skills_backend.Dtos.Requests;

namespace lending_skills_backend.Validators;

public class AddSkillToWorkRequestValidator : AbstractValidator<AddSkillToWorkRequest>
{
    public AddSkillToWorkRequestValidator()
    {
        RuleFor(x => x.SkillId).NotEmpty().WithMessage("SkillId is required.");
        RuleFor(x => x.WorkId).NotEmpty().WithMessage("WorkId is required.");
    }
}