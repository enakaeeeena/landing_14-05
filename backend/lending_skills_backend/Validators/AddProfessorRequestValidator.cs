using FluentValidation;
using lending_skills_backend.Dtos.Requests;

namespace lending_skills_backend.Validators
{
    public class AddProfessorRequestValidator : AbstractValidator<AddProfessorRequest>
    {
        public AddProfessorRequestValidator()
        {
            RuleFor(x => x.FirstName)
                .NotEmpty().WithMessage("FirstName is required.")
                .MaximumLength(50).WithMessage("FirstName must not exceed 50 characters.");

            RuleFor(x => x.LastName)
                .NotEmpty().WithMessage("LastName is required.")
                .MaximumLength(50).WithMessage("LastName must not exceed 50 characters.");

            RuleFor(x => x.Patronymic)
                .MaximumLength(50).WithMessage("Patronymic must not exceed 50 characters.")
                .When(x => x.Patronymic != null);

            RuleFor(x => x.Photo)
                .MaximumLength(500).WithMessage("Photo URL must not exceed 500 characters.")
                .When(x => x.Photo != null);

            RuleFor(x => x.Link)
                .MaximumLength(500).WithMessage("Link must not exceed 500 characters.")
                .When(x => x.Link != null);

            RuleFor(x => x.Position)
                .NotEmpty().WithMessage("Position is required.")
                .MaximumLength(100).WithMessage("Position must not exceed 100 characters.");

            RuleFor(x => x.AdminId)
                .NotEmpty().WithMessage("AdminId is required.");

            RuleFor(x => x.ProgramId)
                .NotEmpty().WithMessage("ProgramId must be valid if provided.")
                .When(x => x.ProgramId.HasValue);
        }
    }
}
