---
title: Руководство по Gatsby. Введение в стилизацию
description: "Как применять стили в генераторе статических сайтов Gatsby. Описаны способы стилизации с помощью CSS файлов, CSS модулей и CSS-in-JS"
date: "2020-02-28"
---

Данная статья - является моим вольным переводом официального источника: https://www.gatsbyjs.org/tutorial/part-two/

Добро пожаловать во вторую часть учебника Gatsby!

## Что в этой статье?

Здесь вы изучите варианты оформления веб-сайтов Gatsby и глубже погрузитесь в использование компонентов React для создания сайтов.

## Использование глобальных стилей

Каждый сайт имеет какой-то глобальный стиль. Он включает в себя такие вещи, как типографика сайта и фоновые цвета. Эти стили задают общее ощущение объекта - так же, как цвет и текстура стены задают общее ощущение комнаты.

### Создание глобальных стилей с помощью стандартных CSS-файлов

Один из самых простых способов добавления глобальных стилей на сайт -- это использование глобальной таблицы стилей `.css`.

#### Создание нового Gatsby сайта

Начните с создания нового сайта Gatsby. Возможно, лучше всего (особенно если вы новичок в командной строке) закрыть окна терминала, которые вы использовали для [части первой](/tutorial/part-one/), и начать новый сеанс терминала для части второй.

Откройте новое окно терминала, создайте новый сайт "hello world" Gatsby в каталоге под названием `tutorial-part-two`, а затем перейдите в этот новый каталог:

```shell
gatsby new tutorial-part-two https://github.com/gatsbyjs/gatsby-starter-hello-world
cd tutorial-part-two
```

Теперь у вас есть новый сайт Gatsby (основанный на Gatsby стартере "hello world") со следующей структурой:

```text
├── package.json
├── src
│   └── pages
│       └── index.js
```

#### Добавление стилей в файл css

1. Создайте файл `.css` в новом проекте:

```shell
cd src
mkdir styles
cd styles
touch global.css
```

Теперь у вас должна быть такая структура:

```text
├── package.json
├── src
│   └── pages
│       └── index.js
│   └── styles
│       └── global.css
```

2. Определим некоторые стили в файле `global.css`:

```css:title=src/styles/global.css
html {
  background-color: lavenderblush;
}
```

> Примечание: размещение файла css в папке `/src/styles/` является произвольным.

#### Включение таблицы стилей в `gatsby-browser.js`

1. Создайте `gatsby-browser.js`

```shell
cd ../..
touch gatsby-browser.js
```

Файловая структура вашего проекта теперь должна выглядеть следующим образом:

```text
├── package.json
├── src
│   └── pages
│       └── index.js
│   └── styles
│       └── global.css
├── gatsby-browser.js
```

>  Файл `gatsby-browser.js` - один из немногих специальных файлов, которые ищет и использует (если они существуют) Gatsby. Здесь имя файла **должно** быть именно таким. Если вы хотите узнать больше, просмотрите [эти документы](https://www.gatsbyjs.org/docs/browser-apis/).

2. Импортируйте недавно созданную таблицу стилей в файл `gatsby-browser.js`:

```javascript:title=gatsby-browser.js
import "./src/styles/global.css"

// or:
// require('./src/styles/global.css')
```

> Примечание: на CommonJS (`require`) и ES Module (`import`)синтаксис работы здесь. Если вы не уверены, что выбрать, `import` обычно является хорошим значением по умолчанию. При работе с файлами, которые однако выполняются только в среде Node.js (как `gatsby-node.js`), `require` нужно будет использовать.

3. Запустите сервер разработки:

```shell
gatsby develop
```

Если вы посмотрите на свой проект в браузере, вы увидите лавандовый фон, примененный к стартеру "hello world":

![Lavender Hello World!](global-css.png)

> Совет: эта часть урока была посвящена самому быстрому и простому способу начать стилизацию сайта Gatsby - прямому импорту стандартных CSS-файлов с помощью `gatsby-browser.js`. В большинстве случаев лучший способ добавить глобальные стили - это использовать общий компонент макета. [Ознакомьтесь с документами](https://www.gatsbyjs.org/docs/global-css/) для получения дополнительной информации об этом подходе.

## Использование CSS в области компонентов

До сих пор мы говорили о более традиционном подходе использования стандартных таблиц стилей css. Теперь мы поговорим о различных методах модулирования CSS для решения проблемы стилизации в компонентно-ориентированном виде.

### CSS модули

Давайте рассмотрим **CSS модули**. Цитирую из
[the CSS Module homepage](https://github.com/css-modules/css-modules):

> **CSS модуль** - это CSS-файл, в котором все имена классов и имена анимаций
> по умолчанию ограничены локально.

CSS модули очень популярны, потому что они позволяют писать CSS нормально, но с гораздо большей безопасностью. Инструмент автоматически генерирует уникальные имена классов и анимаций, поэтому вам не нужно беспокоиться о коллизиях имен селекторов.

Gatsby работает из коробки с модулями CSS. Этот подход настоятельно рекомендуется для тех, кто новичок в строительстве с Gatsby (и React в целом).

#### Создание новой страницы с помощью CSS модулей

В этом разделе вы создадите новый компонент страницы и стиль этого компонента страницы с помощью модуля CSS.

Сначала создайте новый компонент `Container`.

1. Создайте новый каталог в `src/components`, а затем в этом новом каталоге создайте файл `container.js` и в него вставьте следующее:

```jsx:title=src/components/container.js
import React from "react"
import containerStyles from "./container.module.css"

export default ({ children }) => (
  <div className={containerStyles.container}>{children}</div>
)
```

Обратите внимание, что вы импортировали файл модуля css с именем `container.module.css`. Давайте создадим этот файл сейчас.

2. В том же каталоге (`src/components`) создайте файл `container.module.css` и вставьте следующее:

```css:title=src/components/container.module.css
.container {
  margin: 3rem auto;
  max-width: 600px;
}
```

Вы заметили, что имя файла заканчивается на `.module.css` вместо обычного `.css`. Именно так вы сообщаете Gatsby, что этот CSS-файл должен обрабатываться как модуль CSS, а не как простой CSS.

3. Создайте новый компонент страницы, создав файл по адресу
   `src/pages/about-css-modules.js`:

```jsx:title=src/pages/about-css-modules.js
import React from "react"

import Container from "../components/container"

export default () => (
  <Container>
    <h1>About CSS Modules</h1>
    <p>CSS Modules are cool</p>
  </Container>
)
```

А теперь, если вы посетите `http://localhost:8000/about-css-modules/`, ваша страница должна выглядеть примерно так:

![Page with CSS module styles](css-modules-basic.png)

В этом разделе вы создадите список людей с именами, аватарами и краткими биографиями. Вы создадите компонент `<User />` и оформите его с помощью CSS модуля.

1. Создайте файл для CSS по адресу `src/pages/about-css-modules.module.css`.

2. Вставьте в новый файл следующее:

```css:title=src/pages/about-css-modules.module.css
.user {
  display: flex;
  align-items: center;
  margin: 0 auto 12px auto;
}

.user:last-child {
  margin-bottom: 0;
}

.avatar {
  flex: 0 0 96px;
  width: 96px;
  height: 96px;
  margin: 0;
}

.description {
  flex: 1;
  margin-left: 18px;
  padding: 12px;
}

.username {
  margin: 0 0 12px 0;
  padding: 0;
}

.excerpt {
  margin: 0;
}
```

3. Импортируйте новый файл `src/pages/about-css-modules.module.css` в страницу `about-css-modules.js`, которую вы создали ранее, отредактировав первые несколько строк файла следующим образом:

```javascript:title=src/pages/about-css-modules.js
import React from "react"
// highlight-next-line
import styles from "./about-css-modules.module.css"
import Container from "../components/container"

// highlight-next-line
console.log(styles)
```

Код `console.log(styles)` будет выводить полученный импорт, чтобы вы могли видеть результат обработки файла `./about-css-modules.module.css`. Если вы откроете консоль разработчика (например, с помощью инструментов разработчика Firefox или Chrome, часто с помощью клавиши F12) в вашем браузере, вы увидите:

![Import result of CSS module in console](css-modules-console.png)

Если вы сравните это с вашим CSS-файлом, вы увидите, что каждый класс является сейчас ключевым в импортированный объект, указывая на длинную строку, например `avatar` указывает на `src-pages----about-css-modules-module---avatar---2lRF7`. Это имена классов, которые генерируют модули CSS. Они гарантированно будут уникальными на вашем сайте. И поскольку вы должны импортировать их, чтобы использовать классы, никогда не возникает вопроса о том, где используется некоторый CSS.

4. Создайте новый компонент `<User />`, встроенный в страницу `about-css-modules.js` компонента. Измените `about-css-modules.js` следующим образом:

```jsx:title=src/pages/about-css-modules.js
import React from "react"
import styles from "./about-css-modules.module.css"
import Container from "../components/container"

console.log(styles)

// highlight-start
const User = props => (
  <div className={styles.user}>
    <img src={props.avatar} className={styles.avatar} alt="" />
    <div className={styles.description}>
      <h2 className={styles.username}>{props.username}</h2>
      <p className={styles.excerpt}>{props.excerpt}</p>
    </div>
  </div>
)
// highlight-end

export default () => (
  <Container>
    <h1>About CSS Modules</h1>
    <p>CSS Modules are cool</p>
    {/* highlight-start */}
    <User
      username="Jane Doe"
      avatar="https://s3.amazonaws.com/uifaces/faces/twitter/adellecharles/128.jpg"
      excerpt="I'm Jane Doe. Lorem ipsum dolor sit amet, consectetur adipisicing elit."
    />
    <User
      username="Bob Smith"
      avatar="https://s3.amazonaws.com/uifaces/faces/twitter/vladarbatov/128.jpg"
      excerpt="I'm Bob Smith, a vertically aligned type of guy. Lorem ipsum dolor sit amet, consectetur adipisicing elit."
    />
    {/* highlight-end */}
  </Container>
)
```

> Совет: как правило, если вы используете компонент в нескольких местах на сайте, он должен находиться в собственном файле модуля в каталоге `components`. Но если он используется только в одном файле, создайте его встроенным.

Готовая страница теперь должна выглядеть так:

![User list page with CSS modules](css-modules-userlist.png)

### CSS-in-JS

CSS-in-JS является компонентно-ориентированным подходом моделирования. Как правило, это шаблон, где [CSS составляется встроенным с помощью JavaScript](https://reactjs.org/docs/faq-styling.html#what-is-css-in-js).

#### Использование CSS-in-JS с Gatsby

Существует множество различных библиотек CSS-in-JS, и многие из них уже имеют плагины Gatsby. Мы не будем рассматривать пример CSS-in-JS в этом начальном руководстве, но мы рекомендуем вам [изучить]https://www.gatsbyjs.org/docs/styling/, что может предложить экосистема. Существуют мини-учебники для двух библиотек, в частности, [Emotion]https://www.gatsbyjs.org/docs/emotion/ и [Styled Components] https://www.gatsbyjs.org/docs/styled-components/.

#### Рекомендуемое чтение о CSS-in-JS

Если вы заинтересованы в дальнейшем чтении, ознакомьтесь с презентацией [Christopher "vjeux" Chedeau's 2014 presentation that sparked this movement](https://speakerdeck.com/vjeux/react-css-in-js), а также [Mark Dalgleish's more recent post "A Unified Styling Language"](https://medium.com/seek-blog/a-unified-styling-language-d0c208de2660).

### Другие параметры CSS

Gatsby поддерживает практически все возможные варианты стилей (если еще нет плагина для вашего любимого варианта CSS, [пожалуйста, внесите свой вклад!]https://www.gatsbyjs.org/contributing/how-to-contribute/

- [Typography.js]https://www.gatsbyjs.org/packages/gatsby-plugin-typography/
- [Sass]https://www.gatsbyjs.org/packages/gatsby-plugin-sass/
- [JSS]https://www.gatsbyjs.org/packages/gatsby-plugin-jss/
- [Stylus]https://www.gatsbyjs.org/packages/gatsby-plugin-stylus/
- [PostCSS]https://www.gatsbyjs.org/packages/gatsby-plugin-postcss/

## Что будет дальше?

Теперь перейдите к [третьей части руководства](https://www.gatsbyjs.org/tutorial/part-three/), где вы узнаете о плагинах и компонентах layout Gatsby.