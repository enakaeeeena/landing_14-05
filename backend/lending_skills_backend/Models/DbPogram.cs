using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace lending_skills_backend.Models;

public class DbProgram
{
    public const string TableName = "Programs";

    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Menu { get; set; } 
    public bool IsActive { get; set; } = false; 

    public Guid? PageId { get; set; }
    //public DbPage? Pages { get; set; }

    public ICollection<DbPage> Pages { get; set; } = new List<DbPage>();
    public ICollection<DbProfessorProgram> ProfessorsPrograms { get; set; } = new List<DbProfessorProgram>();
}

public class DbProgramConfiguration : IEntityTypeConfiguration<DbProgram>
{
    public void Configure(EntityTypeBuilder<DbProgram> builder)
    {
        builder.ToTable(DbProgram.TableName);

        builder.HasKey(p => p.Id);

        builder.Property(p => p.IsActive).HasDefaultValue(false);

        builder.HasMany(p => p.Pages)  
            .WithOne(pg => pg.Program);

        builder.HasMany(pf => pf.ProfessorsPrograms)
            .WithOne(pp => pp.Program)
            .OnDelete(DeleteBehavior.NoAction);
    }
}
