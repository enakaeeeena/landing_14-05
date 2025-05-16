using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace lending_skills_backend.Models;

public class DbSkillWorks
{
    public const string TableName = "SkillsWorks";
    public Guid Id { get; set; }
    public Guid SkillId { get; set; }
    public DbSkill Skill { get; set; }
    public Guid WorkId { get; set; }
    public DbWork Work { get; set; }
}

public class DbSkillWorksConfiguration : IEntityTypeConfiguration<DbSkillWorks>
{
    public void Configure(EntityTypeBuilder<DbSkillWorks> builder)
    {
        builder.ToTable(DbSkillWorks.TableName);
        builder.HasKey(sw => sw.Id);
        builder.HasAlternateKey(sw => new { sw.SkillId, sw.WorkId });

        builder.HasOne(sw => sw.Skill)
            .WithMany()
            .HasForeignKey(sw => sw.SkillId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(sw => sw.Work)
            .WithMany()
            .HasForeignKey(sw => sw.WorkId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}