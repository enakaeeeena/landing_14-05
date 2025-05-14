using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace lending_skills_backend.Dtos.Requests
{
    public class ChangeBlockPositionRequest
    {
        [Required(ErrorMessage = "BlockId is required")]
        [JsonPropertyName("blockId")]
        public Guid BlockId { get; set; }

        [JsonPropertyName("afterBlockId")]
        public Guid? AfterBlockId { get; set; }

        public ChangeBlockPositionRequest()
        {
            BlockId = Guid.Empty;
            AfterBlockId = null;
        }
    }
}
