using FluentValidation;
using lending_skills_backend.Dtos.Requests;

namespace lending_skills_backend.Validators;

public class ShowProfileRequestValidator : AbstractValidator<ShowProfileRequest>
{
    public ShowProfileRequestValidator()
    {
        RuleFor(x => x.UserId).NotEmpty().WithMessage("UserId is required.");
    }
}