---
title: Как заставить работать вместе Pug 3, pug-loader и Webpack 5
create: 12.10.2022
---

Когда я настраивал webpack 5, мне не удалось запустить пакет Pug 3, так как загрузчик pug-loader может работать только с пакетом Pug 2. По всей видимости, разработчики забросили пакет pug-loader. Последнее обновление пакета было в 2018. Поэтому, если кому очень надо, предлагаю вариант, как подружить pug-loader и Pug 3.

> - Сравнительно недавно появился новый пакет [pug-plugin](https://www.npmjs.com/package/pug-plugin), который работает с Webpack 5 и Pug 3.

В терминале введем команду:

```
git clone https://github.com/pugjs/pug-loader.git
```

В `Домашней папке` будет создан каталог `pug-loader` в котором будет исходный код загрузчика.

Откроем файл `pug-loader/package.json` в редакторе кода и изменим версию пакета в поле "version":

- "version": "2.4.0", заменим на "version": "2.5.0",

в секции "dependencies"

- "pug-walk": "^1.0.0", заменим на "pug-walk": "^2.0.0",

в секциях "peerDependencies" и "devDependencies"

- "pug": "^2.0.0", заменим на "pug": "^3.0.2",

В результате, должно получиться так:

```json
{
  "name": "pug-loader",
  "version": "2.5.0",
  "author": "Tobias Koppers @sokra",
  "description": "Pug loader module for webpack",
  "maintainers": ["Timothy Gu <timothygu99@gmail.com>"],
  "dependencies": {
    "loader-utils": "^1.1.0",
    "pug-walk": "^2.0.0",
    "resolve": "^1.1.7"
  },
  "peerDependencies": {
    "pug": "^3.0.2"
  },
  "devDependencies": {
    "mocha": "*",
    "pug": "^3.0.2",
    "should": "*"
  },
  "scripts": {
    "test": "mocha -R spec"
  },
  "repository": {
    "type": "git",
    "url": "git://github.com/pugjs/pug-loader.git"
  },
  "license": "MIT"
}
```

Сохраним файл и закроем редактор кода. Затем в окне терминала перейдем в каталог загрузчика. Для этого в окне терминала введем следующее:

```
cd pug-loader
```

Установим пакет:

```
npm i
```

Теперь, прогоним тесты:

```
npm run test
```

Если везде зеленые галочки, то двигаемся дальше.

Создадим глобальную символическую ссылку для pug-loader:

```
sudo npm link
```

Введем пароль администратора

Проверим существование глобальной символической ссылки для pug-loader:

```
npm list -g
```

Будет показано что-то такое:

```
/usr/lib
├── corepack@0.12.1
├── md-pug-to-html@2.2.2 -> ./../../home/user/md-pug-to-html
├── npm@8.15.0
└── pug-loader@2.5.0 -> ./../../home/user/pug-loader
```

Последняя строка показывает установленную ссылку. Теперь перейдем в проект, в котором нам нужно установить pug-loader. Если проект находится в той же `Домашней папке`, то для этого в терминале введем команду:

```
cd ../our-project
```

Подключим pug-loader в качестве зависимости в проекте. Для этого в терминале введем следующее:

```
npm link pug-loader
```

Это практически тоже самое, что установка пакета в проект по команде `npm i pug-loader`.

> Примечание: После каждой установки какого-нибудь npm модуля в проект, у меня нарушалась работа модуля `pug-loader`, поэтому, приходилось каждый раз переустанавливать ссылку командой `npm link pug-loader`

Чтобы удалить глобальную символическую ссылку на pug-loader из данного проекта, нужно ввести:

```
npm unlink pug-loader
```
