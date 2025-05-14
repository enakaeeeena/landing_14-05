using FluentValidation;
using lending_skills_backend.Dtos.Requests;

namespace lending_skills_backend.Validators
{
    public class RemoveProfessorFromProgramRequestValidator : AbstractValidator<RemoveProfessorFromProgramRequest>
    {
        public RemoveProfessorFromProgramRequestValidator()
        {
            RuleFor(x => x.ProfessorId).NotEmpty().WithMessage("ProfessorId is required.");
            RuleFor(x => x.ProgramId).NotEmpty().WithMessage("ProgramId is required.");
            RuleFor(x => x.AdminId).NotEmpty().WithMessage("AdminId is required.");
        }
    }
}
