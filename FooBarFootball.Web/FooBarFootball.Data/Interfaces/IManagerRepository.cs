using FooBarFootball.Models;
using System.Collections.Generic;

namespace FooBarFootball.Data.Interfaces
{
    public interface IManagerRepository
    {
        IList<Card> Get();
        Card Get(string id);
    }
}