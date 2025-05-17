using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace lending_skills_backend.Models;

public class DbAdmin
{
    public const string TableName = "Admins";
    public Guid Id { get; set; }

    public Guid UserId { get; set; }
    public DbUser User { get; set; }

    public Guid ProgramId { get; set; }
    public DbProgram Program { get; set; }
    public string Role { get; set; }
}

public class DbAdminConfiguration : IEntityTypeConfiguration<DbAdmin>
{
    public void Configure(EntityTypeBuilder<DbAdmin> builder)
    {
        builder.ToTable(DbAdmin.TableName);

        builder.HasKey(a => a.Id);

        builder.HasAlternateKey(a => new { a.UserId, a.ProgramId });

        builder
            .HasOne(a => a.User)
            .WithMany()
            .HasForeignKey(a => a.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        builder
            .HasOne(a => a.Program)
            .WithMany()
            .HasForeignKey(a => a.ProgramId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}