using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Backend.Interfaces;

namespace Backend.Models;

public class Merch : IMerch
{
    [Key]
    // Autoincrement source: https://learn.microsoft.com/en-us/ef/core/modeling/generated-properties?tabs=data-annotations
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public string Description { get; set; } = "";
    public double Price { get; set; }
    public int StockQuantity { get; set; }
    public string ImageUrl { get; set; } = "";
}

public class PriceRange {
    public double LowestPrice { get; set; }
    public double HighestPrice { get; set; }
}