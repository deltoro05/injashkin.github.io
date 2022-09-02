Миксин `icon(name)` вставляет значки SVG из спрайта `dist/svg/sprite.svg` по указанному имени `name`.

Вызов:

```pug
+icon(name[, title][, modifier])
```

где

name - имя значка в спрайте.
title - поясняющий текст всплывающей подсказки
modifier - модификатор класса БЭМ

Примеры:

```pug
+icon('phone_black_24dp')
+icon('phone_black_24dp', 'Позвонить')
+icon('phone_black_24dp', '', 'xxl')
```
