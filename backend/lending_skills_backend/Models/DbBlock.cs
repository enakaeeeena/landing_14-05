using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;

namespace lending_skills_backend.Models;

public class DbBlock
{
    public const string TableName = "Blocks";
    public Guid Id { get; set; }

    [Required(ErrorMessage = "Type is required")]
    [Column(TypeName = "nvarchar(max)")]
    public string Type { get; set; }

    [Required(ErrorMessage = "Title is required")]
    [Column(TypeName = "nvarchar(200)")]
    public string Title { get; set; }

    [Required(ErrorMessage = "Content is required")]
    [Column(TypeName = "nvarchar(max)")]
    public string Content { get; set; }

    public bool Visible { get; set; } = true;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime? UpdatedAt { get; set; }

    [Required(ErrorMessage = "Date is required")]
    [Column(TypeName = "nvarchar(10)")]
    public string Date { get; set; }

    [Required(ErrorMessage = "IsExample is required")]
    [Column(TypeName = "nvarchar(10)")]
    public string IsExample { get; set; }

    public Guid? NextBlockId { get; set; }
    public Guid? PreviousBlockId { get; set; }
    public Guid? FormId { get; set; }
    public Guid? PageId { get; set; }

    [NotMapped]
    public DbBlock? NextBlock { get; set; }

    [NotMapped]
    public DbBlock? PreviousBlock { get; set; }

    [NotMapped]
    public DbForm? Form { get; set; }

    [NotMapped]
    public DbPage? Page { get; set; }
}

public class DbBlocksConfiguration : IEntityTypeConfiguration<DbBlock>
{
    public void Configure(EntityTypeBuilder<DbBlock> builder)
    {
        builder.ToTable(DbBlock.TableName);
        builder.HasKey(b => b.Id);

        // Configure Page relationship
        builder.HasOne<DbPage>()
            .WithMany(p => p.Blocks)
            .HasForeignKey(b => b.PageId)
            .OnDelete(DeleteBehavior.SetNull)
            .IsRequired(false);

        // Configure NextBlock relationship
        builder.HasOne<DbBlock>()
            .WithOne()
            .HasForeignKey<DbBlock>(b => b.NextBlockId)
            .OnDelete(DeleteBehavior.SetNull)
            .IsRequired(false);

        // Configure PreviousBlock relationship
        builder.HasOne<DbBlock>()
            .WithOne()
            .HasForeignKey<DbBlock>(b => b.PreviousBlockId)
            .OnDelete(DeleteBehavior.SetNull)
            .IsRequired(false);

        // Configure Form relationship
        builder.HasOne<DbForm>()
            .WithOne()
            .HasForeignKey<DbBlock>(b => b.FormId)
            .OnDelete(DeleteBehavior.SetNull)
            .IsRequired(false);

        builder.Property(b => b.Content).IsRequired();

        // Configure navigation properties to be ignored during validation
        builder.Ignore(b => b.NextBlock);
        builder.Ignore(b => b.PreviousBlock);
        builder.Ignore(b => b.Form);
        builder.Ignore(b => b.Page);
    }
}
