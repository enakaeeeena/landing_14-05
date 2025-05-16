using FluentValidation;
using lending_skills_backend.Dtos;
using lending_skills_backend.Dtos.Requests;

namespace lending_skills_backend.Validators;

public class AddBlockToPageRequestValidator : AbstractValidator<AddBlockToPageRequest>
{
    public AddBlockToPageRequestValidator()
    {
        RuleFor(x => x.PageId).NotEmpty().WithMessage("PageId is required.");
        RuleFor(x => x.Data).NotEmpty().WithMessage("Data is required.");
        RuleFor(x => x.IsExample).NotEmpty().WithMessage("IsExample is required.");
        RuleFor(x => x.Type).NotEmpty().WithMessage("Type is required.");
    }
}
