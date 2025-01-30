using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;
[ApiController]
[Route("[controller]")]

public class MerchController : ControllerBase
{
    private readonly Context context;
    public MerchController(Context _context)
    {
        context = _context;
    }

    [HttpPost]
    public async Task<ActionResult<Staff>> Post([FromBody] Merch newMerch)
    {
        if (newMerch == null || string.IsNullOrEmpty(newMerch.Name) || string.IsNullOrEmpty(newMerch.Description) || string.IsNullOrEmpty(newMerch.ImageUrl))
        {
            return BadRequest("Not all values are filled out");
        }
        try
        {
            context.Merch.Add(newMerch);
            await context.SaveChangesAsync();
            return CreatedAtAction("GetMerchById", new { id = newMerch.Id }, newMerch);
        }
        catch (DbUpdateException ex)
        {
            return StatusCode(500, $"Failed to update the database: {ex.Message}");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Failed to create a new merch item: {ex.Message}");
        }
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Merch>>> Get()
    {
        return await context.Merch.ToListAsync();
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Merch>> GetMerchById(string id)
    {
        Merch? merch = await context.Merch.FindAsync(Convert.ToInt32(id));
        if (merch != null)
        {
            return Ok(merch);
        }
        else
        {
            return NotFound();
        }
    }

    [HttpPost("price")]
    public async Task<ActionResult<List<Merch>>> GetMerchByPrice([FromBody] PriceRange priceRange)
    {
        Console.WriteLine(priceRange.LowestPrice);
        Console.WriteLine(priceRange.HighestPrice);
        List<Merch> merchList = await context.Merch.Where(m => m.Price >= priceRange.LowestPrice && m.Price <= priceRange.HighestPrice).ToListAsync();
        if (merchList.Any())
        {
            return Ok(merchList);
        }
        else
        {
            return NotFound($"No merch items are in this price range '{merchList}'");
        }
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<Merch>> Put(string id, Merch editedMerch)
    {
        Merch? merchToUpdate = await context.Merch.FindAsync(Convert.ToInt32(id));
        if (merchToUpdate == null)
        {
            return NotFound();
        }
        context.Entry(merchToUpdate).CurrentValues.SetValues(editedMerch);
        context.Entry(merchToUpdate).State = EntityState.Modified;
        await context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<Merch>> Delete(string id)
    {
        Merch? merch = await context.Merch.FindAsync(Convert.ToInt32(id));
        if (merch != null)
        {
            context.Merch.Remove(merch);
            await context.SaveChangesAsync();
        }
        return NoContent();
    }
}