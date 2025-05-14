using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace lending_skills_backend.Models;

public class DbSkill
{
    public const string TableName = "Skills";
    public Guid Id { get; set; }
    public string Name { get; set; }
}

public class DbSkillConfiguration : IEntityTypeConfiguration<DbSkill>
{
    public void Configure(EntityTypeBuilder<DbSkill> builder)
    {
        builder.ToTable(DbSkill.TableName);
        builder.HasKey(s => s.Id);
        builder.Property(s => s.Name)
            .IsRequired()
            .HasMaxLength(100);
        builder.HasIndex(s => s.Name)
            .IsUnique();
    }
}