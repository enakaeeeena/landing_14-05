namespace lending_skills_backend.Services;

public class EmailConfirmationStore
{
    private readonly Dictionary<string, string> _emailCodeMap = new();
    private readonly object _lock = new();

    // Сохраняет код подтверждения по email
    public void SaveCode(string email, string code)
    {
        lock (_lock)
        {
            _emailCodeMap[email] = code;
        }
    }

    // Получает код по email
    public string? GetCode(string email)
    {
        lock (_lock)
        {
            _emailCodeMap.TryGetValue(email, out var code);
            return code;
        }
    }

    // Удаляет код после использования
    public void RemoveCode(string email)
    {
        lock (_lock)
        {
            _emailCodeMap.Remove(email);
        }
    }
}
