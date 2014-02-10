﻿using FooBarFootball.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FooBarFootball.Data.Interfaces
{
    public interface IPlayer2Repository
    {
        IList<PlayerCard2> Get();
        PlayerCard2 Get(string id);
    }
}