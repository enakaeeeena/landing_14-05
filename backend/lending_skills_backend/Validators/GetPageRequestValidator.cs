using FluentValidation;
using lending_skills_backend.Dtos;
using lending_skills_backend.Dtos.Requests;

namespace lending_skills_backend.Validators;

public class GetPageRequestValidator : AbstractValidator<GetPageRequest>
{
    public GetPageRequestValidator()
    {
        RuleFor(x => x.ProgramId).NotEmpty().WithMessage("ProgramId is required.");
    }
}
