using lending_skills_backend.Dtos.Requests;
using lending_skills_backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace lending_skills_backend.Controllers;

[ApiController]
[Route("api/reset")]
public class PasswordResetController : ControllerBase
{
    private readonly PasswordResetService _resetService;

    public PasswordResetController(PasswordResetService resetService)
    {
        _resetService = resetService;
    }

    [HttpPost("request")]
    public async Task<IActionResult> RequestReset([FromBody] EmailOnlyRequest request)
    {
        var result = await _resetService.SendResetCodeAsync(request.Email);
        if (!result.IsSuccess) return BadRequest(result.Message);

        return Ok(result.Message);
    }

    [HttpPost("confirm")]
    public async Task<IActionResult> ConfirmReset([FromBody] PasswordResetConfirmRequest request)
    {
        var result = await _resetService.ConfirmResetAsync(request.Email, request.Code, request.NewPassword);
        if (!result.IsSuccess) return BadRequest(result.Message);

        return Ok(result.Message);
    }
}
