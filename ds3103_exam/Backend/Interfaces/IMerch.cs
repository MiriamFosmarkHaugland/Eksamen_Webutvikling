using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Interfaces
{
    public interface IMerch
    {
    int Id { get; set; }
    string Name { get; set; }
    string Description { get; set; }
    double Price { get; set; }
    int StockQuantity { get; set; }
    string ImageUrl { get; set; }
    }
}