using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace lending_skills_backend.Models;

public class DbSkillsUsers
{
    public const string TableName = "SkillsUsers";
    public Guid Id { get; set; }
    public Guid SkillId { get; set; }
    public DbSkill Skill { get; set; }
    public Guid UserId { get; set; }
    public DbUser User { get; set; }
}

public class DbSkillsUsersConfiguration : IEntityTypeConfiguration<DbSkillsUsers>
{
    public void Configure(EntityTypeBuilder<DbSkillsUsers> builder)
    {
        builder.ToTable(DbSkillsUsers.TableName);
        builder.HasKey(su => su.Id);
        builder.HasAlternateKey(su => new { su.SkillId, su.UserId });

        builder.HasOne(su => su.Skill)
            .WithMany()
            .HasForeignKey(su => su.SkillId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(su => su.User)
            .WithMany()
            .HasForeignKey(su => su.UserId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}