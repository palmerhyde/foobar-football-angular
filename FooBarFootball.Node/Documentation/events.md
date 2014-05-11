Events triggered in FooBar Football.

Manager

damaged (amount)
died
card_drawn (card)
card_put_back(card)
card_destroyed (card)
card_played (card)
move_played (card)
turn_started
turn_ended
attack_minion
attack_player
fatigue_damage(amount)
damaged(amount, what)
spell_damaged(amount, card)
minion_damaged(amount, minion)
player_damaged(amount, player)
attack increased(amount)
attack_decreased(amount)
armour_increased(amount)
heal(amount)
used_power
found_power_target(target)

Game

player_on_player_attack(player, target)
player_on_manager_attack(player, target)
manager_on_player_attack(player, target)
manager_on_manager_attack(player, target)
player_added(new_player)
player_died(dead_player)
kept_cards(card_array)
player_removed

Player

* added_to_board(player)
* attack_player
* attack_manager
* damaged(amount, attacker)
* healed(amount)
* move_damaged(amount, card)
* player_damaged(amount, player)
* manager_damaged(amount, player)
* died (attacker)
* attack increased(amount)
* attack_decreased(amount)
* health_increased(amount)
* health_decreased(amount)
* silenced

Event queues

* player_removed_from_pitch
game.removedPlayers = [card1, card2, card3]
game.playerEventQueue[card1, card2, card3]

1. For each removed player, see if an effect exists for the removed player
2. Resolve the effect
3. Move the player into the discard pile.