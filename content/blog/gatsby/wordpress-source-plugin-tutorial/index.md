---
title: "Руководство по плагину WordPress Source"
description: "Руководство по установке и работе с плагином `gatsby-source-wordpress`, который позволяет извлекать данные из WordPress и использовать на Gatsby сайте"
date: "2020-04-10"
---
## Как создать сайт с данными, полученными из WordPress

Перевод статьи [WordPress Source Plugin Tutorial](https://www.gatsbyjs.org/tutorial/wordpress-source-plugin-tutorial/#how-to-create-a-site-with-data-pulled-from-wordpress).

### Что охватывает это руководство:

В этом руководстве вы установите плагин `gatsby-source-wordpress`, который извлечет данные и изображения из установленного WordPress на Gatsby сайт и визуализирует эти данные. Этот [демо-сайт на WordPress + Gatsby ](https://github.com/gatsbyjs/gatsby/tree/master/examples/using-wordpress) содержит исходный код сайта, похожего на тот, что вы построите в этом руководстве, хотя в нем отсутствуют изображения. Их вы добавите изучив руководство [Добавление изображений на сайт WordPress](https://www.gatsbyjs.org/tutorial/wordpress-image-tutorial/).

#### Для тех, кто предпочитает GraphQL

Если вы предпочитаете использовать GraphQL, то существует плагин [wp-graphql](https://github.com/wp-graphql/wp-graphql), который легко отображает как стандартные, так и пользовательские данные в WordPress. 

В плагине wp-graphql поддерживаются те же схемы аутентификации, что и в WP-API. Плагин wp-graphql можно использовать совместно с плагином [gatsby-source-graphql](https://www.gatsbyjs.org/packages/gatsby-source-graphql/).

## Зачем это руководство?

В этом руководстве вы освоите азы по подключению сайта Gatsby к CMS, извлечению данных и использованию React для визуализации этих данных на сайте изящными способами.

Если вы хотите посмотреть на растущее число доступных source плагинов, то в [Библиотеке плагинов Gatsby](https://www.gatsbyjs.org/plugins/?=source) в строке поиска введите “source”.

### Создание сайта с помощью плагина `gatsby-source-wordpress`

Создайте новый проект Gatsby и перейдите в каталог этого проекта:

```shell
gatsby new wordpress-tutorial-site
cd wordpress-tutorial-site
```

Установите плагин `gatsby-source-wordpress`. Дополнительные сведения о функциях плагина и примерах запросов GraphQL, не включенных в этот учебник, см. [В файле README плагина `gatsby-source-wordpress`](https://www.gatsbyjs.org/packages/gatsby-source-wordpress/?=wordpress).

```shell
npm install gatsby-source-wordpress
```

Добавьте плагин `gatsby-source-wordpress` в файл `gatsby-config.js` используя следующий код, который вы также найдете в [исходном коде демо-сайта](https://github.com/gatsbyjs/gatsby/blob/master/examples/using-wordpress/gatsby-config.js).


```js:title=gatsby-config.js
module.exports = {
  siteMetadata: {
    title: `Учебник Gatsby WordPress`,
    description: `Пример, позволяющий понять, как получить исходные данные из WordPress.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    // https://public-api.wordpress.com/wp/v2/sites/gatsbyjsexamplewordpress.wordpress.com/pages/
    /*
     * Уровень обработки данных Gatsby начинается с плагинов "source"
     * Здесь сайт берет данные из WordPress.
     */
    // highlight-start
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        /*
         * Базовый URL-адрес сайта WordPress без протокола и слеша в конце. Это обязательно.
         * Например : 'demo.wp-api.org' или 'www.example-site.com'
         */
        baseUrl: `live-gatbsyjswp.pantheonsite.io`,
        // Протокол. Может быть http или https.
        protocol: `https`,
        // Указывает, будет ли сайт размещен на wordpress.com.
        // Если false, то подразумевается, что сайт размещен на отдельном хостинге.
        // Если true, то source плагин будет содержаться на wordpress.com используя JSON REST API V2.
        // Если сайт размещен на wordpress.org, то установите это значение в false.
        hostingWPCOM: false,
        // Если useACF - true, то source плагин попытается импортировать содержимое WordPress ACF Plugin.
        // Эта функция непроверена для сайтов, размещенных на WordPress.com
        useACF: true,
      },
    },
    // highlight-end
    /**
     * Следующие плагины не требуются для gatsby-source-wordpress,
     * но они нам нужны, чтобы стартер по умолчанию, который мы установили выше, продолжал работать.
     **/
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // Этот путь находится относительно корня сайта.
      },
    },
  ],
}
```

### Создание GraphQL запросов, которые извлекают данные из WordPress

Теперь вы можете создать запрос GraphQL, чтобы получить некоторые данные с сайта WordPress. Вы создадите запрос, который извлечет из блога заголовки постов, дату их публикации и содержимое.

Выполните:

```shell
gatsby develop
```

Перейдите в браузере по ссылке `http://localhost:8000`, где увидите сайт. Перейдите на `http://localhost:8000/___graphql`, где сможете создавать запросы GraphQL.

В качестве упражнения попробуйте повторно создать следующие запросы в эксплорере GraphiQL. Этот запрос будет извлекать содержимое поста из блога WordPress:

```graphql
query {
  allWordpressPage {
    edges {
      node {
        id
        title
        excerpt
        slug
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
}
```

Следующий запрос приведет к получению отсортированного списка записей в блоге:

```graphql
{
  allWordpressPost(sort: { fields: [date] }) {
    edges {
      node {
        title
        excerpt
        slug
      }
    }
  }
}
```

## Рендеринг записей блога в `index.js`

Теперь, когда вы создали запросы GraphQL, которые извлекают нужные данные, вы будете использовать второй запрос для создания списка отсортированных заголовков постов на главной странице сайта. Вот компонент главной страницы `src/pages/index.js`, который должен выглядеть так:

```jsx:title=src/pages/index.js
import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({ data }) => {
  //highlight-line
  return (
    <Layout>
      <SEO title="home" />
      //highlight-start
      <h1>My WordPress Blog</h1>
      <h4>Posts</h4>
      {data.allWordpressPost.edges.map(({ node }) => (
        <div>
          <p>{node.title}</p>
          <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
        </div>
      ))}
      //highlight-end
    </Layout>
  )
}

//highlight-start
export const pageQuery = graphql`
  query {
    allWordpressPost(sort: { fields: [date] }) {
      edges {
        node {
          title
          excerpt
          slug
        }
      }
    }
  }
`
//highlight-end
```

Сохраните эти изменения и перейдите на `http://localhost:8000` чтобы увидеть вашу новую домашнюю страницу со списком отсортированных постов в блоге!

![Главная страница WordPress после запроса](https://www.gatsbyjs.org/static/3ae34e1e5b9f3fbdea14040a88136814/1deb5/wordpress-source-plugin-home.jpg)

## Создание страниц для каждого поста блога и ссылки на них

Индексная страница с заголовком поста и отрывком - это здорово, но вы также должны создать страницы для любого поста в блоге и ссылаться на них из файла `index.js`.

Для этого необходимо:

1. Создать страницы для каждой поста в блоге
2. Связать заголовок на странице index со страницей поста.

Если вы еще этого не сделали, прочтите [Часть 7](https://www.gatsbyjs.org/tutorial/part-seven/) основного руководства, поскольку оно проходит через концепцию и примеры этого процесса используя Markdown вместо WordPress.

### Создание страниц для каждого поста в блоге.

В части 7 руководства первым шагом в создании страниц является создание слагов для файлов markdown. Поскольку вы используете WordPress, а не файлы Markdown, вы можете захватить слаги, которые возвращаются из вызова API к источнику WordPress. Вы можете пропустить создание слагов, так как они у вас уже есть.

Откройте файл `gatsby-node.js` в корне проекта (он должен быть пустым, за исключением некоторых комментариев) и добавьте следующее:

```js:title=gatsby-node.js
const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
    {
      allWordpressPost(sort: { fields: [date] }) {
        edges {
          node {
            title
            excerpt
            content
            slug
          }
        }
      }
    }
  `).then(result => {
    console.log(JSON.stringify(result, null, 4))
  })
}
```

Затем [остановите и перезагрузите](https://www.gatsbyjs.org/tutorial/part-zero/#view-your-site-locally) среду разработки `gatsby develop`. В терминале, вы должны увидеть два поста, выведенных как объекты:

![Два поста выведенные в терминал](https://www.gatsbyjs.org/static/3293912ec15e382170fa7e07a8c112c7/28be2/wordpress-source-plugin-log.jpg)

Как объяснено в части 7 руководства, этот экспорт `createPages` является одной из “рабочих лошадок” Gatsby и позволяет нам создавать посты в блоге (или страницы, или пользовательские типы записей и т. д.) из установки WordPress.

Однако перед созданием постов в блоге необходимо указать шаблон для построения страниц.

В каталоге `src` создайте каталог с именем `templates`, а в нем создайте файл `blog-post.js`. В этот файл вставьте следующее:

```jsx:title=src/templates/blog-post.js
import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"

export default ({ data }) => {
  const post = data.allWordpressPost.edges[0].node
  console.log(post)
  return (
    <Layout>
      <div>
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </Layout>
  )
}
export const query = graphql`
  query($slug: String!) {
    allWordpressPost(filter: { slug: { eq: $slug } }) {
      edges {
        node {
          title
          content
        }
      }
    }
  }
`
```

Что делает этот файл? После импорта зависимостей он создает макет поста с помощью JSX. Он оборачивает все в компоненте `Layout`, поэтому стиль одинаков по всему сайту. Затем он добавляет заголовок сообщения и содержимое сообщения. Вы можете добавить все, что хотите, и можете запросить здесь, например, изображение объекта, мета-запись, пользовательские поля и т. д.

Ниже вы можете увидеть запрос GraphQL, вызывающий конкретную запись на основе `$slug`. Эта переменная передается в шаблон `blog-post.js`, когда страница создается в `gatsby-node.js`. Для этого добавьте следующий код в файл `gatsby-node.js`:

```js:title=gatsby-node.js
const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
    {
      allWordpressPost(sort: { fields: [date] }) {
        edges {
          node {
            title
            excerpt
            content
            slug
          }
        }
      }
    }
  `).then(result => {
    //highlight-start
    result.data.allWordpressPost.edges.forEach(({ node }) => {
      createPage({
        path: node.slug,
        component: path.resolve(`./src/templates/blog-post.js`),
        context: {
          // This is the $slug variable
          // passed to blog-post.js
          slug: node.slug,
        },
      })
    })
    //highlight-end
  })
}
```

Остановите и запустите среду разработки снова, используя `gatsby develop`. Когда вы это сделаете, то не увидите изменений на индексной странице сайта, но если перейдете на страницу 404, например `http://localhost:8000/asdf`, увидите два созданных поста и возможность нажать на них, чтобы перейти к примеру поста:

![Пример ссылок на посты](https://www.gatsbyjs.org/4293822ecf92f5dfc62eef6c01870224/wordpress-source-plugin-sample-post-links.gif)

Но никому не нравится заходить на страницу 404, чтобы найти пост в блоге! Итак, давайте свяжем их с домашней страницей.

### Связывание поста с главной страницей.

Поскольку вы уже имеете структуру и запрос для страницы `index.js`, то используйте компонент `Link` для обертывания заголовков.

Откройте `src/pages/index.js` еще раз и добавьте следующее:

```jsx:title=src/pages/index.js
import React from "react"
import { Link, graphql } from "gatsby" //highlight-line
import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({ data }) => {
  return (
    <Layout>
      <SEO title="home" />
      <h1>My WordPress Blog</h1>
      <h4>Posts</h4>
      {data.allWordpressPost.edges.map(({ node }) => (
        <div key={node.slug}>
          //highlight-start
          <Link to={node.slug}>
            <p>{node.title}</p>
          </Link>
          //highlight-end
          <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
        </div>
      ))}
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    allWordpressPost(sort: { fields: [date] }) {
      edges {
        node {
          title
          excerpt
          slug
        }
      }
    }
  }
`
```

Когда вы обернете заголовок в компоненте `Link` и сошлетесь на слаг поста, Gatsby добавит немного магии в ссылку, предварительно загрузит ее и сделает переход между страницами невероятно быстрым:

![Конечный продукт со ссылками с главной страницы на посты в блоге](https://www.gatsbyjs.org/0b343004a523df5633da47bed95eecab/wordpress-source-plugin-home-to-post-links.gif)

### Заканчиваю работу.

Вы можете применить ту же процедуру вызывая и создавая страницы, пользовательские типы записей, пользовательские поля, таксономии и прочий интересный и гибкий контент, которым славится WordPress.