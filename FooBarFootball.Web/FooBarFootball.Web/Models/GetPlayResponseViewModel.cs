using FooBarFootball.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FooBarFootball.Web.Models
{
    public class GetPlayResponseViewModel
    {
        public string AttackingPlayerId { get; set; }
        public string DefendingPlayerId { get; set; }
        public string MoveId { get; set; }
    }
}