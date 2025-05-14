using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace lending_skills_backend.Models;

public class DbTag
{
    public const string TableName = "Tags";
    public Guid Id { get; set; }
    public string Name { get; set; }
}

public class DbTagConfiguration : IEntityTypeConfiguration<DbTag>
{
    public void Configure(EntityTypeBuilder<DbTag> builder)
    {
        builder.ToTable(DbTag.TableName);
        builder.HasKey(t => t.Id);
        builder.Property(t => t.Name)
            .IsRequired()
            .HasMaxLength(100);
        builder.HasIndex(t => t.Name)
            .IsUnique();
    }
}