console.log('FooBar Football server starting...');
var queue = require('./listener_queue_playplayercardfromhandtopitch');
var game_listener = require('./listener_game');
queue.listen();
game_listener.listen();