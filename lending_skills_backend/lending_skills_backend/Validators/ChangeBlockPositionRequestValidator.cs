using FluentValidation;
using lending_skills_backend.Dtos;
using lending_skills_backend.Dtos.Requests;

namespace lending_skills_backend.Validators;

public class ChangeBlockPositionRequestValidator : AbstractValidator<ChangeBlockPositionRequest>
{
    public ChangeBlockPositionRequestValidator()
    {
        RuleFor(x => x.BlockId).NotEmpty().WithMessage("BlockId is required.");
    }
}
