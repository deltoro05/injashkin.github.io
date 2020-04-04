var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var btnData = [{
    id: 'clear',
    symbolKeys: 'AC'
}, {
    id: 'backspace',
    symbolKeys: '<=',
    className: 'operators'
}, {
    id: 'divide',
    symbolKeys: '/',
    className: 'operators'
}, {
    id: 'seven',
    symbolKeys: '7'
}, {
    id: 'eight',
    symbolKeys: '8'
}, {
    id: 'nine',
    symbolKeys: '9'
}, {
    id: 'multiply',
    symbolKeys: 'x',
    className: 'operators'
}, {
    id: 'four',
    symbolKeys: '4'
}, {
    id: 'five',
    symbolKeys: '5'
}, {
    id: 'six',
    symbolKeys: '6'
}, {
    id: 'subtract',
    symbolKeys: '-',
    className: 'operators'
}, {
    id: 'one',
    symbolKeys: '1'
}, {
    id: 'two',
    symbolKeys: '2'
}, {
    id: 'three',
    symbolKeys: '3'
}, {
    id: 'add',
    symbolKeys: '+',
    className: 'operators'
}, {
    id: 'zero',
    symbolKeys: '0'
}, {
    id: 'decimal',
    symbolKeys: '.'
}, {
    id: 'equals',
    symbolKeys: '='
}];

function App() {
    var _React$useState = React.useState({ allVal: '0' }),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        stateAll = _React$useState2[0],
        setAll = _React$useState2[1];

    var _React$useState3 = React.useState({ curVal: '0' }),
        _React$useState4 = _slicedToArray(_React$useState3, 2),
        stateValue = _React$useState4[0],
        setValue = _React$useState4[1];

    var handleKey = function handleKey(symbol) {
        var isDigit = /[0-9]/.test(symbol);
        var isOperator = /[x/+-]/.test(symbol);
        var digit, operator;
        if (isDigit) {
            digit = symbol;
        }

        if (isOperator) {
            operator = symbol;
        }

        switch (symbol) {
            case 'AC':
                setAll({ allVal: '0' });
                setValue({ curVal: '0' });
                break;
            case digit:
                if (stateValue.curVal.length < 22 && stateValue.curVal !== 'Digit Limit Met') {
                    setAll({
                        allVal: stateAll.allVal === '0' || /=/g.test(stateAll.allVal) //если выражение равно нулю или содержит знак равно
                        ? symbol //то выражение заменяем на введенный с клавиатуры символ
                        : stateAll.allVal + symbol //иначе, введенный символ добавляем к выражению
                    });
                    setValue({
                        curVal: stateValue.curVal === '0' || /[x/+-]/.test(stateValue.curVal) || /=/g.test(stateAll.allVal) ? symbol : stateValue.curVal + symbol
                    });
                } else {
                    if (stateValue.curVal !== 'Digit Limit Met') {
                        var prevVal = stateValue.curVal;
                        setValue({ curVal: 'Digit Limit Met' });
                        setTimeout(function () {
                            return setValue({ curVal: prevVal });
                        }, 1000);
                    }
                }
                break;
            case operator:
                setAll({
                    allVal: /=/g.test(stateAll.allVal) // иначе, если в выражении есть знак "равно"
                    ? stateAll.allVal.match(/[-0-9\.e\+-]+$/) + symbol //то выделяем после "равно" минус(если есть) и число и добавляем к числу введенный оператор
                    : /\.$/.test(stateAll.allVal) //иначе, если есть точка в конце выражения
                    ? stateAll.allVal.slice(0, -1) + symbol //то удаляем точку и добавляем в конец выражения введенный оператор
                    : /[x/+]$/.test(stateAll.allVal) && symbol === '-' //иначе, если в конце выражения есть "x", "/" или "+" и введенный оператор равен "-"
                    ? stateAll.allVal + '-' //то в конец выражения добавляем оператор "-"
                    : /[-]$/.test(stateAll.allVal) && symbol === '-' //иначе, если в конце выражения "-" и введенный оператор равен "-"
                    ? stateAll.allVal //то ничего не меняем
                    : /[x/+][-]$/.test(stateAll.allVal) && symbol !== '-' //иначе, если в конце выражения есть любой из операторов "x", "/", "+" или "-" и введенный оператор не равен "-"
                    ? stateAll.allVal.slice(0, -2) + symbol //то в конце выражения удаляем два оператора и добавляем введенный оператор
                    : /[x/+-]$/.test(stateAll.allVal) && symbol !== '-' //иначе, если в конце "x", "/", "+" или "-" и введенный оператор "-"
                    ? stateAll.allVal.slice(0, -1) + symbol //то удаляем "x", "/", "+" или "-" и добавляем в конец выражения введеннный оператор
                    : stateAll.allVal + symbol //иначе, добаляем введенный оператор 
                });
                setValue({ curVal: symbol });
                break;
            case '.':
                setAll({
                    allVal: /=/g.test(stateAll.allVal) //если в выражении есть знак "равно"
                    ? '0.' //то выражение заменяем на ноль с точкой
                    : /[x/+-]$/.test(stateAll.allVal) //иначе, если в конце выражения есть любой из операторов "x", "/", "+" или "-"
                    ? stateAll.allVal + '0.' //то к выражению добавляем ноль с точкой
                    : /\./g.test(stateAll.allVal.match(/[0-9]*\.?[0-9]*$/)[0]) ? stateAll.allVal : stateAll.allVal + '.'
                });
                setValue({
                    curVal: /=/g.test(stateAll.allVal) //если в выражении есть знак "равно"
                    ? '0.' //то значение заменяем на ноль с точкой
                    : /[x/+-]/.test(stateValue.curVal) //иначе, если в текущем значении есть любой из операторов "x", "/", "+" или "-"
                    ? '0.' : /\./g.test(stateValue.curVal) //то на место оператора ставится ноль с точкой, иначе, проверяется наличие точки
                    ? stateValue.curVal : stateValue.curVal + '.' //если точка есть, то значение не меняется, если же точки нет, то к значению добавляется точка
                });
                break;
            case '=':
                setAll({
                    allVal: /[=]/g.test(stateAll.allVal) || /[x/+-]$/.test(stateAll.allVal) //если в выражении есть "=" или в конце выржения присутствует любой из операторов "x", "/", "+" или "-"
                    ? stateAll.allVal //то выражение не меняется
                    : /[x/+-]/g.test(stateAll.allVal) //иначе, если в выражении присутствует любой из операторов "x", "/", "+" или "-"
                    ? stateAll.allVal + '=' + eval(stateAll.allVal.replace(/x/g, '*')) //то к выражению добавляем знак "равно" и результат вычислений
                    : stateAll.allVal //иначе выражение не меняется
                });

                setValue({
                    curVal: /[=]/g.test(stateAll.allVal) || /[x/+-]/.test(stateValue.curVal) || stateValue.curVal === '0.' //если в выражении есть "=", или если в текущем значении есть любой из операторов "x", "/", "+", "-", или текущее значение равно нулю с точкой
                    ? stateValue.curVal //то значение не меняется
                    : /[x/+-]/g.test(stateAll.allVal) //иначе, если в выражении есть любой из операторов "x", "/", "+" или "-"
                    ? '' + eval(stateAll.allVal.replace(/x/g, '*')) //показываем результат вычислений (пустые кавычки приводят результат вычислений к строчному типу)
                    : stateValue.curVal //иначе, значение не меняется
                });
                break;
            case '<=':
                setAll({ allVal: backspace(stateAll.allVal) });
                setValue({ curVal: backspace(stateAll.allVal, stateValue.curVal) });
        }

        function backspace(arg1) {
            var arg2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : arg1;

            return (/[=]/g.test(arg1) //если в выражении есть "="
                ? '0' //то обнуляем выражение
                : arg2.length === 1 //иначе, если длина строки выражения равна одному символу
                ? '0' //то обнуляем выражение
                : arg2.slice(0, -1) //иначе, удаляем последний символ

            );
        }
    };

    return React.createElement(
        'div',
        null,
        React.createElement(
            'div',
            { className: 'calc' },
            React.createElement(Display, {
                allVal: stateAll.allVal,
                curVal: stateValue.curVal
            }),
            React.createElement(
                'div',
                { className: 'padButtons' },
                btnData.map(function (item) {
                    var double = '';
                    if (item.symbolKeys === 'AC') {
                        double = ' doubleW';
                    }
                    if (item.symbolKeys === '+') {
                        double = ' doubleH';
                    }
                    return React.createElement(Button, {
                        key: item.id,
                        double: double,
                        id: item.id,
                        symbolKeys: item.symbolKeys,
                        handleKey: handleKey,
                        className: item.className
                    });
                })
            )
        ),
        React.createElement(
            'div',
            { className: 'foter' },
            'Coder: injashkin. ',
            React.createElement('br', null),
            'Source code: ',
            React.createElement(
                'a',
                { target: '_blank', href: 'https://github.com/injashkin/Javascript-Calculator' },
                'GitHub.'
            ),
            React.createElement('br', null),
            'Demo: ',
            React.createElement(
                'a',
                { target: '_blank', href: 'http://projects.jinv.ru/projects/calculator/index.html' },
                'projects.jinv.ru'
            )
        )
    );
}

function Display(props) {
    return React.createElement(
        'div',
        { className: 'displayWrap' },
        React.createElement(
            'div',
            { className: 'expression' },
            props.allVal
        ),
        React.createElement(
            'div',
            { id: 'display', className: 'display' },
            props.curVal
        )
    );
}

function Button(props) {
    function handleKey() {
        props.handleKey(props.symbolKeys);
    }

    return React.createElement(
        'button',
        {
            className: 'buttons' + props.double + ' ' + props.className,
            id: props.id,
            onClick: handleKey
        },
        props.symbolKeys
    );
}

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));