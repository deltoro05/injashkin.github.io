---
title: Сброс пароля в WordPress через командную строку MySQL
create: 25-10-2022
---

Рассмотрим как сбросить пароль администратора сайта на локалхосте. Из терминала войдем в консоль MySQL как root-пользователь:

```
sudo mysql -u root -p
```

Потребуется ввести два пароля: пароль администратора ОС и пароль root-пользователя MySQL. Если пароль root-пользователя MySQL вы не меняли, то в вышеприведенной команде можно не указывать `-p` и не нужно вводить второй пароль. После выполнения команды появится строка с приглашением `mysql>`. В эту строку будем вводить запросы.

Найдем базу данных нашего сайта на WordPress, для этого введем следующий запрос:

```
SHOW DATABASES;
```

Будут показаны имена всех баз данных на сервере MySQL.

```
mysql> SHOW DATABASES;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| phpmyadmin         |
| sys                |
| wp2                |
+--------------------+
6 rows in set (0,00 sec)
```

После того, как мы нашли нужную базу данных, например `wp2`, можно просмотреть, какие таблицы имеются в этой базе:

```
SHOW TABLES FROM wp2;
```

Покажет имена таблиц в базе данных wp2.

```
mysql> SHOW TABLES FROM wp2;
+-----------------------+
| Tables_in_wp2         |
+-----------------------+
| wp_commentmeta        |
| wp_comments           |
| wp_links              |
| wp_options            |
| wp_postmeta           |
| wp_posts              |
| wp_term_relationships |
| wp_term_taxonomy      |
| wp_termmeta           |
| wp_terms              |
| wp_usermeta           |
| wp_users              |
+-----------------------+
12 rows in set (0,00 sec)
```

В таблице с именем wp_users содержатся все учетные записи пользователей WordPress. Выведем данные из этой таблицы. Мы не будем выбирать базу данных wp2 и делать её текущей с помощью запроса USE, а укажем в запросе базу данных и через точку имя таблицы:

```
SELECT * FROM wp2.wp_users \G;
```

Будут выведены все данные из таблицы wp_users базы данных wp2. Данные будут выведены в виде списка, на что указывает флаг `\G`.

```
mysql> SELECT * FROM wp2.wp_users \G;
*************************** 1. row ***************************
                 ID: 1
         user_login: admin
          user_pass: $P$Bz6yNcBDlCjl171RqABZQJmL5QJyN.1
      user_nicename: admin
         user_email: admin@example.com
           user_url: http://localhost:8080
    user_registered: 2022-10-25 09:38:26
user_activation_key:
        user_status: 0
       display_name: admin
1 row in set (0,00 sec)
```

Здесь показаны данные для администратора сайта, где в поле user_pass указан пароль в зашифрованном виде. Его мы изменим:

```
UPDATE wp2.wp_users SET user_pass = MD5('admin') WHERE user_login = 'admin';
```

Используем функцию MD5 при вводе нового пароля. Здесь для пользователя с логином `admin` установлен пароль `admin`.
