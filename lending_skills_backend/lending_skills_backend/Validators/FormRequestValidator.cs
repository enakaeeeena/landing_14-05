using FluentValidation;
using lending_skills_backend.Dtos.Requests;

namespace lending_skills_backend.Validators
{
    public class FormRequestValidator : AbstractValidator<FormRequest>
    {
        public FormRequestValidator()
        {
            RuleFor(x => x.BlockId).NotEmpty().WithMessage("BlockId is required.");
            RuleFor(x => x.Data).NotEmpty().WithMessage("Data is required.");
        }
    }
}
