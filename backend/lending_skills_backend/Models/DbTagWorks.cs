using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace lending_skills_backend.Models;

public class DbTagsWorks
{
    public const string TableName = "TagsWorks";
    public Guid Id { get; set; }
    public Guid TagId { get; set; }
    public DbTag Tag { get; set; }
    public Guid WorkId { get; set; }
    public DbWork Work { get; set; }
}

public class DbTagsWorksConfiguration : IEntityTypeConfiguration<DbTagsWorks>
{
    public void Configure(EntityTypeBuilder<DbTagsWorks> builder)
    {
        builder.ToTable(DbTagsWorks.TableName);
        builder.HasKey(tw => tw.Id);
        builder.HasAlternateKey(tw => new { tw.TagId, tw.WorkId });

        builder.HasOne(tw => tw.Tag)
            .WithMany()
            .HasForeignKey(tw => tw.TagId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(tw => tw.Work)
            .WithMany()
            .HasForeignKey(tw => tw.WorkId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}