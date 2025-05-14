using lending_skills_backend.DataAccess;
using lending_skills_backend.Dtos.Requests;
using lending_skills_backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace lending_skills_backend.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;

    public AuthController(AuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("start-register")]
    public async Task<IActionResult> StartRegistration([FromBody] RegisterRequest request)
    {
        var result = await _authService.StartRegistrationAsync(request);
        if (!result.IsSuccess) return BadRequest(result.Message);
        return Ok(result.Message);
    }

    [HttpPost("confirm")]
    public async Task<IActionResult> Confirm([FromBody] ConfirmCodeRequest request)
    {
        var result = await _authService.ConfirmRegistrationAsync(request.Email, request.Code);
        if (!result.IsSuccess) return BadRequest(result.Message);
        return Ok(result.Message);
    }

    [HttpPost("resend-code")]
    public async Task<IActionResult> ResendCode([FromBody] string email)
    {
        var result = await _authService.ResendConfirmationCodeAsync(email);
        if (!result.IsSuccess) return BadRequest(result.Message);
        return Ok(result.Message);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var result = await _authService.LoginAsync(request);
        if (!result.IsSuccess) return Unauthorized(result.Message);
        return Ok(new { token = result.Token });
    }

    [Authorize(Roles = "admin")]
    [HttpGet("all")]
    public async Task<IActionResult> GetAllUsers([FromServices] ApplicationDbContext _context)
    {
        var users = await _context.Users
            .Select(u => new
            {
                u.Id,
                u.Email,
                u.Login,
                u.Role,
                u.IsActive,
                u.EmailConfirmed
            })
            .ToListAsync();

        return Ok(users);
    }

    [Authorize]
    [HttpGet("profile")]
    public IActionResult Profile()
    {
        var email = User.Identity?.Name;
        return Ok(new { message = $"Вы авторизованы как {email}" });
    }

    [Authorize]
    [HttpPost("change-password")]
    public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordRequest request)
    {
        var userEmail = User.Identity?.Name;
        if (string.IsNullOrEmpty(userEmail))
            return Unauthorized("Не удалось определить пользователя.");

        var result = await _authService.ChangePasswordAsync(userEmail, request);
        if (!result.IsSuccess)
            return BadRequest(result.Message);

        return Ok(new { message = result.Message });
    }

}
