using FooBarFootball.Models;
using System.Collections.Generic;

namespace FooBarFootball.Data.Interfaces
{
    public interface IManagerRepository
    {
        IList<ManagerCard> Get();
        ManagerCard Get(string id);
    }
}