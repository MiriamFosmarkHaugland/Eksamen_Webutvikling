#nullable disable
using Microsoft.EntityFrameworkCore;

public class Context : DbContext
{
    public Context(DbContextOptions<Context> options) : base(options) { }
    public DbSet<Backend.Models.Merch> Merch { get; set; }
    public DbSet<Backend.Models.Staff> Staff { get; set; }
}
