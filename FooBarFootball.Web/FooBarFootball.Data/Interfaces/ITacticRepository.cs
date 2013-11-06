using FooBarFootball.Models;
using System.Collections.Generic;

namespace FooBarFootball.Data.Interfaces
{
    public interface ITacticRepository
    {
        IList<TacticCard> Get();
        TacticCard Get(string id);
    }
}