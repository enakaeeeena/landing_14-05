using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace lending_skills_backend.Models;

public class DbLike
{
    public const string TableName = "Likes";
    public Guid Id { get; set; }

    public Guid UserId { get; set; }
    public DbUser User { get; set; }

    public Guid WorkId { get; set; }
    //public DbWork Work { get; set; }
}


public class DbLikeConfiguration : IEntityTypeConfiguration<DbLike>
{
    public void Configure(EntityTypeBuilder<DbLike> builder)
    {
        builder.ToTable(DbLike.TableName);
        builder.HasKey(l => l.Id);
        builder.HasAlternateKey(l => new { l.UserId, l.WorkId });

        builder.HasOne(l => l.User)
            .WithMany(u => u.Likes)
            .HasForeignKey(l => l.UserId)
            .OnDelete(DeleteBehavior.Restrict);

        //builder.HasOne(l => l.Work)
        //    .WithMany(u => u.Likes)
        //    .HasForeignKey(l => l.WorkId)
        //    .OnDelete(DeleteBehavior.Cascade);
    }
}

