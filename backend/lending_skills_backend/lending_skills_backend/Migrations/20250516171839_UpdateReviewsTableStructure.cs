using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace lending_skills_backend.Migrations
{
    /// <inheritdoc />
    public partial class UpdateReviewsTableStructure : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Favorite",
                table: "Reviews");

            migrationBuilder.DropColumn(
                name: "Review",
                table: "Reviews");

            migrationBuilder.RenameColumn(
                name: "IsSelected",
                table: "Reviews",
                newName: "IsFeatured");

            migrationBuilder.RenameColumn(
                name: "Content",
                table: "Reviews",
                newName: "Text");

            migrationBuilder.AddColumn<string>(
                name: "Author",
                table: "Reviews",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Rating",
                table: "Reviews",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Author",
                table: "Reviews");

            migrationBuilder.DropColumn(
                name: "Rating",
                table: "Reviews");

            migrationBuilder.RenameColumn(
                name: "Text",
                table: "Reviews",
                newName: "Content");

            migrationBuilder.RenameColumn(
                name: "IsFeatured",
                table: "Reviews",
                newName: "IsSelected");

            migrationBuilder.AddColumn<bool>(
                name: "Favorite",
                table: "Reviews",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Review",
                table: "Reviews",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
