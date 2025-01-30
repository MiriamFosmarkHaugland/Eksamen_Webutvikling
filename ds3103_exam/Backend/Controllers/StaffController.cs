using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;
[ApiController]
[Route("[controller]")]

public class StaffController : ControllerBase
{
    private readonly Context context;
    public StaffController(Context _context)
    {
        context = _context;
    }

    [HttpPost]
    public async Task<ActionResult<Staff>> Post([FromBody] Staff newStaff)
    {
        if (newStaff == null || string.IsNullOrEmpty(newStaff.Name) || string.IsNullOrEmpty(newStaff.Role) || string.IsNullOrEmpty(newStaff.Email) || string.IsNullOrEmpty(newStaff.ImageUrl))
        {
            return BadRequest("Not all values are filled out");
        }
        try
        {
            context.Staff.Add(newStaff);
            await context.SaveChangesAsync();
            return CreatedAtAction("GetStaffById", new { id = newStaff.Id }, newStaff);
        }
        catch (DbUpdateException ex)
        {
            return StatusCode(500, $"Failed to update the database: {ex.Message}");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Failed to create a new staff member: {ex.Message}");
        }
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Staff>>> Get()
    {
        return await context.Staff.ToListAsync();
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Staff>> GetStaffById(string id)
    {
        Staff? staff = await context.Staff.FindAsync(Convert.ToInt32(id));
        if (staff != null)
        {
            return Ok(staff);
        }
        else
        {
            return NotFound();
        }
    }

    [HttpGet("name/{name}")]
    public async Task<ActionResult<List<Staff>>> GetStaffByName(string name)
    {
        List<Staff> staffList = await context.Staff.Where(s => s.Name.ToLower().Contains(name)).ToListAsync();
        if (staffList.Any())
        {
            return Ok(staffList);
        }
        else
        {
            return NotFound($"No staff members found with the name '{name}'");
        }
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<Staff>> Put(string id, Staff editedStaff)
    {
        Console.WriteLine(editedStaff);
        Staff? staffToUpdate = await context.Staff.FindAsync(Convert.ToInt32(id));
        if (staffToUpdate == null)
        {
            return NotFound();
        }
        context.Entry(staffToUpdate).CurrentValues.SetValues(editedStaff);
        context.Entry(staffToUpdate).State = EntityState.Modified;
        await context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<Staff>> Delete(string id)
    {
        Staff? staff = await context.Staff.FindAsync(Convert.ToInt32(id));
        if (staff != null)
        {
            context.Staff.Remove(staff);
            await context.SaveChangesAsync();
        }
        return NoContent();
    }
}