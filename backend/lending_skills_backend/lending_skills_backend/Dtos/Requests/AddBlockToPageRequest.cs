using System.ComponentModel.DataAnnotations;

namespace lending_skills_backend.Dtos.Requests;

public class AddBlockToPageRequest
{
    [Required(ErrorMessage = "PageId is required")]
    public Guid PageId { get; set; }

    [Required(ErrorMessage = "Data is required")]
    public string Data { get; set; }

    [Required(ErrorMessage = "IsExample is required")]
    public string IsExample { get; set; }

    [Required(ErrorMessage = "Type is required")]
    public string Type { get; set; }

    public Guid? AfterBlockId { get; set; }
}
