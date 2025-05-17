using FluentValidation;
using lending_skills_backend.Dtos.Requests;

namespace lending_skills_backend.Validators;

public class EditBlockRequestValidator : AbstractValidator<EditBlockRequest>
{
    public EditBlockRequestValidator()
    {
        // Правила валидации для запроса редактирования блока
        RuleFor(x => x.id)
            .NotEmpty().WithMessage("Идентификатор блока обязателен");

        RuleFor(x => x.type)
            .NotEmpty().WithMessage("Тип блока обязателен");

        RuleFor(x => x.title)
            .NotEmpty().WithMessage("Заголовок блока обязателен");

        RuleFor(x => x.content)
            .NotEmpty().WithMessage("Содержимое блока обязательно");

        RuleFor(x => x.date)
            .NotEmpty().WithMessage("Дата блока обязательна");

        RuleFor(x => x.isExample)
            .NotEmpty().WithMessage("Флаг примера обязателен");
    }
}
