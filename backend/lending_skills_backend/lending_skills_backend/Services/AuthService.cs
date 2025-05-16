using lending_skills_backend.DataAccess;
using lending_skills_backend.Dtos.Requests;
using lending_skills_backend.Helpers;
using lending_skills_backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace lending_skills_backend.Services;

public class AuthService
{
    private readonly ApplicationDbContext _context;
    private readonly IConfiguration _config;
    private readonly EmailService _emailService;

    public AuthService(ApplicationDbContext context, IConfiguration config, EmailService emailService)
    {
        _context = context;
        _config = config;
        _emailService = emailService;
    }

    public async Task<(bool IsSuccess, string Message)> StartRegistrationAsync(RegisterRequest request)
    {
        if (await _context.Users.AnyAsync(u => u.Email == request.Email))
            return (false, "Пользователь с таким email уже существует.");

        if (await _context.Users.AnyAsync(u => u.Login == request.Login))
            return (false, "Пользователь с таким логином уже существует.");

        try
        {
            var code = new Random().Next(100000, 999999).ToString();
            _emailService.SendConfirmationEmail(request.Email, code);

            _context.EmailConfirmations.Add(new DbEmailConfirmation
            {
                Id = Guid.NewGuid(),
                Email = request.Email,
                Code = code,
                CreatedAt = DateTime.UtcNow
            });

            var salt = PasswordHelper.GenerateSalt();
            var hash = PasswordHelper.HashPassword(request.Password, salt);

            var user = new DbUser
            {
                Id = Guid.NewGuid(),
                Email = request.Email,
                Login = request.Login,
                PasswordHash = hash,
                Salt = salt,
                Role = request.IsStudent ? "student" : "user",
                IsActive = true,
                Skills = "",
                FirstName = "",
                LastName = "",
                EmailConfirmed = false
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            
        }
        catch
        {
            return (true, "Возможно, почта недоступна для отправки кода или некорректна.");
        }

        return (true, "Пользователь добавлен. Код подтверждения отправлен на email.");
    }

    public async Task<(bool IsSuccess, string Message)> ConfirmRegistrationAsync(string email, string code)
    {
        var confirmation = await _context.EmailConfirmations
            .OrderByDescending(c => c.CreatedAt)
            .FirstOrDefaultAsync(c => c.Email == email);

        if (confirmation == null || confirmation.Code != code)
            return (false, "Неверный код подтверждения.");

        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        if (user == null)
            return (false, "Пользователь не найден.");

        if (user.EmailConfirmed)
            return (false, "Email уже подтверждён.");

        user.EmailConfirmed = true;
        _context.EmailConfirmations.Remove(confirmation);
        await _context.SaveChangesAsync();

        return (true, "Email успешно подтверждён.");
    }

    public async Task<(bool IsSuccess, string Message)> ResendConfirmationCodeAsync(string email)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

        if (user == null)
            return (false, "Пользователь с таким email не найден.");

        if (user.EmailConfirmed)
            return (false, "Email уже подтверждён.");

        var code = new Random().Next(100000, 999999).ToString();

        _context.EmailConfirmations.Add(new DbEmailConfirmation
        {
            Id = Guid.NewGuid(),
            Email = email,
            Code = code,
            CreatedAt = DateTime.UtcNow
        });

        await _context.SaveChangesAsync();
        _emailService.SendConfirmationEmail(email, code);

        return (true, "Код подтверждения повторно отправлен на email.");
    }

    public async Task<(bool IsSuccess, string? Token, string? Message)> LoginAsync(LoginRequest request)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Login == request.EmailOrLogin || u.Email == request.EmailOrLogin);

        if (user == null)
            return (false, null, "Пользователь не найден.");

        if (!user.EmailConfirmed)
            return (false, null, "Email не подтвержден.");

        var isValid = PasswordHelper.VerifyPassword(request.Password, user.Salt, user.PasswordHash);
        if (!isValid)
            return (false, null, "Неверный пароль.");

        return (true, GenerateJwtToken(user), null);
    }

    private string GenerateJwtToken(DbUser user)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.UTF8.GetBytes(_config["Jwt:Key"]!);

        var claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.Email),
            new Claim(ClaimTypes.Role, user.Role),
            new Claim("Login", user.Login)
        };

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddHours(2),
            Issuer = _config["Jwt:Issuer"],
            SigningCredentials = new SigningCredentials(
                new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha256Signature)
        };

        return tokenHandler.WriteToken(tokenHandler.CreateToken(tokenDescriptor));
    }

    public async Task<(bool IsSuccess, string Message)> ChangePasswordAsync(string userEmail, ChangePasswordRequest request)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == userEmail);
        if (user == null)
            return (false, "Пользователь не найден.");

        if (!PasswordHelper.VerifyPassword(request.CurrentPassword, user.Salt, user.PasswordHash))
            return (false, "Неверный текущий пароль.");

        var newSalt = PasswordHelper.GenerateSalt();
        var newHash = PasswordHelper.HashPassword(request.NewPassword, newSalt);

        user.Salt = newSalt;
        user.PasswordHash = newHash;

        await _context.SaveChangesAsync();
        return (true, "Пароль успешно изменён.");
    }
}
