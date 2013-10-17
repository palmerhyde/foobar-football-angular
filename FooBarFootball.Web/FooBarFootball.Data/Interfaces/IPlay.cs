using FooBarFootball.Models;

namespace FooBarFootball.Data.Interfaces
{
    public interface IPlayLogic
    {
        PlayOutputModel Play(PlayInputModel input);
    }
}