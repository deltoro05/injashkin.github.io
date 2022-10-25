---
title: Установка и настройка Wordless
create: 24-10-2022
---

[Wordless](https://wordless.readthedocs.io/en/latest/index.html) - это микро-фреймворк для разработки пользовательских тем, который представляет из себя плагин для WordPress со стартовой темой. Wordless значительно ускоряет и улучшает создание пользовательских тем. Перечислим особенности Wordless:

- Создание новых тем непосредственно в wp-cli
- Написание шаблонов PHP с помощью языка шаблонов PUG
- Написание таблиц стилей CSS, используя синтаксис SCSS
- Написание логики Javascript в ES2015
- Предварительно настроенная поддержка перехватчика сообщений MailHog.
- Поддержка WebPack, BrowserSync (с живой перезагрузкой), WP-CLI, Yarn.

Скомпилированная тема будет работать на любой стандартной установке Wordpress.

Wordless не изменяет никаких основных функциональных возможностей, поэтому он совместим практически с любым плагином.

Первым делом установим WP-CLI

## WP-CLI

[WP-CLI](https://wp-cli.org/) - это интерфейс командной строки для WordPress. С помощью WP-CLI можно обновлять плагины, настраивать многосайтовые установки и многое другое, не используя веб-браузер.

Из терминала загрузим файл wp-cli.phar с помощью curl:

```
curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
```

Файл загрузится в Домашнюю папку.

Затем проверим работоспособность файла wp-cli.phar:

```
php wp-cli.phar --info
```

Чтобы использовать WP-CLI из командной строки, набирая команду wp, сделаем файл исполняемым и переместим его куда-нибудь из домашней папки. Например:

```
chmod +x wp-cli.phar
sudo mv wp-cli.phar /usr/local/bin/wp
```

Теперь проверим, как работает WP-CLI:

```
wp --info
```

Будет выведена информация, похожая на эту:

```
OS:	Linux 5.15.0-52-generic #58~20.04.1-Ubuntu SMP Thu Oct 13 13:09:46 UTC 2022 x86_64
Shell:	/bin/bash
PHP binary:	/usr/bin/php7.4
PHP version:	7.4.3
php.ini used:	/etc/php/7.4/cli/php.ini
MySQL binary:	/usr/bin/mysql
MySQL version:	mysql  Ver 8.0.30-0ubuntu0.20.04.2 for Linux on x86_64 ((Ubuntu))
SQL modes:
WP-CLI root dir:	phar://wp-cli.phar/vendor/wp-cli/wp-cli
WP-CLI vendor dir:	phar://wp-cli.phar/vendor
WP_CLI phar path:	/home/user
WP-CLI packages dir:
WP-CLI cache dir:	/home/user/.wp-cli/cache
WP-CLI global config:
WP-CLI project config:
WP-CLI version:	2.7.1
```

## Wordless

Теперь установим [Wordless](https://wordless.readthedocs.io/en/latest/index.html). Для установки требуется язык Ruby. Проверим наличие этого языка в системе:

```
ruby -v
```

Если язык установлен, то будет выведена запись, похожая на эту:

```
ruby 2.7.0p0 (2019-12-25 revision 647ee6f091) [x86_64-linux-gnu]
```

Если язык не установлен, то установим его. В Ubuntu это делается так:

```
sudo apt-get install ruby-full
```

Установка для других систем приведена на [этой странице](https://www.ruby-lang.org/ru/documentation/installation/).

Теперь установим из репозитория Ruby пакет wordless:

```
gem install wordless
```

Затем, установим WordPress:

```
wordless new wp2 --db-user='username' --db-password='your_password'
```

где:

'username' - имя пользователя, под которым вы входите в операционную систему.
'your_password' - пароль к учетной записи на сервере MySQL. Если вы не изменяли пароль к учётной записи на сервере MySQL, то введите скобки без пробелов внутри ''.

Будет создан каталог wp2 и в него установлен WordPress с настроенным плагином Wordless.

Возможно, при установке у вас появится такая ошибка:

```
Check for necessary global NPM packages
Global NPM packages needed by Wordless already installed. Good job!
Starting...
Creating database 'wp2'...
Cannot login to MySQL. Wrong credentials?
```

Система сообщает, что при попытке создать базу данных с именем wp2, не удалось войти в MySQL, так как неверные учетные данные. Это произошло потому, что, либо вы когда-то изменили пароль к вашей учетной записи на сервере MySQL и нужно ввести этот пароль, либо в базе данных MySQL не зарегистрирован пользователь с именем, под которым вы входите в свою операционную систему.

Если вы не меняли пароль, то скоре всего, ваше имя не зарегистрировано в БД MySQL, либо пользователь с таким именем существует и имеет другой пароль. Чтобы это проверить выполним некоторые действия.

Войдем в MySQL как root-пользователь

```
sudo mysql -u root -p
```

Если вы до этого не меняли пароль root-пользователя MySQL, то можно не указывать ключ -p. При выполении вышеприведенной команды система попросит ввести только пароль администратора операционной системы. Если же вы изменяли пароль root-пользователя MySQL, то добавьте ключ -p и в процессе выполнения команды введите пароль администратора системы, а затем пароль root-пользователя MySQL. В результате, вы войдете в базу данных и увидите строку с приглашением:

```
musql>
```

Получим список всех учетных записей пользователей:

```
SELECT User,Host FROM mysql.user;
```

Увидим таблицу с двумя столбцами User и Host, которая выглядит примерно так:

```
+------------------+-----------+
| User             | Host      |
+------------------+-----------+
| debian-sys-maint | localhost |
| mysql.infoschema | localhost |
| mysql.session    | localhost |
| mysql.sys        | localhost |
| phpmyadmin       | localhost |
| root             | localhost |
+------------------+-----------+
6 rows in set (0,00 sec)
```

Если мы не увидели своего имени, то создадим учетную запись. Для этого в строке с приглашением `musql>` добавим следующий запрос:

```
CREATE USER 'newuser'@'localhost' IDENTIFIED BY 'userpassword';
```

Будет создана новая учетная запись пользователя MySQL с именем newuser и с паролем userpassword, который может подключаться к серверу MySQL только с локального хоста. Если вы не хотите устанавливать пароль, то вместо пароля 'userpassword' укажите кавычки ''.

Проверим список всех учетных записей пользователей.

```
SELECT User,Host FROM mysql.user;
```

В таблице мы должны увидеть имя созданного пользователя.

Выйдем из базы данных:

```
exit
```

nvm install 14.15.3

Снова пробуем установить wordless:

```
wordless new wp2 --db-user='username' --db-password='your_password'
```

WP-CLI already installed [/usr/local/bin/wp]. Do you want to overwite it? [y]es, [N]o

n

Ждем, пока загрузится и установится WordPress

Запускаем сервер:

wp server

Открываем браузер и переходим по адресу `http://localhost:8080`.
