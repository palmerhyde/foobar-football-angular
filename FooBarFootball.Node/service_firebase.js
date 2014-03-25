var Firebase = require('firebase');
var q = require('q');
var fireBaseUrl = 'https://foobarfootball.firebaseio.com';

var find = function (asset, id) {
  // TODO: Get base from constants file
  var query = new Firebase(fireBaseUrl + '/' + asset + '/' + id);
  var defer = q.defer();

  query.on('value', function (snapshot) {
  	defer.resolve(snapshot.val());
  });

  return defer.promise;
};

var set = function (asset, id, data) {
	var reference = new Firebase(fireBaseUrl + '/' + asset + '/' + id);
	reference.set(data);
};

exports.Find = find;
exports.Set = set;