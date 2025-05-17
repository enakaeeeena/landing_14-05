using FluentValidation;
using lending_skills_backend.Dtos;
using lending_skills_backend.Dtos.Requests;

namespace lending_skills_backend.Validators;

public class AddBlockToPageRequestValidator : AbstractValidator<AddBlockToPageRequest>
{
    public AddBlockToPageRequestValidator()
    {
        // Правила валидации для запроса добавления блока на страницу
        RuleFor(x => x.pageId).NotEmpty().WithMessage("Идентификатор страницы обязателен.");
        RuleFor(x => x.data).NotEmpty().WithMessage("Данные блока обязательны.");
        RuleFor(x => x.isExample).NotEmpty().WithMessage("Флаг примера обязателен.");
        RuleFor(x => x.type).NotEmpty().WithMessage("Тип блока обязателен.");
    }
}
