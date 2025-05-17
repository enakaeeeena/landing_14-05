using FluentValidation;
using lending_skills_backend.Dtos.Requests;

namespace lending_skills_backend.Validators
{
    public class UpdateProfessorRequestValidator : AbstractValidator<UpdateProfessorRequest>
    {
        public UpdateProfessorRequestValidator()
        {
            RuleFor(x => x.Id).NotEmpty().WithMessage("Id is required.");
            RuleFor(x => x.FirstName).NotEmpty().WithMessage("FirstName is required.");
            RuleFor(x => x.LastName).NotEmpty().WithMessage("LastName is required.");
            RuleFor(x => x.AdminId).NotEmpty().WithMessage("AdminId is required.");
        }
    }
}
