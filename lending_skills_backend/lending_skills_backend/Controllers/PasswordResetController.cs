// Контроллер для управления процессом сброса пароля
using lending_skills_backend.Dtos.Requests;
using lending_skills_backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace lending_skills_backend.Controllers;

[ApiController]
[Route("api/reset")]
public class PasswordResetController : ControllerBase
{
    // Сервис для сброса пароля
    private readonly PasswordResetService _resetService;

    // Конструктор контроллера
    public PasswordResetController(PasswordResetService resetService)
    {
        _resetService = resetService;
    }

    // Запрос на сброс пароля
    [HttpPost("request")]
    public async Task<IActionResult> RequestReset([FromBody] EmailOnlyRequest request)
    {
        // Отправка кода для сброса пароля
        var result = await _resetService.SendResetCodeAsync(request.Email);
        if (!result.IsSuccess) return BadRequest(result.Message);

        return Ok(result.Message);
    }

    // Подтверждение сброса пароля
    [HttpPost("confirm")]
    public async Task<IActionResult> ConfirmReset([FromBody] PasswordResetConfirmRequest request)
    {
        // Проверка кода и установка нового пароля
        var result = await _resetService.ConfirmResetAsync(request.Email, request.Code, request.NewPassword);
        if (!result.IsSuccess) return BadRequest(result.Message);

        return Ok(result.Message);
    }
}
