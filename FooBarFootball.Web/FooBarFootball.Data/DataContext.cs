using FooBarFootball.Models;
using System.Data.Entity;

namespace FooBarFootball.Data
{
    public class DataContext : DbContext
    {
        public DbSet<Card> Cards { get; set; }
    }
}