# Сайт о веб программировании

Исходный код сайта разрабатывается на Pug, Sass, JavaScript и Markdown. Для разработки применяется сборщик [npm-for-frontend](https://github.com/injashkin/npm-for-frontend).

Чтобы запустить данный сайт на компьютере и использовать его для дальнейшей разработки у вас на компьютере должен быть установлен [Node.js](https://nodejs.org/).

## Быстрый запуск

Клонируем проект к себе на компьютер. Для этого в терминале запустим следующую команду:

```
git clone https://github.com/injashkin/jinv.git new-project-name
```

Заходим в каталог и устанавливаем проект

```
cd new-project-name
npm i
```

Запускаем проект и разрабатываем фронтенд

```
npm run dev
```

После разработки делаем продакшн версию сайта

```
npm run build
```

## Структура проекта

```
|-src
  |-assets
    |+fonts
    |+png
    |+svg
  |+components
  |+data
  |+images
  |+layouts
  |-pages
    |+error
    |-home
      |-images
        |+gallery
        |+slider
      index.js
      index.pug
      index.scss
.gitignore
package-lock.json
package.json
README.md
rollup.config.js
```

- **dist/** - сборка проекта для разработки или продакшена
- **src/components** - компоненты, из которых собирается сайт
- **src/assets/svg/** - файлы значков с расширением `.svg`. Из этих файлов собирается спрайт `dist/svg/sprite.svg`
- **src/assets/static/** - здесь хранятся файлы, которые должны быть размещены в корне сайта без какой-либо обработки.
- **src/pages/** - шаблоны страниц
- **src/pages/home/** - шаблон домашней страницы
- **src/pages/home/images/** - каталог с изображениями, которые относятся к данной странице. Все изображения можно сортировать по тематическим каталогам, например: `gallery`, `slider`. При этот путь для всех файлов с изображениями не зависит, в какой тематический каталог будет сохранено изображение. Формат ссылки должен выглядеть так: `"./images/имя_файла.расширение"`.

## Используемые технологии

### Значки

Основная часть значков на сайте являются изображениями SVG и упакованы в единый спрайт `dist/svg/sprite.svg`. Этот спрайт собирается с помощью пакета [svg-sprite-generator](https://www.npmjs.com/package/svg-sprite-generator) из файлов `.svg`, которые расположены в каталоге `src/assets/svg/`.

С помощью модуля [SVGO](https://www.npmjs.com/package/svgo) файлы извлекаются из каталога `src/assets/svg`, оптимизируются и помещаются в каталог `dist/svg`. Далее, из оптимизированных файлов с помощью модуля [svg-sprite-generator](https://www.npmjs.com/package/svg-sprite-generator) создается спрайт `dist/svg/sprite.svg`. Данный механизм реализуется скриптом `"watch:svg"` либо `"build:svg"` в файле `package.json`

Файлы значков `.svg` взяты на [Material Symbols and Icons - Google Fonts](https://fonts.google.com/icons?icon.set=Material+Icons).

В проекте также возможно использовать [значки Юникода](https://unicode-table.com/ru/).

### Цвета

При подборе цветовой схемы руководствовался [рекомендациями по цветовому контрасту](https://dequeuniversity.com/rules/axe/4.4/color-contrast) и использовал оттуда Color Contrast Analyzer.

### Логотип

Логотип был создан в программе [Inkscape](https://inkscape.org/ru/). В результате был создан файл логотипа в формате SVG и PNG размером 512х512. Все остальные размеры PNG файлов получены с помощью [Favicon.ico & App Icon Generator](https://www.favicon-generator.org/). Также, этот сервис генерирует значок `favicon.ico` и генерирует необходимые линки для секции head файла HTML, а также создает файлы `manifest.json` и `browserconfig.xml`.
