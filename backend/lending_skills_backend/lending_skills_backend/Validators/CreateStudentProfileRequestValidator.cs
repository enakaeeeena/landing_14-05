using FluentValidation;
using lending_skills_backend.Dtos.Requests;

namespace lending_skills_backend.Validators;

public class CreateStudentProfileRequestValidator : AbstractValidator<CreateStudentProfileRequest>
{
    public CreateStudentProfileRequestValidator()
    {
        RuleFor(x => x.FirstName)
            .NotEmpty().WithMessage("FirstName is required.")
            .MaximumLength(50).WithMessage("FirstName cannot exceed 50 characters.");
        RuleFor(x => x.LastName)
            .NotEmpty().WithMessage("LastName is required.")
            .MaximumLength(50).WithMessage("LastName cannot exceed 50 characters.");
        RuleFor(x => x.Patronymic)
            .MaximumLength(50).WithMessage("Patronymic cannot exceed 50 characters.");
        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email is required.")
            .EmailAddress().WithMessage("Invalid email format.")
            .MaximumLength(100).WithMessage("Email cannot exceed 100 characters.");
        RuleFor(x => x.YearOfStudyStart)
            .GreaterThan(0).When(x => x.YearOfStudyStart.HasValue).WithMessage("YearOfStudyStart must be greater than 0.");
    }
}