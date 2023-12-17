// исходный класс
class Shape {
  perimeter = 0;
  square = 0;
  constructor(figure = "", size = {}) {
    this.figure = figure;
    this.size = size;
  }

  countPerimeter() {}
  countSquare() {}
}

// наследника класса shape для представления квадрата
class Rectangle extends Shape {
  constructor(figure = "", size = { a: 1, b: 1 }) {
    super();
    this.figure = figure;
    this.size = size;
  }
  countPerimeter() {
    const { a, b } = this.size;

    this.perimeter = 2 * a + 2 * b;
  }
  countSquare() {
    const { a, b } = this.size;

    this.square = a * b;
  }
}
// наследника класса shape для представления треугольника
class Triangle extends Shape {
  constructor(figure = "", size = { a: 1, b: 1, c: 1 }) {
    super(figure);
    this.figure = figure;
    this.size = size;
    this.checkSize(); // вызываем функцию проверки "правила треугольника"
  }
  checkSize() {
    const { a, b, c } = this.size;

    if (!(a + b > c && a + c > b && b + c > a)) {
      throw new Error("The sizes are invalid for triangle figure");
    }
  }
  countPerimeter() {
    const { a, b, c } = this.size;

    this.perimeter = a + b + c;
  }
  countSquare() {
    this.countPerimeter();

    const p = this.perimeter / 2;
    const { a, b, c } = this.size;

    this.square = Math.sqrt(p * (p - a) * (p - b) * (p - c));
  }
}
// наследника класса shape для представления круга
class Circle extends Shape {
  constructor(figure, size = { r: 1 }) {
    super();
    this.size = size;
    this.figure = figure;
    console.log();
  }
  countPerimeter() {
    const { r } = this.size;

    this.perimeter = 2 * Math.PI * r;
  }
  countSquare() {
    const { r } = this.size;

    this.square = Math.PI * r ** 2;
  }
}
