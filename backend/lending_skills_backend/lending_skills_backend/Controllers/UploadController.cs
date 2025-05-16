using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace lending_skills_backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UploadController : ControllerBase
{
    private readonly IWebHostEnvironment _environment;
    private readonly ILogger<UploadController> _logger;

    public UploadController(IWebHostEnvironment environment, ILogger<UploadController> logger)
    {
        _environment = environment;
        _logger = logger;
    }

    [HttpPost("image")]
    [Authorize]
    public async Task<IActionResult> UploadImage(IFormFile file)
    {
        try
        {
            _logger.LogInformation("Starting image upload process");

            if (file == null || file.Length == 0)
            {
                _logger.LogWarning("No file was uploaded");
                return BadRequest("No file uploaded");
            }

            _logger.LogInformation($"Received file: {file.FileName}, Size: {file.Length} bytes, ContentType: {file.ContentType}");

            // Validate file type
            var allowedTypes = new[] { "image/jpeg", "image/png", "image/gif" };
            if (!allowedTypes.Contains(file.ContentType.ToLower()))
            {
                _logger.LogWarning($"Invalid file type: {file.ContentType}");
                return BadRequest("Invalid file type. Only JPEG, PNG and GIF are allowed.");
            }

            // Create uploads directory if it doesn't exist
            var uploadsDir = Path.Combine(_environment.WebRootPath, "uploads");
            if (!Directory.Exists(uploadsDir))
            {
                _logger.LogInformation($"Creating uploads directory at: {uploadsDir}");
                Directory.CreateDirectory(uploadsDir);
            }

            // Generate unique filename
            var fileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
            var filePath = Path.Combine(uploadsDir, fileName);

            _logger.LogInformation($"Saving file to: {filePath}");

            // Save file
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            // Return the URL
            var fileUrl = $"/uploads/{fileName}";
            _logger.LogInformation($"File uploaded successfully. URL: {fileUrl}");

            return Ok(new { url = fileUrl });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error uploading image");
            return StatusCode(500, new { error = "Error uploading image", details = ex.Message });
        }
    }
} 