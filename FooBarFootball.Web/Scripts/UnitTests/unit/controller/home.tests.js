describe('Controller: HomeController', function () {

    // load the controller's module
    beforeEach(module('fooBarControllers'));

    var HomeCtrl,
      scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        HomeCtrl = $controller('HomeController', {
            $scope: scope
        });
    }));

    it('default unit test', function () {
        expect(true).toBe(true);
    });
});