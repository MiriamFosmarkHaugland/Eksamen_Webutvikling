using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Interfaces
{
    public interface IStaff
    {
        int Id { get; set; }
        string Name { get; set; }
        string Role { get; set; }
        string Email { get; set; }
        string PhoneNumber { get; set; }
        string ImageUrl { get; set; }
    }
}