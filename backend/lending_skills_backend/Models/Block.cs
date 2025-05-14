using System;
using System.Text.Json;

namespace lending_skills_backend.Models
{
    public class Block
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public string Title { get; set; }
        public JsonDocument Content { get; set; }
        public bool Visible { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
} 