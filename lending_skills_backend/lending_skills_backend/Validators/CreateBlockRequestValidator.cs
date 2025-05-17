using FluentValidation;
using lending_skills_backend.Dtos.Requests;

namespace lending_skills_backend.Validators;

public class CreateBlockRequestValidator : AbstractValidator<CreateBlockRequest>
{
    public CreateBlockRequestValidator()
    {
        // Правила валидации для запроса создания блока
        RuleFor(x => x.type).NotEmpty().WithMessage("Тип блока обязателен.");
        RuleFor(x => x.title).NotEmpty().WithMessage("Заголовок блока обязателен.");
        RuleFor(x => x.content).NotEmpty().WithMessage("Содержимое блока обязательно.");
        RuleFor(x => x.date).NotEmpty().WithMessage("Дата блока обязательна.");
        RuleFor(x => x.isExample).NotEmpty().WithMessage("Флаг примера обязателен.");
    }
} 