using FooBarFootball.Models;
using System.Collections.Generic;

namespace FooBarFootball.Data.Interfaces
{
    public interface IMoveRepository
    {
        IList<Card> Get();
        Card Get(string id);
    }
}