Array.prototype.shuffle = function () {
    var $arr = this;
    $arr.sort(function () {
        return Math.random() - 0.5;
    });
    return $arr;
}