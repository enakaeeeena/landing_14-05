using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace lending_skills_backend.Models;

public class DbToken
{
    public const string TableName = "Tokens";

    public Guid Id { get; set; }
}

public class DbTokenConfiguration : IEntityTypeConfiguration<DbToken>
{
    public void Configure(EntityTypeBuilder<DbToken> builder)
    {
        builder.ToTable(DbToken.TableName);

        builder.HasKey(t => t.Id);
    }
}