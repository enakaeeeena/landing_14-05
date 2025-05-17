using lending_skills_backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;



namespace lending_skills_backend.DataAccess;

public class ApplicationDbContext : DbContext
{
    private readonly IConfiguration _configuration;

    public ApplicationDbContext(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    // 🔽 Таблицы твоего проекта
    public DbSet<DbUser> Users { get; set; }
    public DbSet<DbProgram> Programs { get; set; }
    public DbSet<DbReview> Reviews { get; set; }
    public DbSet<DbProfessor> Professors { get; set; }
    public DbSet<DbProfessorProgram> ProfessorsPrograms { get; set; }
    public DbSet<DbWork> Works { get; set; }
    public DbSet<DbLike> Likes { get; set; }
    public DbSet<DbPage> Pages { get; set; }
    public DbSet<DbBlock> Blocks { get; set; }
    public DbSet<DbForm> Forms { get; set; }
    public DbSet<DbToken> Tokens { get; set; }
    public DbSet<DbAdmin> Admins { get; set; }
    public DbSet<DbTag> Tags { get; set; }
    public DbSet<DbTagsWorks> TagsWorks { get; set; }
    public DbSet<DbSkill> Skills { get; set; }
    public DbSet<DbSkillWorks> SkillsWorks { get; set; }
    public DbSet<DbSkillsUsers> SkillsUsers { get; set; }
    public DbSet<PasswordResetCode> PasswordResetCodes { get; set; }

    public DbSet<DbEmailConfirmation> EmailConfirmations { get; set; }



    // 🔽 Добавляем таблицы OpenIddict


    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        // 🔽 Подключение к БД из appsettings
        optionsBuilder.UseSqlServer(_configuration.GetConnectionString("DefaultConnection"));

     
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

       
    }
}
