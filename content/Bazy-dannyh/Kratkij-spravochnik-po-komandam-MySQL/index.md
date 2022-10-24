---
title: Краткий справочник по командам и запросам к MySQL
description: Приведены команды и запросы для работы с базой данных MySQL, которые наиболее часто применяются автором статьи.
create: 24-10-2022
---

## Команды терминала для работы с MySQL

- mysql --version

  - Узнать версию сервера MySQL

---

- service mysql status

  или

- sudo systemctl status mysql

  - Проверить состояние службы MySQL. [УПРАВЛЕНИЕ СЛУЖБАМИ LINUX](https://losst.pro/upravlenie-sluzhbami-linux#Утилита_systemctl)

---

- sudo systemctl start mysql

  - Запустить сервер

---

- sudo systemctl stop mysql

  - Остановить сервер

---

- sudo mysql -u root -p

  - Войти в MySQL как root-пользователь

---

## Запросы к MySQL

---

- SHOW DATABASES;

  - Показать список всех баз данных на сервере MySQL

---

- CREATE DATABASE wp2;

  - Создать новую базу данных MySQL с именем wp2

---

- DROP DATABASE wp2;
  - Удалить базу данных MySQL с именем wp2

---

- USE wp2;

  - Выбрать базу данных wp2 для дальнейших операций над ней

---

- SELECT User,Host FROM mysql.user;

  - Получить список всех учетных записей пользователей. Выводит таблицу с двумя столбцами User и Host

---

- CREATE USER 'newuser'@'localhost' IDENTIFIED BY 'userpassword';

  - Создать новую учетную запись пользователя MySQL с именем newuser и с паролем userpassword, который может подключаться к серверу MySQL только с локального хоста. Чтобы пользователь мог подключаться с любого хоста, используйте вместо 'localhost' подстановочный знак '%'

---

- SHOW GRANTS FOR 'username'@'localhost';
  - Показать привилегии пользователя username, которыми он обладает на локальном хосте.

---

- GRANT ALL PRIVILEGES ON _._ TO 'username'@'localhost';
  - Предоставить все привилегии пользователю username во всех базах данных на локальном хосте.

---

- GRANT SELECT, INSERT, DELETE ON wp2.articles TO 'username'@'localhost';
  - Предоставить пользователю username привилегии на чтение, вставку и удаление строк в таблице articles базы данных wp2 на локальном хосте

---

- DROP USER 'username'@'localhost';
  - Удалить пользователя username, который имеет доступ к базе данных с локального хоста.
