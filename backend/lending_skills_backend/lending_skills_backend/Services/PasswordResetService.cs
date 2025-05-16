using lending_skills_backend.DataAccess;
using lending_skills_backend.Helpers;
using lending_skills_backend.Models;
using Microsoft.EntityFrameworkCore;

namespace lending_skills_backend.Services;

public class PasswordResetService
{
    private readonly ApplicationDbContext _context;
    private readonly EmailService _emailService;

    public PasswordResetService(ApplicationDbContext context, EmailService emailService)
    {
        _context = context;
        _emailService = emailService;
    }

    public async Task<(bool IsSuccess, string Message)> SendResetCodeAsync(string email)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        if (user == null)
            return (false, "Пользователь с таким email не найден.");

        var code = new Random().Next(100000, 999999).ToString();

        var resetCode = new PasswordResetCode
        {
            Email = email,
            Code = code,
            Expiration = DateTime.UtcNow.AddMinutes(10)
        };

        _context.PasswordResetCodes.Add(resetCode);
        await _context.SaveChangesAsync();

        _emailService.SendConfirmationEmail(email, code);

        return (true, "Код восстановления отправлен на почту.");
    }

    public async Task<(bool IsSuccess, string Message)> ConfirmResetAsync(string email, string code, string newPassword)
    {
        var entry = await _context.PasswordResetCodes
            .FirstOrDefaultAsync(c => c.Email == email && c.Code == code);

        if (entry == null)
            return (false, "Неверный код подтверждения.");

        if (entry.Expiration < DateTime.UtcNow)
            return (false, "Срок действия кода истёк.");

        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        if (user == null)
            return (false, "Пользователь не найден.");

        var newSalt = PasswordHelper.GenerateSalt();
        var newHash = PasswordHelper.HashPassword(newPassword, newSalt);

        user.Salt = newSalt;
        user.PasswordHash = newHash;

        _context.PasswordResetCodes.Remove(entry); // удаляем использованный код
        await _context.SaveChangesAsync();

        return (true, "Пароль успешно обновлён.");
    }
}
