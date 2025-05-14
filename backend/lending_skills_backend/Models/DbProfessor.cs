using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace lending_skills_backend.Models;

public class DbProfessor
{
    public const string TableName = "Professors";

    public Guid Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string? Position { get; set; }
    public string? Patronymic { get; set; }
    public string? Photo { get; set; }
    public string? Link { get; set; }

    public ICollection<DbProfessorProgram> ProfessorsPrograms { get; set; } = new List<DbProfessorProgram>();
}

public class DbProfessorConfiguration : IEntityTypeConfiguration<DbProfessor>
{
    public void Configure(EntityTypeBuilder<DbProfessor> builder)
    {
        builder.ToTable(DbProfessor.TableName);

        builder
          .HasKey(pf => pf.Id);

        builder
            .HasMany(pf => pf.ProfessorsPrograms)
            .WithOne(pp => pp.Professor)
            .OnDelete(DeleteBehavior.NoAction);
    }
}