using FluentValidation;
using lending_skills_backend.Dtos.Requests;

namespace lending_skills_backend.Validators
{
    public class AddProgramAdminRequestValidator : AbstractValidator<AddProgramAdminRequest>
    {
        public AddProgramAdminRequestValidator()
        {
            RuleFor(x => x.UserId).NotEmpty().WithMessage("UserId is required.");
            RuleFor(x => x.ProgramId).NotEmpty().WithMessage("ProgramId is required.");
            RuleFor(x => x.AdminId).NotEmpty().WithMessage("AdminId is required.");
        }
    }
}
