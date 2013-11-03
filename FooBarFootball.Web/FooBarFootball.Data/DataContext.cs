using FooBarFootball.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FooBarFootball.Data
{
    public class DataContext : DbContext
    {
        public DbSet<Card> Cards { get; set; }
        public DbSet<PlayerCard> PlayerCards { get; set; }
        public DbSet<MoveCard> MoveCards { get; set; }
        public DbSet<TacticCard> TacticCards { get; set; }
    }
}