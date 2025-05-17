// Контроллер для управления отправкой и подтверждением электронной почты
using lending_skills_backend.Dtos.Requests;
using lending_skills_backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace lending_skills_backend.Controllers;

[ApiController]
[Route("api/email")]
public class EmailController : ControllerBase
{
    // Сервисы для работы с электронной почтой
    private readonly EmailService _emailService;
    private readonly EmailConfirmationStore _store;

    // Конструктор контроллера
    public EmailController(EmailService emailService, EmailConfirmationStore store)
    {
        _emailService = emailService;
        _store = store;
    }

    // Отправка кода подтверждения на электронную почту
    [HttpPost("send")]
    public IActionResult Send([FromBody] string email)
    {
        // Генерация случайного кода подтверждения
        var code = new Random().Next(100000, 999999).ToString();
        
        // Сохранение кода в хранилище
        _store.SaveCode(email, code);
        
        // Отправка кода на почту
        _emailService.SendConfirmationEmail(email, code);
        
        return Ok(new { message = "Код отправлен." });
    }

    // Проверка кода подтверждения
    [HttpPost("verify")]
    public IActionResult Verify([FromBody] EmailCodeRequest request)
    {
        // Получение сохраненного кода из хранилища
        var stored = _store.GetCode(request.Email);
        
        // Проверка соответствия кодов
        if (stored != null && stored == request.Code)
        {
            return Ok(new { message = "Код верен." });
        }

        return BadRequest("Неверный код.");
    }
}

// Модель запроса для проверки кода подтверждения email
public class EmailCodeRequest
{
    // Email адрес пользователя
    public string Email { get; set; } = null!;
    
    // Код подтверждения
    public string Code { get; set; } = null!;
}
