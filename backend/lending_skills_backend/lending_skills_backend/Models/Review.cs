using System;

namespace lending_skills_backend.Models
{
    public class Review
    {
        public int Id { get; set; }
        public string AuthorName { get; set; }
        public string AuthorTitle { get; set; }
        public string AuthorImage { get; set; }
        public string Content { get; set; }
        public bool IsFeatured { get; set; }
        public DateTime CreatedAt { get; set; }
    }
} 