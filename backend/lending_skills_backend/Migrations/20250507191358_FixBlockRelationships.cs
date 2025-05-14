using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace lending_skills_backend.Migrations
{
    /// <inheritdoc />
    public partial class FixBlockRelationships : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Blocks_Blocks_NextBlockId",
                table: "Blocks");

            migrationBuilder.DropForeignKey(
                name: "FK_Blocks_Blocks_PreviousBlockId",
                table: "Blocks");

            migrationBuilder.DropForeignKey(
                name: "FK_Blocks_Forms_FormId",
                table: "Blocks");

            migrationBuilder.DropForeignKey(
                name: "FK_Blocks_Pages_PageId",
                table: "Blocks");

            migrationBuilder.DropIndex(
                name: "IX_Blocks_FormId",
                table: "Blocks");

            migrationBuilder.DropIndex(
                name: "IX_Blocks_NextBlockId",
                table: "Blocks");

            migrationBuilder.DropIndex(
                name: "IX_Blocks_PageId",
                table: "Blocks");

            migrationBuilder.DropIndex(
                name: "IX_Blocks_PreviousBlockId",
                table: "Blocks");

            migrationBuilder.AlterColumn<string>(
                name: "Title",
                table: "Blocks",
                type: "nvarchar(200)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "IsExample",
                table: "Blocks",
                type: "nvarchar(10)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Date",
                table: "Blocks",
                type: "nvarchar(10)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<Guid>(
                name: "DbPageId",
                table: "Blocks",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Blocks_DbPageId",
                table: "Blocks",
                column: "DbPageId");

            migrationBuilder.AddForeignKey(
                name: "FK_Blocks_Pages_DbPageId",
                table: "Blocks",
                column: "DbPageId",
                principalTable: "Pages",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Blocks_Pages_DbPageId",
                table: "Blocks");

            migrationBuilder.DropIndex(
                name: "IX_Blocks_DbPageId",
                table: "Blocks");

            migrationBuilder.DropColumn(
                name: "DbPageId",
                table: "Blocks");

            migrationBuilder.AlterColumn<string>(
                name: "Title",
                table: "Blocks",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(200)");

            migrationBuilder.AlterColumn<string>(
                name: "IsExample",
                table: "Blocks",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)");

            migrationBuilder.AlterColumn<string>(
                name: "Date",
                table: "Blocks",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)");

            migrationBuilder.CreateIndex(
                name: "IX_Blocks_FormId",
                table: "Blocks",
                column: "FormId");

            migrationBuilder.CreateIndex(
                name: "IX_Blocks_NextBlockId",
                table: "Blocks",
                column: "NextBlockId");

            migrationBuilder.CreateIndex(
                name: "IX_Blocks_PageId",
                table: "Blocks",
                column: "PageId");

            migrationBuilder.CreateIndex(
                name: "IX_Blocks_PreviousBlockId",
                table: "Blocks",
                column: "PreviousBlockId");

            migrationBuilder.AddForeignKey(
                name: "FK_Blocks_Blocks_NextBlockId",
                table: "Blocks",
                column: "NextBlockId",
                principalTable: "Blocks",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Blocks_Blocks_PreviousBlockId",
                table: "Blocks",
                column: "PreviousBlockId",
                principalTable: "Blocks",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Blocks_Forms_FormId",
                table: "Blocks",
                column: "FormId",
                principalTable: "Forms",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Blocks_Pages_PageId",
                table: "Blocks",
                column: "PageId",
                principalTable: "Pages",
                principalColumn: "Id");
        }
    }
}
