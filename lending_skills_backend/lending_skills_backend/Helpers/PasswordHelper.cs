using System.Security.Cryptography;
using System.Text;

namespace lending_skills_backend.Helpers;

public static class PasswordHelper
{
    public static string GenerateSalt()
    {
        var saltBytes = new byte[16];
        using var rng = RandomNumberGenerator.Create();
        rng.GetBytes(saltBytes);
        return Convert.ToBase64String(saltBytes);
    }

    public static string HashPassword(string password, string salt)
    {
        var combined = Encoding.UTF8.GetBytes(password + salt);
        using var sha256 = SHA256.Create();
        var hash = sha256.ComputeHash(combined);
        return Convert.ToBase64String(hash);
    }

    public static bool VerifyPassword(string password, string salt, string storedHash)
    {
        var computedHash = HashPassword(password, salt);
        return computedHash == storedHash;
    }
}
