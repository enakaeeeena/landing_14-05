using System.ComponentModel.DataAnnotations;

namespace lending_skills_backend.Dtos.Requests;

public class AddBlockToPageRequest
{
    // Идентификатор страницы, к которой добавляется блок
    [Required(ErrorMessage = "Идентификатор страницы обязателен")]
    public Guid PageId { get; set; }

    // Данные блока
    [Required(ErrorMessage = "Данные блока обязательны")]
    public string Data { get; set; }

    // Флаг, указывающий является ли блок примером
    [Required(ErrorMessage = "Флаг примера обязателен")]
    public string IsExample { get; set; }

    // Тип блока
    [Required(ErrorMessage = "Тип блока обязателен")]
    public string Type { get; set; }

    // Идентификатор блока, после которого нужно вставить новый блок
    public Guid? AfterBlockId { get; set; }
}
