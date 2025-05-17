using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace lending_skills_backend.Models;

public class DbForm
{
    public const string TableName = "Forms";
    public Guid Id { get; set; }

    public string Data { get; set; }
    public DateTime Date { get; set; }
    public bool IsHidden { get; set; } = false;

    [Required]
    public Guid BlockId { get; set; }
    [ForeignKey("BlockId")]
    public DbBlock Block { get; set; }
}

public class DbFormsConfiguration : IEntityTypeConfiguration<DbForm>
{
    public void Configure(EntityTypeBuilder<DbForm> builder)
    {
        builder
            .ToTable(DbForm.TableName);

        builder
            .HasKey(f => f.Id);

        builder
            .Property(f => f.IsHidden)
            .HasDefaultValue(false);

        builder
            .HasOne(f => f.Block)
            .WithOne(b => b.Form)
            .HasForeignKey<DbForm>(f => f.BlockId)
            .OnDelete(DeleteBehavior.NoAction);
    }
}