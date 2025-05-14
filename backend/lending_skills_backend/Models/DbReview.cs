using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace lending_skills_backend.Models;

public class DbReview
{
    public const string TableName = "Reviews";

    public Guid Id { get; set; }
    public string? Review { get; set; }
    public bool Favorite { get; set; }
    public string Content { get; set; }
    public DateTime CreatedDate { get; set; }
    public bool IsSelected { get; set; }

    public Guid ProgramId { get; set; }
    public DbProgram Program { get; set; }

    public Guid UserId { get; set; }
    public DbUser User { get; set; }
}

public class DbReviewConfiguration : IEntityTypeConfiguration<DbReview>
{
    public void Configure(EntityTypeBuilder<DbReview> builder)
    {
        builder.ToTable(DbReview.TableName);

        builder.HasKey(r => r.Id);

        //builder
        //    .HasOne(r => r.Program)
        //    .WithMany()
        //    .HasForeignKey(r => r.ProgramId)
        //    .OnDelete(DeleteBehavior.Cascade);

        //builder
        //    .HasOne(r => r.User)
        //    .WithMany()
        //    .HasForeignKey(r => r.UserId)
        //    .OnDelete(DeleteBehavior.Cascade);
    }
}