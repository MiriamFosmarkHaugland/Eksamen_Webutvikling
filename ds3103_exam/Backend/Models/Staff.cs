using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Backend.Interfaces;

namespace Backend.Models;

public class Staff : IStaff
{
    [Key]
    // Autoincrement source: https://learn.microsoft.com/en-us/ef/core/modeling/generated-properties?tabs=data-annotations
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public string Role { get; set; } = "";
    public string Email { get; set; } = "";
    public string PhoneNumber { get; set; } = "";
    public string ImageUrl { get; set; } = "";
}
