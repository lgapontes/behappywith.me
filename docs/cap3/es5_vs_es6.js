// Definição de objeto no ECMAScript 5
var Shape = function (id, x, y) {
    this.id = id;
    this.move(x, y);
};
Shape.prototype.move = function (x, y) {
    this.x = x;
    this.y = y;
};

// Definição de objeto no ECMAScript 6
class Shape {
    constructor (id, x, y) {
        this.id = id this.move(x, y)
    }
    move (x, y) { 
        this.x = x this.y = y
    }
}