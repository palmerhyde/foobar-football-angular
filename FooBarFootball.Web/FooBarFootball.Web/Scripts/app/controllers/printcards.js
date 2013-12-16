fooBarControllers.controller('PrintCardsController', ['$scope', '$http', 'ConfigPlayerAttributes', function ($scope, $http, ConfigPlayerAttributes) {
    var atts = ConfigPlayerAttributes.attributes;
    $scope.title = "FooBar Football - Cards";
    $scope.searchTerm = "";
    $scope.players = [];
    $scope.moves = [];
    $scope.tactics = [];
    
    $http.get('/api/tactics').then(function (data) {
        var tacticsArr = [];
        for (var i = 0; i < data.data.length; i++) {
            var tactic = new ModelTactic(data.data[i]);
            tacticsArr.push(tactic);
        }
        $scope.tactics = tacticsArr;
    });
    
    atts.then(function (result) {
        $http.get('/api/players').then(function (data) {
            var playerArr = [];
            for (var i = 0; i < data.data.length; i++) {
                var player = new ModelPlayer(data.data[i], result);
                playerArr.push(player); 
            }

            $scope.players = playerArr;
        });
        $http.get('/api/moves').then(function (data) {
            var movesArr = [];
            for (var i = 0; i < data.data.length; i++) {
                var move = new ModelMove(data.data[i], result);
                movesArr.push(move);
            }
            $scope.moves = movesArr;
        });
    });

    $scope.print = function () {
        var num = 0;
        var html;
        $('input:checked').each(function () {
            num++;
            html += "<div class='card'>" + $(this).parent().html() + "</div>";
            if (num % 10 == 0) {
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