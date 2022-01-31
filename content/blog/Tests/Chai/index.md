---
title: Тестирование кода с помощью библиотеки Chai
description: Chai - это библиотека тестирования JavaScript, которая помогает проверить, что после внесения изменений в код программа все еще ведет себя так, как нужно. Используя Chai, можно написать тесты, описывающие требования к программе, и посмотреть, соответствует ли она им.
date: 2020-04-22
---

Мне попалась переведенная с английского статья, в которой описываются [11 инструментов и библиотек для тестирования React-компонентов](https://techrocks.ru/2019/07/12/11-react-testing-tools/). Не лишнем будет прочитать ее прежде, чем продолжать читать далее.

Источниками для данной статьи послужили: [chaijs](https://www.chaijs.com/guide/), [freecodecamp](https://www.freecodecamp.org/learn/information-security-and-quality-assurance/quality-assurance-and-testing-with-chai/) и [nodejs](https://ru.nodejs.org/api/assert.html).

Chai – это библиотека, предоставляющая различные функции для проверки утверждений. Chai - это библиотека утверждений [BDD/TDD](https://medium.com/@lucyhackwrench/%D1%87%D1%82%D0%BE-%D1%82%D0%B0%D0%BA%D0%BE%D0%B5-tdd-%D0%B8-bdd-%D0%BD%D0%B0-%D0%BF%D0%B0%D0%BB%D1%8C%D1%86%D0%B0%D1%85-%D0%B8-%D1%87%D1%82%D0%BE-%D0%B4%D0%BE%D0%BB%D0%B6%D0%B5%D0%BD-%D0%B7%D0%BD%D0%B0%D1%82%D1%8C-%D0%BE-%D0%BD%D0%B8%D1%85-%D1%84%D1%80%D0%BE%D0%BD%D1%82%D0%B5%D0%BD%D0%B4%D0%B5%D1%80-701a10e06bb9) для node и браузера, которая может прекрасно сочетаться с любым тестовым фреймворком JavaScript, например, таким как,  [Mocha](https://mochajs.org) или [Jest](https://jestjs.io/).

Chai имеет несколько интерфейсов, которые позволяют разработчику выбрать наиболее удобный. Цепочечные стили [BDD](https://ru.wikipedia.org/wiki/BDD_(%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5)) обеспечивают выразительный язык и читаемый стиль, в то время как стиль [TDD](https://ru.wikipedia.org/wiki/%D0%A0%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0_%D1%87%D0%B5%D1%80%D0%B5%D0%B7_%D1%82%D0%B5%D1%81%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5) assert обеспечивает более классическое ощущение.

Пакет Chai устанавливается из npm:

```
npm install chai
```

Поскольку программы становятся все более сложными, вам нужно часто тестировать их, чтобы убедиться, что любой новый код, который вы добавляете, не нарушает первоначальную функциональность программы.

## Изучение работы assert'ов JavaScript

`assert.isNull(value, [message])` утверждает, что `value` является `null`; если это так, возвращает `message`. Пример:

```js
assert.isNull(err, 'никакой ошибки не было');
```

`assert.isNotNull(value, [message])` утверждает, что `value` не является `null`; если это так, возвращает `message`. Пример:

```js
var tea = 'вкусный чай';
assert.isNotNull(tea, 'отлично, пора пить чай!');
```

Во все инструкции assert можно добавить второе необязательное сообщение. Оно будет включено в сообщения об ошибках, если  assert не пройдет. Пример:

```js
var tea = 'вкусный чай';
assert.isNotNull(tea, 'отлично, пора пить чай!', 'что-то пошло не так');
```

## Проверка определения переменной или функции

`assert.isDefined(value, [message])` утверждает, что `value` не является `undefined`.

```js
var tea = 'чашка чая';
assert.isDefined(tea, 'чай уже был определен');
```

`assert.isUndefined(value, [message])` утверждает, что `value` не определено.

```js
var tea;
assert.isUndefined(tea, 'tea не определен');
```

## Использование assert.isOK и assert.isNotOK

`assert.isOk(object, [message])` будет проверять `object` на [истиное значение](https://developer.mozilla.org/ru/docs/Словарь/Truthy)

```js
assert.isOk('everything', 'все в порядке');
assert.isOk(false, 'это не сработает');
```

`assert.isNotOk(object, [message])` будет проверять на [ложное значение](https://developer.mozilla.org/ru/docs/Словарь/Falsy).

```js
assert.isNotOk('everything', 'это не сработает');
assert.isNotOk(false, 'это прокатит');
```

## Тест на истиность

`assert.isTrue(value, [message])` будет тестировать на логическое значение true

```js
var teaServed = true;
assert.isTrue(teaServed, 'чай уже подан');
```

еще примеры

```js
assert.isTrue(true, 'тест пройдет с логическим значением true');
assert.isTrue('true', 'тест не пройдет со строковым значением 'true');
assert.isTrue(1, 'тест не пройдет с числовым значением 1');
```

`assert.isNotTrue(value, [message])` тест пройдет, если задано что угодно, кроме логического значения true.

```js
var tea = 'вкусный чай';
assert.isNotTrue(tea, 'отлично, пора пить чай!');
```

## Использование нестрогого равенства и неравенства

`assert.equal(actual, expected, [message])` утверждает, что объекты actual и expected нестрого равны (`==`).

```js
assert.equal(3, '3', '== преобразует значения в строки');
```

`assert.notEqual(actual, expected, [message])` утверждает, что объекты actual и expected нестрого неравны (`!=`).

```js
assert.notEqual(3, 4, 'эти числа не равны');
```

## Использование строгого равенства и неравенства

`assert.strictEqual(actual, expected, [message])` утверждает, что объекты actual и expected строго равны `===`.

```js
assert.strictEqual(true, true, 'эти логические значения строго равны');
```

`assert.notStrictEqual(actual, expected, [message])` утверждает, что объекты actual и expected строго неравны `!==`.

```js
assert.notStrictEqual(3, '3', 'не является строгим равенством');
```

## Глубокое сравнение с помощью .deepEqual и .notDeepEqual

`assert.deepEqual(actual, expected, [message])` утверждает, что объекты actual и expected полностью равны.

```js
assert.deepEqual({ tea: 'green' }, { tea: 'green' });
```

`assert.notDeepEqual(actual, expected, [message])` утверждает, что объекты actual и expected полностью неравны.

```js
assert.notDeepEqual({ tea: 'green' }, { tea: 'jasmine' });
```

```js
assert.deepEqual( { a: '1', b: 5 } , { b: 5, a: '1' }, "порядок ключей не имеет значения" );
assert.notDeepEqual( { a: [5, 6] }, { a: [6, 5] }, "положение элементов массива имеет значение !!" );
```

## Сравнение свойств двух элементов

`assert.isAbove(valueToCheck, valueToBeAbove, [message])` утверждает, что `valueToCheck` больше (`>`), чем `valueToBeAbove`.

```js
assert.isAbove(5, 2, '5 строго больше чем 2');
assert.isAbove(Math.PI, 3, число ПИ больше чем 3);
```

`assert.isBelow(valueToCheck, valueToBeBelow, [message])` утверждает, что `valueToCheck` меньше (`<`), чем  `valueToBeBelow`.

```js
assert.isBelow(3, 6, '3 меньше, чем 6');
```

`assert.isAtMost(valueToCheck, valueToBeAtMost, [message])` утверждает, что `valueToCheck` меньше или равен (`<=`) `valueToBeAtMost`.

```js
assert.isAtMost(3, 6, '3 меньше или равно 6');
assert.isAtMost(4, 4, '4 меньше или равно 4');
assert.isAtMost('hello'.length , 5);
assert.isAtMost(1 - Math.random(), 1);
```

`assert.isAtLeast(valueToCheck, valueToBeAtLeast, [message])` утверждает, что `valueToCheck` больше или равен (`>=`) `valueToBeAtLeast`.

```js
assert.isAtLeast(5, 2, '5 больше или равно 2');
assert.isAtLeast(3, 3, '3 больше или равно 3');
```

## Проверка на попадание значения в определенный диапазон

`assert.approximately(actual, expected, delta, [message])` утверждает, что `actual` равен `expected`, в пределах диапазона +/- `delta`.

```js
assert.approximately(1.5, 1, 0.5, 'числа в диапазоне');
```

```js
function weirdNumbers(delta) {
    return (1 + delta - Math.random());
}

assert.approximately(weirdNumbers(0.5) , 1, 0.5 );
assert.approximately(weirdNumbers(0.2) , 1, 0.8 );
```

## Проверка значения на массив

`assert.isArray(value, [message])` утверждает, что value является массивом.

```js
var menu = [ 'зеленый', 'чай', 'длинный' ];
assert.isArray(menu, 'какой чай нам нужен?');

assert.isArray('isThisAnArray?'.split(''), 'String.prototype.split() возвращает массив');
```

`assert.isNotArray(value, [message])` утверждает, что value не является массивом.

```js
var menu = 'зеленый|чай|длинный';
assert.isNotArray(menu, 'какой чай нам нужен?');

assert.isNotArray([1,2,3].indexOf(2), 'indexOf возвращает число.');
```

## Нахождение значения в массиве, строке или объекте

`assert.include(haystack, needle, [message])` утверждает, что `haystack` включает в себя `needle`. Может использоваться для утверждения, что значение содержится в массиве, подстрока содержится в строке или подмножество свойств содержится в объекте.

```js
assert.include([1,2,3], 2, 'массив содержит значение');
assert.include('лесной', 'лес', 'строка содержит подстроку');
assert.include({ foo: 'bar', hello: 'universe' }, { foo: 'bar' }, 'объект содержит свойство');
```

Используется строгое равенство (`===`). Если утверждается, что значение включено в массив, выполняется поиск элемента, строго равного данному значению. Если утверждается подмножество свойств в объекте производится поиск объекта по заданным ключам свойств, проверяя, что каждый из них присутствует и строго равен заданному значению свойства. Например:

```js
var obj1 = {a: 1}
  , obj2 = {b: 2};
assert.include([obj1, obj2], obj1);
assert.include({foo: obj1, bar: obj2}, {foo: obj1});
assert.include({foo: obj1, bar: obj2}, {foo: obj1, bar: obj2});
```

`assert.notInclude(haystack, needle, [message])` утверждает, что `haystack` не включает в себя `needle`. Может использоваться для утверждения отсутствия значения в массиве, подстроки в строке или подмножества свойств в объекте.

```js
assert.notInclude([1,2,3], 4, "массив не содержит значение");
assert.notInclude('foobar', 'baz', "строка не содержит подстроку");
assert.notInclude({ foo: 'bar', hello: 'universe' }, { foo: 'baz' }, 'объект не содержит свойство');
```

## Проверка значения на строку

`assert.isString(value, [message])` утверждает, что `value` является строкой.

```js
var teaOrder = 'чай';
assert.isString(teaOrder, 'размещенный заказ');
```

`assert.isNotString(value, [message])` утверждает, что `value` не является строкой.

```js
var teaOrder = 4;
assert.isNotString(teaOrder, 'размещенный заказ');
```

## Использование регулярных выражений для проверки строк

`assert.match(value, regexp, [message])` утверждает, что `value` соответствует регулярному выражению `regexp`.

```js
assert.match('foobar', /^foo/, 'регулярное выражение совпадает');
```

`assert.notMatch(value, regexp, [message])` утверждает, что `value` не соответствует регулярному выражению `regexp`.

```js
assert.notMatch('foobar', /^foo/, 'регулярное выражение не совпадает');
```

```js
var formatPeople = function(name, age) {
    return '# name: ' + name + ', age: ' + age + '\n';
};

var regex =  /^#\sname\:\s[\w\s]+,\sage\:\s\d+\s?$/;
assert.match(formatPeople('John Doe', 35), regex);
assert.notMatch(formatPeople('Paul Smith III', 'twenty-four'), regex);
```

## Проверка наличия свойств у объекта

`assert.property(object, property, [message])` утверждает, что `object` имеет прямое или наследуемое свойство `property`.

```js
assert.property({ tea: { green: 'matcha' }}, 'tea');
assert.property({ tea: { green: 'matcha' }}, 'toString');
```

`assert.notProperty(object, property, [message])` утверждает, что `object` не имеет прямого или наследуемого свойства `property`.

```js
assert.notProperty({ tea: { green: 'matcha' }}, 'coffee');
```

## Проверка значения на соответствие определенному типу структуры данных

`assert.typeOf(value, name, [message])` утверждает, что тип `value` - это `name`, как определено `Object.prototype.toString`.

#typeOf утверждает, что тип значения - это заданная строка, определяемая `Object.prototype.toString`.

```js
assert.typeOf({ tea: 'chai' }, 'object', 'мы имеем объект');
assert.typeOf(['chai', 'jasmine'], 'array', 'мы имеем массив');
assert.typeOf('tea', 'string', 'мы имеем строка');
assert.typeOf(/tea/, 'regexp', 'мы имеем регулярное выражение');
assert.typeOf(null, 'null', 'мы имеем нуль');
assert.typeOf(undefined, 'undefined', 'мы имеем undefined');
```

`assert.notTypeOf(value, name, [message])` утверждает, что тип `value` - это не `name`, как определено `Object.prototype.toString`.

```js
assert.notTypeOf('tea', 'number', 'строки не являются числами');
```

## Проверка, является ли объект экземпляром конструктора

`assert.instanceOf(object, constructor, [message])` утверждает, что `object` является экземпляром `constructor`.

```js
var Tea = function (name) { this.name = name; }
  , chai = new Tea('chai');

assert.instanceOf(chai, Tea, 'chai является экземпляром tea');
```

`assert.notInstanceOf(object, constructor, [message])` утверждает, что `object` не является экземпляром `constructor`.

```js
var Tea = function (name) { this.name = name; }
  , chai = new String('chai');

assert.notInstanceOf(chai, Tea, 'chai не является экземпляром tea');
```

Есть и другие assert'ы, например: `.isNaN()`, `.isBoolean()`, и многие другие. Почти все assert'ы в библиотеке chai имеют свой отрицательный аналог - например: `.isNotBoolean()`. Более полная информация по API assert'ам находится [здесь](https://www.chaijs.com/api/assert/).




