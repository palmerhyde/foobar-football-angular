var listen = function () {
    console.log('Queue: JoinGame');
    var Firebase = require('firebase');
    var queueRef = new Firebase('https://foobarfootball.firebaseio.com/Queues/JoinGame');
    queueRef.on('child_added', function (snapshot) {
        snapshot.ref().remove();
    });
};
exports.listen = listen;


