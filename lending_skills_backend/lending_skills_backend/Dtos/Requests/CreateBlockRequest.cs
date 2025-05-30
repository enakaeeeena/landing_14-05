using System.ComponentModel.DataAnnotations;

namespace lending_skills_backend.Dtos.Requests
{
    public class CreateBlockRequest
    {
        [Required(ErrorMessage = "Type is required")]
        public string type { get; set; }

        [Required(ErrorMessage = "Title is required")]
        public string title { get; set; }

        [Required(ErrorMessage = "Content is required")]
        public string content { get; set; }

        public bool visible { get; set; } = true;

        [Required(ErrorMessage = "Date is required")]
        public string date { get; set; }

        [Required(ErrorMessage = "IsExample is required")]
        public string isExample { get; set; }
    }
} 