fooBarControllers.controller('PrintCardsController', ['$scope', '$http', 'ConfigPlayerAttributes', function ($scope, $http, ConfigPlayerAttributes) {
    var atts = ConfigPlayerAttributes.attributes;
    $scope.title = "FooBar Football - Cards";
    $scope.searchTerm = "";
    $scope.players2 = [];
    $scope.moves = [];
    $scope.tactics = [];
    $scope.managers = [];
    
    $http.get('/api/tactics').then(function (data) {
        var tacticsArr = [];
        for (var i = 0; i < data.data.length; i++) {
            var tactic = new ModelTactic(data.data[i]);
            tacticsArr.push(tactic);
        }
        $scope.tactics = tacticsArr;
    });
    
    atts.then(function (result) {
        $http.get('/api/moves').then(function (data) {
            var movesArr = [];
            for (var i = 0; i < data.data.length; i++) {
                var move = new ModelMove(data.data[i], result);
                movesArr.push(move);
            }
            $scope.moves = movesArr;
        });
    });
    
    $http.get('/api/players2').then(function (data) {
        var playerArr = [];
        for (var i = 0; i < data.data.length; i++) {
            var player = new ModelPlayer2(data.data[i]);
            playerArr.push(player);
        }

        $scope.players2 = playerArr;
    });
    
    $http.get('/api/managers').then(function (data) {
        var managersArr = [];
        for (var i = 0; i < data.data.length; i++) {
            var manager = new ModelManager(data.data[i]);
            managersArr.push(manager);
        }
        $scope.managers = managersArr;
    });

    $scope.print = function () {
        var num = 0;
        var html;
        $('input:checked').each(function () {
            num++;
            var cls = $(this).parent().attr('class');
            html += "<div class='" + cls + "'>" + $(this).parent().html() + "</div>";
            if (num % 8 == 0) {
                html += "<div class='printspacer'></div>";
            }
        });

        html = html.replace('undefined', '');

        $('body').addClass('print');
        $('section.selectcards').remove();
        $('.navbar').remove();
        $('h1').remove();
        $('#footer').remove();
        $('.printcards').html(html);
        $('.printcards input').each(function () {
            $(this).remove();
        });
    };
}]);