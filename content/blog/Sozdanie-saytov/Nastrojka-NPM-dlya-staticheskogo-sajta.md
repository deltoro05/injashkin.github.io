---
title: "Настройка среды разработки из NPM модулей для создания статического сайта"
date: 2022-08-09
description: "Установка и настройка сборки из NPM модулей, которая позволит создавать статические страницы сайта используя шаблонизатор Pug, препроцессор Sass, язык JavaScript и разметку Markdown"
---

## О чем статья

В статье показано, как настроить собственную сборку из модулей NPM, которая является полным аналогом сборки [npm-for-frontend](https://github.com/injashkin/npm-for-frontend). Эта сборка позволит создавать статические страницы сайта, а именно:

- Создавать разметку с помощью шаблонизатора Pug.
- Стилизовать страницы с помощью препроцессора Sass.
- Наполнять содержимое страниц сайта с помощью разметки Markdown.
- Добавлять картинки, значки, шрифты.
- Добавлять интерактив на сайт используя самые последние достижения языка JavaScript и при этом не переживать, что какая-то новая функция не будет распознана старым браузером.

Сама сборка будет выполнять следующие функции:

- Автоматически преобразовывать Pug разметку и разметку Markdown в понятный для браузеров HTML
- Автоматически преобразовывать Sass стили и объединять их в один файл `index.css`.
- Все скрипты будут транспилированы и упакованы в один файл `index.js`.
- Автоматически оптимизировать картинки, значки, шрифты для увеличения быстродействия готового сайта.

## Быстрый запуск проекта

Чтобы выполнять дальнейшие действия у нас на компьютере должен быть установлен [Node.js](https://nodejs.org/) и NPM.

Откроем терминал и создадим каталог `my-project` нашего будущего проекта, и сразу перейдем в него:

```
mkdir my-project
cd my-project
```

Теперь, если нам нужна система контроля версий Git, то выполним два простых шага, сначала, инициализируем Git:

```
git init
```

Затем создадим для Git файл `.gitignore`. В этом файле будем указывать игнорируемые файлы и каталоги, которые не должны попадать в коммиты. Запишем в этом файле следующее:

```.gitignore
/node_modules
```

С настройками Git в этом проекте покончено. Теперь не забываем, хотя бы иногда, делать коммиты.

Инициализируем npm:

```
npm init -y
```

Будет создан файл `package.json` с настройками по умолчанию (опция -y). Наиболее полную информацию о файле package.json можно прочитать в [документации по npm](https://docs.npmjs.com/cli/v8/configuring-npm/package-json).

## Подключение и настройка шаблонизатора Pug

В настоящее время мало кто верстает на чистом HTML. Придуманы более удобные для написания языки и инструменты, которые эти языки преобразуют в HTML. Одним из таких инструментов является [шаблонизатор Pug](https://pugjs.org/).

Шаблонизатор Pug имеет свой, более удобный синтаксис, на котором пишется разметка. После компиляции синтаксис Pug превращается в HTML код.

Установим pug для командной строки:

```
npm i -D pug-cli
```

Вместо опции `i` можно написать `install`. Опция `-D` указывает, что устанавливаемый пакет нужен только для разработки и не будет использоваться в производственной сборке. Поэтому, устанавливаемый пакет будет прописан в секции `"devDependencies": {...}` файла `package.json`.

В результате будет создан каталог `node_modules` и файл `package-lock.json`. Каталог `node_modules` содержит все установленные зависимости проекта. Обычно этот каталог не рекомендуется включать в репозитории, что мы и сделали, проигнорировав его в файле `.gitignore`. Файл `package-lock.json` хранит записи о точных версиях установленных зависимостей.

Добавим в секцию `"scripts"` файла `package.json` скрипт с именем `"pug"` (знак плюс `+` дальше по тексту будет лишь указывать на добавленные строки кода):

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
+   "pug": "pug --pretty -w src/index.pug -o dist",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "pug-cli": "^1.0.0-alpha6"
  }
}
```

- Опция `--pretty` (или `-P`) отключает минификацию, что дает на выходе красиво оформленную разметку HTML. По умолчанию, pug переводит код в минимизированный HTML, из которого вырезаны пробелы между тегами, табуляция и перевод строк.
- Ключ `-w` (или `--watch`) заставляет Pug следить за изменениями в файлах с расширениями `.pug` и как только мы сохраняем измененный файл, то Pug сразу перекомпилирует исходники.
- Путь `src/index.pug` указывает на входной файл. Этот файл после компиляции будет на выходе с расширением `.html`. Если мы укажем каталог, то все файлы с расширением `.pug` этого каталога появятся на выходе с расширением `.html`, что не всегда бывает нужно.
- Ключ `-o` (или `--out`) указывает, что откомпилированные файлы будут выводится в другой каталог. Этот каталог нужно указать сразу после ключа, в нашем случае это каталог `./dist`. Если такого каталога не существует, он будет создан.
- `dist` - это каталог, в который будут компилироваться файлы. Можно указать имя конкретного файла, который должен получится на выходе, например, `dist/index.html`. Тогда ключ `-o` следует опустить, иначе имя файла будет воспринято как имя каталога. К тому же, все каталоги, указанные в пути должны существовать, так как без ключа `-o` каталоги не создаются.

Более подробно об опциях командной строки можно узнать в [репозитории pug-cli](https://github.com/pugjs/pug-cli)

После установки и конфигурации Pug шаблонизатора проверим его в работе. Для этого создадим в корне проекта каталог `src`, а в нем создадим файл `index.pug` со следующим содержимым:

**./src/index.pug**

```pug
doctype html
html
  head
    meta(charset='utf-8')
    meta(name='viewport' content='width=device-width, initial-scale=1.0')
    title= 'Быстрый запуск Pug'
  body
    h1.name= 'Код написан в шаблонизаторе Pug!'
```

Запустим в терминале команду:

```
npm run pug
```

Будет создан каталог `./dist`, а в нем файл `index.html`, который будет содержать откомпилированный HTML:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Быстрый запуск Pug</title>
  </head>
  <body>
    <h1 class="name">Код написан в шаблонизаторе Pug!</h1>
  </body>
</html>
```

Теперь мы можем открыть в браузере файл `./dist/index.html` и увидим следующее:

```
Код написан в шаблонизаторе Pug!
```

Добавим в шаблон миксин. Для этого создадим в каталоге `src` каталог `components`, а в нем файл `button.pug` со следующим содержимым:

```pug
mixin button
  button.button= 'Кнопка добавлена с помощью миксина'
```

Не забываем сохранить.

В файл `src/index.pug` подключим файл `button.pug` с помощью `include` и вызовем в нужном месте как миксин `+button()`:

```pug
include components/button.pug

doctype html
html
  head
    meta(charset='utf-8')
    meta(name='viewport' content='width=device-width, initial-scale=1.0')

    title= 'Быстрый запуск Pug'
  body
    h1.name= 'Код написан в шаблонизаторе Pug!'
    +button()
```

После сохранения файла перезагрузим страницу браузера и мы увидим заголовок, а под ним кнопку:

```
 _____________
|             |
| Изображение |
|_____________|

```

Ура!. Мы настроили Pug.

## Настройка локального сервера BrowserSync

После очередного изменения кода, чтобы увидеть откомпилированный результат, нужно каждый раз вручную обновлять страницу браузера. Это очень быстро надоедает. Для того, чтобы после сохранения редактируемого файла браузер автоматически обновлял страницу можно использовать локальный сервер, такой как [BrowserSync](https://browsersync.io/docs/command-line) или [Pug Server](https://github.com/ctrlaltdev/pug-server). Мы будем использовать сервер BrowserSync, установим его:

```
npm i -D browser-sync
```

Добавим в файл `package.json` настройку, отмеченную знаком `+`:

```json
  "scripts": {
    "pug": "pug --pretty -w src/index.pug -o dist",
+   "serve": "browser-sync dist -w",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

Данный скрипт будет запускать сервер, а сервер будет наблюдать за всеми файлами в каталоге `./dist`. Скрипт работает в browser-sync версии 2.23.0 и выше. Аналог данного скрипта, который будет работать в browser-sync любой версии приведен ниже:

```json
  "scripts": {
    ...
    "serve": "browser-sync start -s dist -f dist"
  },
```

Откроем еще одно окно терминала, так как в первом окне у нас запущен Pug, который работает в режиме наблюдения за файлами. Выполним во втором окне терминала команду:

```
npm run serve
```

В результате, откроется браузер, в котором мы увидим нашу страницу.

Теперь, каждый раз, когда в каталоге `dist` происходят какие-либо изменения сервер будет автоматически обновлять браузер.

## Последовательный и параллельный запуск скриптов с помощью npm-run-all

Мы видим один неприятный момент. Для того, чтобы запустить сервер и шаблонизатор Pug в режиме наблюдения мы должны каждый раз открывать сначала одно окно терминала и выполнять команду `npm run pug`, затем открывать другое окно и выполнять `npm run serve`. В дальнейшем, нам понадобится запускать в режиме наблюдения препроцессор Sass, постпроцессор Postcss, компилятор Babel и др. Если на каждую такую задачу открывать окно терминала и запускать команду типа `npm run *`, то это будет рутина.

Чтобы упростить процесс одновременного запуска нескольких npm-скриптов можно воспользоваться пакетами [concurrently](https://www.npmjs.com/package/concurrently) или [npm-run-all](https://github.com/mysticatea/npm-run-all). Здесь мы воспользуемся инструментом `npm-run-all`. Сначала установим его:

```
npm i -D npm-run-all
```

Затем отредактируем файл `package.json`:

```json
  "scripts": {
+   "watch:pug": "pug --pretty -w src/index.pug -o dist",
+   "watch:serve": "browser-sync dist -w",
+   "dev": "npm-run-all -p watch:*",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

Мы добавили скрипт `"dev": "npm-run-all -p watch:*"`, в котором опция `-p` (или `--parallel`) указывает на параллельное выполнение скриптов, следующих за этой опцией. У нас за этой опцией следует шаблон `watch:*`. Это значит, что параллельно будут выполнятся все скрипты, у которых в названии есть `watch:`. Поэтому, мы изменили имена скриптов: имя `"pug"` заменили на `"watch:pug"`; имя `"serve"` заменили на `"watch:serve"`.

Более подробно об опциях командной строки можно узнать из [документации инструмента npm-run-all](https://github.com/mysticatea/npm-run-all/blob/master/docs/npm-run-all.md)

Теперь, закроем все окна терминала кроме одного, остановим выполнение предыдущей команды в терминале сочетанием клавиш `Ctrl+C` и запустим следующую команду:

```
npm run dev
```

Мы увидим, что компилятор Pug и сервер работают. И для этого нам понадобилось одно окно терминала и всего одна команда.

Возможно, кто-то скажет, что в NPM есть операторы `&` и `&&`, с помощью которых можно выполнить все тоже самое. Но оператор `&` не работает в Windows `cmd.exe`, а `npm-run-all -p` там отлично работает.

## Установка и настройка rimraf для очистки каталогов

Перед началом компиляции полезно будет очищать каталог `dist` от предыдущих файлов. Для этого будем использовать пакет `rimraf`, который является аналогом UNIX команды `rm -rf`, но работает в любой системе, которая поддерживает NPM. Установим этот пакет:

```
npm i -D rimraf
```

В файл `package.json` внесем правки:

```json
  "scripts": {
+   "clean": "rimraf dist",
+   "pug": "pug --pretty src/index.pug -o dist",
    "watch:pug": "pug --pretty -w src/index.pug -o dist",
    "watch:serve": "browser-sync dist -w",
+   "dev": "npm-run-all clean pug -p watch:*",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

Мы создали скрипт `"clean"` для запуска rimraf и указали в скрипте `"dev"`, чтобы скрипт `"clean"` запускался самым первым. Так как скрипт `"clean"` удаляет каталог `dist`, то при параллельном запуске `pug` и `browser-sync` последний выдает ошибку. Поэтому, мы добавили дополнительный скрипт `"pug"` без режима наблюдения.

Теперь выполним в терминале команду:

```
npm run dev
```

`npm-run-all` выполнил сначала скрипт `"clean"`, потом скрипт `"pug'`, а после параллельно запустил два скрипта: `"watch:pug"` и `"watch:serve"`.

## Установка и настройка препроцессора node-sass и постпроцессора PostCSS

Для написания стилей мы будем использовать препроцессор [Sass](https://github.com/sass/node-sass#command-line-interface). Он позволяет нам использовать переменные, вложенности, миксины, наследование, математические операторы и др.

При написании стилей мы не хотим задумываться о префиксах, которые необходимы для корректной работы некоторых браузеров, а также, мы уже сегодня хотим использовать современный CSS не думая о его поддержке всеми браузерами. В этом нам поможет PostCSS с плагином [PostCSS Preset Env](https://github.com/csstools/postcss-plugins/tree/main/plugin-packs/postcss-preset-env). Этот плагин преобразовывает современный CSS в тот CSS, который понятен большинству браузеров, а также расставляет префиксы при необходимости.

Нам еще понадобится [postcss-cli](https://github.com/postcss/postcss-cli), чтобы запускать PostCSS из командной строки. Для начала установим все необходимые пакеты:

```
npm i -D node-sass postcss postcss-cli postcss-preset-env
```

Добавим в файл `package.json` следующий код:

```json
  "scripts": {
+   "clean": "rimraf dist tmp",
    "pug": "pug --pretty src/index.pug -o dist",
    "watch:pug": "pug --pretty -w src/index.pug -o dist",
+   "sass": "node-sass src/index.scss -o tmp",
+   "watch:sass": "node-sass -w src/index.scss -o tmp",
+   "watch:post": "postcss -w tmp -d dist -u postcss-preset-env",
    "watch:serve": "browser-sync dist -w",
+   "dev": "npm-run-all clean pug sass -p watch:*",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

Разберемся, что делают эти скрипты.

- `"clean": "rimraf dist tmp"`

`rimraf` удаляет каталоги `dist` и `tmp`.

- `"sass": "node-sass src/index.scss -o tmp"`

`node-sass` создает каталог `tmp` и однократно выполняет следующее - файл `src/index.scss` и подключенные к нему другие файлы `.scss` компилирует и помещает файл `tmp/index.css`.
Опция `-o` указывает, что скомпилированные файлы выводятся в каталог, который указывается после этой опции. Здесь этим каталогом является временный каталог `tmp`. Временный он потому, что после компиляции препроцессором файлы должны будут обработаны постпроцессором.

- `"watch:sass": "node-sass -w src/index.scss -o tmp"`

`node-sass` следит за файлом `src/index.scss` и каждый раз компилирует его при изменении содержимого, а полученный файл сохраняет в каталоге `tmp` с именем `index.css`.
Скрипт `"watch:sass"` не сильно отличается от скрипта `"sass"`. Разница в опции `-w`, которая запускает `node-sass` в режиме наблюдения. Если вызывать скрипт с опцией `-w`, то `node-sass` не сможет создать отсутствующий каталог. Поэтому сначала вызываем скрипт без опции `-w`, а потом с этой опцией.

- `"watch:post": "postcss -w tmp -d dist -u postcss-preset-env"`

`postcss` следит за каталогом `tmp` и если содержимое файлов в нем меняется, то файлы прогоняются через указанные плагины и помещаются в каталог `dist` с расширением `.css`
Опция `-u` указывает, какие плагины должен использовать `postcss` - здесь `postcss-preset-env`

- `"dev": "npm-run-all clean sass -p watch:*"`

`npm-run-all` запускает последовательно скрипт `clean` потом `sass`, затем запускает параллельно (`-p`) скрипты, у которых имя начинается на `watch:`

Теперь приступим к написанию стилей. Создадим файл `./src/index.scss` и скопируем в него следующее:

```scss
$font-size: 1rem;
$font-color: lch(28 99 35);

html {
  font-size: $font-size;
  color: $font-color;
}

.example {
  user-select: none;
}
```

Теперь, в терминале запустим команду:

```
npm run watch
```

В результате, исходники из каталога `src` будут откомпилированы и помещены в каталог `dist`. Файл `src/index.scss` будет откомпилирован в `dist/index.css`, у которого внутри будет следующее:

```css
html {
  font-size: 1rem;
  color: rgb(146, 0, 17);
  color: color(display-p3 0.54534 0 0.06183);
}

.example {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
```

Теперь, добавим в шаблон ссылку на откомпилированный `dist/index.css`

```pug
include components/button.pug

doctype html
html
  head
    meta(charset='utf-8')
    meta(name='viewport' content='width=device-width, initial-scale=1.0')
+   link(rel='stylesheet' href='index.css')
    title= 'Быстрый запуск Pug'
  body
    h1.name= 'Код написан в шаблонизаторе Pug!'
    +button()
```

Сохраним изменения и мы увидим, что страница браузера обновилась со стилевым оформлением:

```
 _____________
|             |
| Изображение |
|_____________|

```

## Установка и настройка инструмента md-pug-to-html

Все более распространенным способом написания статей является язык разметки [Markdown](https://daringfireball.net/projects/markdown/). Статья пишется на Markdown и сохраняется в файле с расширением `.md`. Если же в статье нужно поместить рисунки, то удобнее всего создать каталог и поместить в него статью и рисунки. Для каждой статьи свой создается свой каталог, а каталоги статей объединяются в каталоги по темам.

Теперь, нам нужен инструмент, который сможет просканировать эти каталоги, найти все файлы Markdown, преобразовать их в Html страницы и поместить в каталог сайта с сохранением исходной структуры каталогов. Также нужно, чтобы картинки были перемещены в нужные места. При этом, Html страницы должны конвертироваться согласно шаблону, созданному шаблонизатором Pug, для статей.

Для вышеописанной задачи мне потребовалось четыре инструмента: Pug, MdPugToHtml, gray-matter и markdown-to-pug. Pug нам известен и уже установлен, поэтому рассмотрим три остальные.

[MdPugToHtml](https://www.npmjs.com/package/md-pug-to-html) просматривает каталоги и ищет Markdown файлы. Как только файл найден MdPugToHtml преобразует этот файл с помощью gray-matter в объект, а объект передается в markdown-to-pug, где из основного контента формируется Pug разметка статьи, а данные Frontmatter подставляются в переменные Pug шаблона. И наконец, используя Pug, инструмент MdPugToHtml преобразует сформированную Pug разметку в Html страницу. Дополнительно, MdPugToHtml создает массив объектов, в котором хранятся метаданные каждой статьи.

По названию [markdown-to-pug](https://www.npmjs.com/package/markdown-to-pug) легко понять его назначение. markdown-to-pug конвертирует разметку Markdown в разметку Pug.

Инструмент [gray-matter](https://www.npmjs.com/package/gray-matter) получив на вход содержимое всего файла на выходе возвращает то же содержимое, но уже в виде объекта.

Теперь установим эти пакеты в нашем проекте

```
npm i -D md-pug-to-html markdown-to-pug gray-matter
```

Затем создадим каталог `content`, а в нем еще пару каталогов `article1` и `article2`. В каждом из этих двух каталогов создадим по одному файлу `index.md` с разметкой Markdown и данными Frontmatter.

Для файла `content/article1/index.md` запишем

```
---
title: Статья первая
description: Краткое описание первой статьи
create: 2022-08-10
---

## Заголовок h2 в первой статье
```

Для файла `content/article2/index.md` запишем

```
---
title: Статья вторая
description: Краткое описание второй статьи
create: 2022-08-11
---

## Заголовок h2 во второй статье
```

В файле package.json настраиваем MdPugToHtml

```json
"scripts": {
  "start": "md-pug-to-html -i=content -t=src/pages/article",
}
```

```json
  "scripts": {
    "clean": "rimraf dist tmp",
+   "md-pug-to-html": "md-pug-to-html -i=content -t=src/pages/article",
    "pug": "pug --pretty src/index.pug -o dist",
    "watch:pug": "pug --pretty -w src/index.pug -o dist",
    "sass": "node-sass src/index.scss -o tmp",
    "watch:sass": "node-sass -w src/index.scss -o tmp",
    "watch:post": "postcss -w tmp -d dist -u postcss-preset-env",
    "watch:serve": "browser-sync dist -w",
+   "dev": "npm-run-all clean md-pug-to-html pug sass -p watch:*",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

Удобным способом указать некие данные для статьи является блок данных, указанный в начале статьи Markdown. Он называется Frontmatter, имеет формат YAML/TOML/JSON и отделяется от основного контента тремя дефисами ---.

```
---
title: Краткий справочник по командам Git
description: В сжатой форме приведены самые часто применяемые команды Git
create: 2019-05-20
update: 2020-02-17
---

## Полезные команды по работе с Git и Github
```

Frontmatter не является стандартом для Markdown и не распознается многими конверторами. Однако есть инструменты, которые могут анализировать Frontmatter. Одним из таких инструментов является [gray-matter](https://www.npmjs.com/package/gray-matter), который получив на вход содержимое всего файла на выходе возвращает то же содержимое, но уже в виде объекта.

Было бы замечательно, если бы файлы Markdown, которые хранятся в отдельном каталоге, можно было сразу преобразовывать в страницы Html. Причем структура каталогов сохранялась бы в точности.

## Установка и настройка сборщика Rollup

Для сборки JavaScript файлов будем применять сборщик [Rollup](https://www.npmjs.com/package/rollup). Он будет объединять JavaScript модули в один файл `index.js`

```
npm i -D rollup
```

Для демонстрации работы сборщика Rollup создадим файл `src/components/button/button.js` и напишем в нем функцию, которую экспортируем как модуль:

```js
export function button() {
  let button = document.querySelector(".button")
  button.innerHTML = "Этот текст изменил JavaScript"
  document.body.appendChild(button)
}
```

Затем, создадим главный файл `src/index.js`, в который сделаем импорт вышеуказанного модуля:

```js
import button from "./components/button.js"

button()
```

Теперь в главном шаблоне проекта `src/index.pug` укажем, где будет расположен собранный сборщиком Rollup скрипт `index.js`. Он будет находится в каталоге `dist`. Так как это каталог сборки проекта, и, следовательно он будет корневым каталогом будущего сайта, то мы указываем, просто, имя файла `src='index.js'`.

```pug
include components/button.pug

doctype html
html
  head
    meta(charset='utf-8')
    meta(name='viewport' content='width=device-width, initial-scale=1.0')
    link(rel='stylesheet' href='index.css')
+   script(defer src='index.js')
    title= 'Быстрый запуск Pug'
  body
    h1.name= 'Код написан в шаблонизаторе Pug!'
    +button()
```

Добавим в файл `package.json` скрипт запуска для Rollup:

```json
"scripts": {
    "clean": "rimraf dist tmp",
    "pug": "pug --pretty src/index.pug -o dist",
    "watch:pug": "pug --pretty src/index.pug -o dist",
    "sass": "node-sass src/index.scss -o tmp",
    "watch:sass": "node-sass -w src/index.scss -o tmp",
    "watch:post": "postcss -w tmp -d dist -u postcss-preset-env",
    "watch:serve": "browser-sync dist -w",
+   "watch:rollup": "rollup -w -c rollup.config.js",
    "dev": "npm-run-all clean pug sass -p watch:*",
    "build": "echo \"There's nothing yet, but you can contribute\" && exit 1",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

В скрипте `"watch:rollup"` параметр `-w` (или`--watch`) сообщает сборщику, что он должен работать в режиме наблюдения, а параметр `-c` (или `--config`) говорит, что есть файл настроек и имя ему `rollup.config.js`.

Раз указан файл настроек `rollup.config.js`, то создадим его в корне проекта и напишем в нем следующее:

```js
export default {
  input: "src/index.js",

  watch: {
    include: "./src/**",
    clearScreen: false,
  },

  output: {
    file: "dist/index.js",
    format: "iife",
  },
}
```

Свойство `input` указывает путь к главному скрипту проекта, с которого Rollup начнет собирать все скрипты в один конечный файл-бандл. Адрес этого бандла указан в свойстве `file` объекта `output`. В этом же объекте свойство `format` указывает на формат вывода файла. Здесь указан формат `'iife'`, что превращает код выходного файла в [немедленно вызываемую функцию](https://benalman.com/news/2010/11/immediately-invoked-function-expression/) (IIFE). Более подробно о параметре `format` [см. документацию](https://rollupjs.org/guide/en/#outputformat).

Для режима наблюдения существует множество настроек. Ознакомиться с ними можно в [документации](https://rollupjs.org/guide/en/#watch-options). В нашем же файле свойство `include` ограничивает область наблюдения каталогом `src`, а свойство `clearScreen` запрещает очистку экрана при перезапуске сборщика Rollup.

Сохраним все изменения и перезапустим проект

```
npm run dev
```

мы увидим :

```
 _____________
|             |
| Изображение |
|_____________|

```

## Оптимизация изображений

Одной из главных причин медленной загрузки сайта является большой объем контента с изображениями. Для того, чтобы сайт загружался быстрее нужно максимально оптимизировать эти изображения. Оптимизация изображений подразумевает, как минимум, уменьшение размера файлов при сохранении визуального качества. Чтобы не заниматься этим вручную мы автоматизируем этот процесс. Для автоматического сжатия можно использовать такие инструменты как ImageMagick, [libvips](https://github.com/jcupitt/libvips) или [imagemin](https://github.com/imagemin/imagemin-cli). Мы воспользуемся последним.

### Установка и настройка модуля imagemin

Imagemin — популярный модуль сжатия изображений. Имеет расширения:

- [imagemin-webp](https://github.com/imagemin/imagemin-webp) для преобразования в WebP

Установим `imagemin-cli`:

```
npm i -D imagemin-cli
```

Добавим в файл `package.json` следующий код:

```json
"scripts": {
    "clean": "rimraf dist tmp",
    "pug": "pug --pretty src/index.pug -o dist",
    "watch:pug": "pug --pretty src/index.pug -o dist",
    "sass": "node-sass src/index.scss -o tmp",
    "watch:sass": "node-sass -w src/index.scss -o tmp",
    "watch:post": "postcss -w tmp -d dist -u postcss-preset-env",
+   "img": "imagemin src/pages/**/images/* src/images/* -o dist/images",
    "watch:serve": "browser-sync dist -w",
    "watch:rollup": "rollup --watch -c rollup.config.js",
+   "dev": "npm-run-all clean pug sass img -p watch:*",
    "build": "echo \"There's nothing yet, but you can contribute\" && exit 1",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

Скрипт `"img"` указывает `imagemin` найти и сжать все изображения в каталогах `src/pages/**/images/*` и `src/images/*` и поместить их в `dist/images`. Более подробные настройки можно посмотреть в [документации](https://github.com/imagemin/imagemin-cli#usage).

### Установка и настройка модуля SVGO

Обычно, SVG изображения содержат избыточный код, который любят оставлять редакторы графики. [SVGO](https://github.com/svg/svgo) минимизирует файлы SVG удаляя тот самый ненужный код. Существует онлайн инструмент по оптимизации SVG файлов и кода - [SVGOMG](https://jakearchibald.github.io/svgomg/). Также, существуют плагины: для PostCSS - [postcss-svgo](https://www.npmjs.com/package/postcss-svgo); для Rollup - [rollup-plugin-svgo](https://github.com/porsager/rollup-plugin-svgo).

Мы будем использовать SVGO, который можно [установить как CLI](https://www.npmjs.com/package/svgo):

npm i -D svgo

Настроим `package.json`:

```json
"scripts": {
  ...
  "watch:svg": "svgo -f src/assets/svg -o dist/svg",
  ...
}
```

Это значит, что все файлы с расширением `.svg` будут взяты из каталога `src/assets/svg`, оптимизированы и помещены в каталог `dist/svg`, который будет создан при его отсутствии.

Создадим каталог `src/assets/svg` и поместим туда несколько файлов `.svg`, взять их можно [здесь](https://fonts.google.com/icons?selected=Material+Icons&icon.set=Material+Symbols&icon.query=wh). Если мы скачаем значок `email_black_24dp` в виде файла SVG и откроем этот файл в любом текстовом редакторе, то мы увидим следующее:

```xml
<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-.4 4.25l-7.07 4.42c-.32.2-.74.2-1.06 0L4.4 8.25c-.25-.16-.4-.43-.4-.72 0-.67.73-1.07 1.3-.72L12 11l6.7-4.19c.57-.35 1.3.05 1.3.72 0 .29-.15.56-.4.72z"/></svg>
```

Чтобы значок гибко подстраивался под размер шрифта заменим значения атрибутов `height` и `width` с `24px` на `1em`:

```xml
<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 24 24" width="1em" fill="#000000"><path ....
```

и сохраним этот файл. То же самое проделаем с другими файлами.

Затем в файл `src/index.pug` добавим следующее:

```pug
  body
    h1.name= 'Код написан в шаблонизаторе Pug!'
    +button()
    p.text= 'Нажми кнопку'
+   p.text= 'Если что-то не так звони по телефону:'
+   a.phone-link(href='tel:+79189999999')
+     img.icon-phone(src='svg/phone_black_24dp.svg')
+     .phone-number='+79189999999'
```

В уже существующий файл `src/index.scss` добавим:

```scss
.phone-link {
  display: flex;
  text-decoration: none;
  color: $font-color;
}

.icon-phone {
  width: 2.5 * $font-size;
  height: 2.5 * $font-size;
}

.phone-number {
  font-size: 2.4 * $font-size;
}
```

Запустим сборку:

```
npm run dev
```

В окне браузера мы увидим следующее:

```
 _____________
|             |
| Изображение |
|_____________|

```

## Установка и настройка генератора спрайтов svg-sprite-generator

[svg-sprite-generator](https://www.npmjs.com/package/svg-sprite-generator) - генератор SVG-спрайтов, который из отдельных файлов SVG создает один файл-спрайт.

Установим пакет:

```
npm i -D svg-sprite-generator
```

Напишем настройки в `package.json`

```json
  "scripts": {
    "clean": "rimraf dist tmp",
    "pug": "pug --pretty src/pages/home/index.pug -o dist",
    "watch:pug": "pug -w --pretty src/pages/home/index.pug -o dist",
    "sass": "node-sass src/pages/home/index.scss -o tmp",
    "watch:sass": "node-sass -w src/pages/home/index.scss -o tmp",
+   "watch:svg": "svgo -f src/assets/svg -o dist/svg && svg-sprite-generate -d dist/svg -o dist/svg/sprite.svg",
    "watch:post": "postcss -w tmp/index.css -d dist -u postcss-preset-env",
    "img": "imagemin src/pages/**/images/* src/images/* -o dist/images",
    "watch:serve": "browser-sync dist -w",
    "watch:rollup": "rollup --watch -c rollup.config.js",
    "dev": "npm-run-all clean pug sass img -p watch:*",
    "build": "echo \"There's nothing yet, but you can contribute\" && exit 1",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

С помощью цепочки из операторов `&&` можно последовательно запускать различные скрипты. Так в скрипте `"watch:svg"` мы добавим через `&&` другой скрипт. Это значит, что после успешного выполнения кода `-f src/assets/svg -o dist/svg` будет выполнен код `svg-sprite-generate -d dist/svg -o dist/svg/sprite.svg`, который означает, что все файлы с расширением `.svg` будут взяты из каталога `dist/svg`, объединены в спрайт `sprite.svg` и этот спрайт будет помещен в этот же каталог.

Выполним сборку всего проекта:

```
npm run dev
```

Мы обнаружим в каталоге `dist/svg/` новый файл `sprite.svg`. Спрайт внутри выглядит, примерно, так:

```xml
<?xml version="1.0" encoding="utf-8"?>
<svg xmlns="http://www.w3.org/2000/svg">
  <symbol id="email_black_24dp">
    <path d="M0 0h24v24H0V0z" fill="none" /><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2..." />
  </symbol>
  <symbol id="phone_black_24dp">
    <path d="M0 0h24v24H0V0z" fill="none" /><path d="m19.23 15.26-2.54-.29a1.99 1.99 0 0 0-1.64.57l-1.84 1.84a15.045 15.045 0 0 1-6.59-..." />
  </symbol>
  <symbol id="whatsapp_black_24dp">
    <path d="M0 0h24v24H0z" /><g fill="none"><path d="M0 0h24v24H0z" /></g><path d="M19.05 4.91A9.816 9.816 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9..." />
  </symbol>
</svg>
```

Здесь в один спрайт упаковано три файла SVG. Код каждого отдельного файла SVG заключен между тегами <symbol>, а это значит, что значки не будут отображаться если мы попробуем вызвать отдельный элемент спрайта вот так: `<img src="svg/sprite.svg#email_black_24dp"/>`. Отобразить нужный значок можно, если его вызвать с помощью команды <use> по уникальному идентификатору. Соответственно, тэг <use> должен быть обернут тегом <svg>:

```pug
    p.text= 'или скинь на мыло:'
    a.email-link(href='mailto:info@jinv.ru' title='Написать письмо')
      svg.icon(role='img')
        use(href='svg/sprite.svg#email_black_24dp')
      .email-address='info@jinv.ru'
```

Стилизуем данный код в файле `src/index.scss`:

```scss
.email-link {
  display: flex;
  text-decoration: none;
  color: $font-color;

  &:hover {
    text-decoration: underline;
    background-color: bisque;
  }
}

.icon {
  width: 2.5 * $font-size;
  height: 2.5 * $font-size;
}

.icon > use {
  transform: scale(1.6);
}

.email-address {
  font-size: 2 * $font-size;
}
```

Запустим сборку:

```
npm run dev
```

В окне браузера мы увидим следующее:

```
 _____________
|             |
| Изображение |
|_____________|

```
