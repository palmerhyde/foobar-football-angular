using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FooBarFootball.Models
{
    public class PlayerCardHelper
    {
        public List<PlayerAttributeValue> SetGoalKeeperAttributes(int diving, int handling, int kicking, int positioning, int reflexes, int oneOnOnes)
        {
            List<PlayerAttributeValue> attributes = new List<PlayerAttributeValue>();
            attributes.Add(new PlayerAttributeValue() { Attribute = PlayerAttribute.Diving, Value = diving });
            attributes.Add(new PlayerAttributeValue() { Attribute = PlayerAttribute.Handling, Value = handling });
            attributes.Add(new PlayerAttributeValue() { Attribute = PlayerAttribute.Kicking, Value = kicking });
            attributes.Add(new PlayerAttributeValue() { Attribute = PlayerAttribute.Positioning, Value = positioning });
            attributes.Add(new PlayerAttributeValue() { Attribute = PlayerAttribute.Reflexes, Value = reflexes });
            attributes.Add(new PlayerAttributeValue() { Attribute = PlayerAttribute.OneOnOnes, Value = oneOnOnes });
            return attributes;
        }

        public List<PlayerAttributeValue> SetOutfieldPlayerAttributes(int passing, int pace, int dribbling, int shooting, int heading, int defending)
        {
            List<PlayerAttributeValue> attributes = new List<PlayerAttributeValue>();
            attributes.Add(new PlayerAttributeValue() { Attribute = PlayerAttribute.Passing, Value = passing });
            attributes.Add(new PlayerAttributeValue() { Attribute = PlayerAttribute.Pace, Value = pace });
            attributes.Add(new PlayerAttributeValue() { Attribute = PlayerAttribute.Dribbling, Value = dribbling });
            attributes.Add(new PlayerAttributeValue() { Attribute = PlayerAttribute.Shooting, Value = shooting });
            attributes.Add(new PlayerAttributeValue() { Attribute = PlayerAttribute.Heading, Value = heading });
            attributes.Add(new PlayerAttributeValue() { Attribute = PlayerAttribute.Defending, Value = defending });
            return attributes;
        }
    }
}
