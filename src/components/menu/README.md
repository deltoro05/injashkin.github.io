# Подключение компонента Menu

## Размещение компонента Menu в проекте

Каталог компонента Menu копируем в каталог `src/components/`. Структура каталогов проекта должна быть примерно следующая:

```
|- src
  |- components
    ...
    |+ footer
    |- header
        data.json
        index.js
        header.pug
        header.scss
        README.md
    |- menu
        index.js
        menu.pug
        menu.scss
        README.md
    |+ toggle
    ...
  |+ data
  |+ styles
  ...
```

## Подключение компонента Menu

Обычно компонент Menu используется в компоненте Header. Тогда в скрипт `src/components/header/index.js` компонента Header импортируем скрипт `src/components/menu/index.js` компонента Menu:

**src/components/header/index.js**

```js
import '../menu';

import './header.scss';
```

В миксин `src/components/header/header.pug` компонента Header с помощью `include` включаем миксин компонента Menu и в нужном месте вызываем этот миксин `+menu()`:

**src/components/header/header.pug**

```pug
include ../menu/menu

mixin header(options = {})

  header.header
    .header-content.content

    ...

  +menu()
```

## Подключение стилей

Чтобы подключить стили компонента Menu к проекту нужно в файле `src/pages/home/index.scss` сделать импорт стилей Menu:

```scss
@import '../../components/menu/menu';
```

Также, нужно в с

`src/styles/variables.scss`, в котором определены переменные проекта, в файле `menu.scss` используется импорт

```scss
@import '../../styles/variables';
```

Если структура проекта отличается от указанного выше, то правим путь данного импорта.

## Получение данных

Для проекта подразумевается, что данные для меню хранятся в файле `src/data/menu.json`. Для получения данных из этого файла в файле `src/components/menu/menu.pug` компонента Menu используется строка

```pug
- const menu = require('./data/menu.json')
```

Если структура проекта отличается от указанного выше, то правим путь данного запроса.

## Ресурсы

[Плавная прокрутка к якорю без jQuery](https://ru.stackoverflow.com/questions/676303/Плавная-прокрутка-к-якорю-без-jquery)
