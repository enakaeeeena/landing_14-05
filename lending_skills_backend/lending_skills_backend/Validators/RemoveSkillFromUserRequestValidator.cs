using FluentValidation;
using lending_skills_backend.Dtos.Requests;

namespace lending_skills_backend.Validators;

public class RemoveSkillFromUserRequestValidator : AbstractValidator<RemoveSkillFromUserRequest>
{
    public RemoveSkillFromUserRequestValidator()
    {
        RuleFor(x => x.SkillId).NotEmpty().WithMessage("SkillId is required.");
        RuleFor(x => x.UserId).NotEmpty().WithMessage("UserId is required.");
    }
}