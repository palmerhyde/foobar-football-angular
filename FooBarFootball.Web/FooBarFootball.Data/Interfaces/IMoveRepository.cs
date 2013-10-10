using FooBarFootball.Models;
using System.Collections.Generic;

namespace FooBarFootball.Data.Interfaces
{
    public interface IMoveRepository
    {
        IList<MoveCard> Get();
    }
}