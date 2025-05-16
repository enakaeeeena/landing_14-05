using lending_skills_backend.Dtos.Requests;
using lending_skills_backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace lending_skills_backend.Controllers;

[ApiController]
[Route("api/email")]
public class EmailController : ControllerBase
{
    private readonly EmailService _emailService;
    private readonly EmailConfirmationStore _store;

    public EmailController(EmailService emailService, EmailConfirmationStore store)
    {
        _emailService = emailService;
        _store = store;
    }

    [HttpPost("send")]
    public IActionResult Send([FromBody] string email)
    {
        var code = new Random().Next(100000, 999999).ToString();
        _store.SaveCode(email, code);
        _emailService.SendConfirmationEmail(email, code);
        return Ok(new { message = "Код отправлен." });
    }

    [HttpPost("verify")]
    public IActionResult Verify([FromBody] EmailCodeRequest request)
    {
        var stored = _store.GetCode(request.Email);
        if (stored != null && stored == request.Code)
        {
            return Ok(new { message = "Код верен." });
        }

        return BadRequest("Неверный код.");
    }

}

/// <summary>
/// DTO для проверки кода email
/// </summary>
public class EmailCodeRequest
{
    public string Email { get; set; } = null!;
    public string Code { get; set; } = null!;
}
