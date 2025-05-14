using System.ComponentModel.DataAnnotations;

namespace lending_skills_backend.Dtos.Requests;

public class EditBlockRequest
{
    [Required(ErrorMessage = "Id is required")]
    public Guid Id { get; set; }

    [Required(ErrorMessage = "Type is required")]
    public string Type { get; set; }

    [Required(ErrorMessage = "Title is required")]
    public string Title { get; set; }

    [Required(ErrorMessage = "Content is required")]
    public string Content { get; set; }

    public bool Visible { get; set; }

    [Required(ErrorMessage = "Date is required")]
    public string Date { get; set; }

    [Required(ErrorMessage = "IsExample is required")]
    public string IsExample { get; set; }
}
