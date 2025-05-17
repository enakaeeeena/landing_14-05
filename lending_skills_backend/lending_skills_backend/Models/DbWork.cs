using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace lending_skills_backend.Models;

public class DbWork
{
    public const string TableName = "Works";
    public Guid Id { get; set; }
    public string Date { get; set; }
    public string Name { get; set; }
    public string WorkDescription { get; set; }
    public string Skills { get; set; }
    //public string Status { get; set; }
    public string MainPhotoUrl { get; set; }
    public string AdditionalPhotoUrls { get; set; }
    public bool Favorite { get; set; }
    public string Tags { get; set; }
    public DateTime PublishDate { get; set; }
    public int Course { get; set; }
    public bool IsHide { get; set; }

    public Guid UserId { get; set; }
    public DbUser User { get; set; }

    public Guid ProgramId { get; set; }
    public DbProgram Program { get; set; }

    //public ICollection<DbLike> Likes { get; set; } = new List<DbLike>();
}


public class DbWorksConfiguration : IEntityTypeConfiguration<DbWork>
{
    public void Configure(EntityTypeBuilder<DbWork> builder)
    {
        builder.ToTable(DbWork.TableName);
        builder.HasKey(w => w.Id);

        builder.Property(w => w.Name)
            .IsRequired()
            .HasMaxLength(200);
        builder.Property(w => w.WorkDescription)
            .HasMaxLength(1000);
        builder.Property(w => w.MainPhotoUrl)
            .IsRequired()
            .HasMaxLength(500);
        builder.Property(w => w.AdditionalPhotoUrls)
            .HasMaxLength(1000);
        builder.Property(w => w.Tags)
            .HasMaxLength(500);
        builder.Property(w => w.PublishDate)
            .IsRequired();
        builder.Property(w => w.Course)
            .IsRequired();
        builder.Property(w => w.IsHide)
            .IsRequired();

        //builder.HasMany(w => w.Likes)
        //    .WithOne(l => l.Work)
        //    .HasForeignKey(l => l.WorkId)
        //    .OnDelete(DeleteBehavior.NoAction)
        //    .IsRequired(false); // Связь необязательная

        builder.HasOne(w => w.User)
            .WithMany()
            .HasForeignKey(w => w.UserId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(w => w.Program)
            .WithMany()
            .HasForeignKey(w => w.ProgramId)
            .OnDelete(DeleteBehavior.Restrict);
    }

}