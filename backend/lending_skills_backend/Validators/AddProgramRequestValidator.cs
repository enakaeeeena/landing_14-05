using FluentValidation;
using lending_skills_backend.Dtos;
using lending_skills_backend.Dtos.Requests;

namespace lending_skills_backend.Validators
{
    public class AddProgramRequestValidator : AbstractValidator<AddProgramRequest>
    {
        public AddProgramRequestValidator()
        {
            RuleFor(x => x.Name).NotEmpty().WithMessage("Name is required.");
            RuleFor(x => x.Menu).NotEmpty().WithMessage("Menu is required.");
        }
    }
}
