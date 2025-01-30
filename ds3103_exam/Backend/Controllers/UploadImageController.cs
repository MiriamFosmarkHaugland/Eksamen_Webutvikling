using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;
[ApiController]
[Route("[controller]")]

public class UploadImageController : ControllerBase
{
    private readonly IWebHostEnvironment hosting;
    public UploadImageController(IWebHostEnvironment _hosting)
    {
        hosting = _hosting;
    }

    [HttpPost]
    public IActionResult SaveImage(IFormFile file)
    {
        if (file == null || file.Length == 0)
        {
            return BadRequest("No uploaded files");
        }
        string wwwrootPath = hosting.WebRootPath;

        // Source: https://www.uuidgenerator.net/dev-corner/c-sharp
        Guid imageGuid = Guid.NewGuid();

        string fileExtension = file.FileName.Split(".").Last();
        string fileName = imageGuid.ToString() + "." + fileExtension;

        string absolutePath = Path.Combine(wwwrootPath, "images", fileName);
        var directory = Path.GetDirectoryName(absolutePath);
        if (!Directory.Exists(directory))
        {
            Directory.CreateDirectory(directory);
        }
        using (var fileStream = new FileStream(absolutePath, FileMode.Create))
        {
            file.CopyTo(fileStream);
        }
        return Ok(new { FileName = fileName });
    }
}
