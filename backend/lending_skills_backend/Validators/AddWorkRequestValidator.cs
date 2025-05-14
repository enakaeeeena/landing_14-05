using FluentValidation;
using lending_skills_backend.Dtos.Requests;

namespace lending_skills_backend.Validators;

public class AddWorkRequestValidator : AbstractValidator<AddWorkRequest>
{
    public AddWorkRequestValidator()
    {
        RuleFor(x => x.ProgramId).NotEmpty().WithMessage("ProgramId is required.");
        RuleFor(x => x.Title)
            .NotEmpty().WithMessage("Title is required.")
            .MaximumLength(200).WithMessage("Title cannot exceed 200 characters.");
        RuleFor(x => x.Description)
            .MaximumLength(1000).WithMessage("Description cannot exceed 1000 characters.");
        RuleFor(x => x.MainPhotoUrl)
            .NotEmpty().WithMessage("MainPhotoUrl is required.")
            .MaximumLength(500).WithMessage("MainPhotoUrl cannot exceed 500 characters.");
        RuleFor(x => x.AdditionalPhotoUrls)
            .MaximumLength(1000).WithMessage("AdditionalPhotoUrls cannot exceed 1000 characters.");
        RuleFor(x => x.Tags)
            .MaximumLength(500).WithMessage("Tags cannot exceed 500 characters.");
        RuleFor(x => x.Course)
            .GreaterThan(0).WithMessage("Course must be greater than 0.");
    }
}