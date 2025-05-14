using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace lending_skills_backend.Models;

public class DbUser
{
    public const string TableName = "Users";
   


    [Key]
    public Guid Id { get; set; }

    public string? Photo { get; set; }

    [Required]

    public string Skills { get; set; } = string.Empty;


    public string? Description { get; set; }
    public string? Social { get; set; }
    public string? SocialDescription { get; set; }

    [Required]
    public string FirstName { get; set; }

    [Required]
    public string LastName { get; set; }

    public string? Patronymic { get; set; }

    [Required]
    public string Login { get; set; }

    // 🔒 Хэш пароля
    [Required]
    public string PasswordHash { get; set; }

    // 🔐 Соль для пароля
    [Required]
    public string Salt { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    public string Role { get; set; }  // "user", "student", "admin" и т.д.

    public bool EmailConfirmed { get; set; } = false;

    public int? YearOfStudyStart { get; set; }

    public bool IsActive { get; set; }

    public ICollection<DbWork> Works { get; set; } = new List<DbWork>();

    public bool IsAdmin { get; set; } = false;

    public ICollection<DbLike> Likes { get; set; } = new List<DbLike>();
}

public class DbUserConfiguration : IEntityTypeConfiguration<DbUser>
{
    public void Configure(EntityTypeBuilder<DbUser> builder)
    {
        builder
            .ToTable(DbUser.TableName);

        builder
            .HasKey(u => u.Id);

        builder
            .Property(u => u.IsAdmin)
            .HasDefaultValue(false);

        // 🔄 Связь с лайками (опционально)
        builder.HasMany(w => w.Likes)
            .WithOne(l => l.User)
            .HasForeignKey(l => l.UserId)
            .OnDelete(DeleteBehavior.NoAction)
            .IsRequired(false);
    }
}
