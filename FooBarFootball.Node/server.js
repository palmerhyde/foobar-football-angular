console.log('FooBar Football server starting...');
var game_listener = require('./listener_game');
var queues = require('./listener_queue');
queues.listen();
game_listener.listen();