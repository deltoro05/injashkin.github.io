---
title: Краткий справочник по командам и запросам к MySQL
description: Приведены команды и запросы для работы с базой данных MySQL, которые наиболее часто применяются автором статьи.
create: 24-10-2022
---

## Команды терминала для работы с MySQL

- mysql --version

  - Узнать версию используемой MySQL

---

- service mysql status

  или

- sudo systemctl status mysql

  - Проверить состояние службы MySQL. [УПРАВЛЕНИЕ СЛУЖБАМИ LINUX](https://losst.pro/upravlenie-sluzhbami-linux#Утилита_systemctl)

---

- sudo systemctl start mysql

  - Запустить сервер MySQL

---

- sudo systemctl stop mysql

  - Остановить сервер MySQL

---

- sudo mysql -u root -p -e 'SHOW DATABASES;'
  - Подключится к серверу MySQL как root-пользователь и выполнить запрос `SHOW DATABASES;`.

---

- sudo mysql -u root -p

  - Войти в консоль MySQL как root-пользователь. Потребуется ввести два пароля: пароль администратора ОС и пароль пользователя MySQL. После этого появится строка с приглашением `mysql>`, в которую можно вводить запросы.

## Запросы к MySQL

- SHOW DATABASES;

  - Показать список всех баз данных на сервере MySQL

---

- CREATE DATABASE wp2;

  - Создать новую базу данных MySQL с именем wp2

---

- DROP DATABASE wp2;
  - Удалить базу данных MySQL с именем wp2

---

- SELECT User,Host FROM mysql.user;

  - Получить все учетные записи пользователей из таблицы user базы данных mysql. Выводит из таблицы две колонки User и Host. Если нужно получить все колонки из таблицы user, то вместо `User,Host` используем оператор `*`.

---

- CREATE USER 'newuser'@'localhost' IDENTIFIED BY 'userpassword';

  - Создать новую учетную запись пользователя MySQL с именем newuser и с паролем userpassword, который может подключаться к серверу MySQL только с локального хоста. Чтобы пользователь мог подключаться с любого хоста, используй вместо 'localhost' подстановочный знак '%'

---

- SHOW GRANTS FOR 'username'@'localhost';
  - Показать привилегии пользователя username, которыми он обладает на локальном хосте.

---

- GRANT SELECT, INSERT, DELETE ON wp2.articles TO 'username'@'localhost';
  - Предоставить пользователю username привилегии на чтение, вставку и удаление строк в таблице articles базы данных wp2 на локальном хосте

---

- GRANT ALL PRIVILEGES ON \*.\* TO 'username'@'localhost';
  - Предоставить все привилегии пользователю username во всех базах данных на локальном хосте.

---

- DROP USER 'username'@'localhost';
  - Удалить пользователя username, который имеет доступ к базе данных с локального хоста.

---

- USE wp2;

  - Сделать базу данных wp2 текущей, т.е., выбрать базу данных wp2 для дальнейших операций над ней.

---

- SHOW TABLES;
  - Показать имена таблиц в текущей базе данных. Чтобы сделать БД текущей используй запрос USE.

---

- SHOW TABLES FROM users;
  - Показать список таблиц в базе данных users.

---

- SHOW TABLES LIKE 'wp%';
  - Показать имена таблиц, у которых названия начинаются на wp, в текущей БД.

## Флаги и операторы

- `*`
  - Означает всё. Например: `SELECT * FROM user;` - выводит все колонки из таблицы user.

---

- `\G`
  - Выводит данные в виде списка. Например: `SELECT * FROM user \G;`. Без флага `\G` данные выводятся в виде таблицы.

## Полезные ссылки по MySQL

- [Официальная документация по MySQL](https://dev.mysql.com/doc/refman/8.0/en/).
