---
title: Gatsby без GraphQL
date: 2020-02-24
---

Большинство примеров в документах Gatsby и в интернете в целом сосредоточены на использовании source плагинов для управления данными на Gatsby сайтах. Однако source плагины (или даже узлы Gatsby) не являются строго необходимыми для извлечения данных на Gatsby сайт! Также можно использовать подход “неструктурированных данных" на Gatsby сайтах, не требующий GraphQL.

> Примечание: для наших целей здесь “неструктурированные данные" означают данные, "обрабатываемые вне слоя данных Gatsby" (мы используем данные непосредственно, а не преобразуем их в узлы Gatsby).

## Подход: извлечение данных и использование Gatsby API `createPages`

> _Примечание_: этот пример взят из репозитория, построенного специально для моделирования того, как использовать этот подход "неструктурированных данных". [Просмотр полного репозитория на GitHub](https://github.com/jlengstorf/gatsby-with-unstructured-data).

В вашем Gatsby проекте файл `gatsby-node.js`, извлекает необходимые данные, и передает его в экшен `createPage` внутри API `createPages`:

```javascript:title=gatsby-node.js
exports.createPages = async ({ actions: { createPage } }) => {
  // `getPokemonData` - это функция, которая получает наши данные
  const allPokemon = await getPokemonData(["pikachu", "charizard", "squirtle"])

  // Создает страницу со списком всех Pokémon.
  createPage({
    path: `/`,
    component: require.resolve("./src/templates/all-pokemon.js"),
    context: { allPokemon }, // highlight-line
  })

  // Создает страницу для каждого Pokémon.
  allPokemon.forEach(pokemon => {
    createPage({
      path: `/pokemon/${pokemon.name}/`, // highlight-line
      component: require.resolve("./src/templates/pokemon.js"),
      context: { pokemon }, // highlight-line
    })
  })
}
```

- `createPages` - это [Gatsby Node API](https://www.gatsbyjs.org/docs/node-apis/#createPages). Он подключается к определенной точке в [Gatsby's bootstrap sequence](https://www.gatsbyjs.org/docs/gatsby-lifecycle-apis/#bootstrap-sequence).
- [Экшен `createPage`] (https://www.gatsbyjs.org/docs/actions/#createPage) - это то, что фактически создает страницу.

В выделенных строках данные передаются в шаблон страницы, где они могут быть доступны в качестве пропов:

```jsx:title=/src/templates/pokemon.js
// highlight-next-line
export default ({ pageContext: { pokemon } }) => (
  <div style={{ width: 960, margin: "4rem auto" }}>
    {/* highlight-start */}
    <h1>{pokemon.name}</h1>
    <img src={pokemon.sprites.front_default} alt={pokemon.name} />
    {/* highlight-end */}
    <h2>Abilities</h2>
    <ul>
      {/* highlight-start */}
      {pokemon.abilities.map(ability => (
        <li key={ability.name}>
          <Link to={`./pokemon/${pokemon.name}/ability/${ability.name}`}>
            {ability.name}
            {/* highlight-end */}
          </Link>
        </li>
      ))}
    </ul>
    <Link to="/">Back to all Pokémon</Link>
  </div>
)
```

## Когда использование "неструктурированных данных" может иметь смысл?

Вы можете найти этот подход полезным, когда использование слоя данных Gatsby кажется вам слишком тяжелым для вашего проекта.

## Плюсы использования неструктурированных данных

- Подход знаком и удобен, особенно если вы новичок в GraphQL
- Нет никакого промежуточного шага: вы получаете некоторые данные, а затем строите страницы с ними

## Компромиссы предшествующего слоя данных Gatsby

Использование слоя данных Gatsby дает следующие преимущества:

- Позволяет декларативно указать, какие данные необходимы компоненту страницы, наряду с компонентом страницы
- Устраняет шаблонный интерфейс данных -- нет необходимости беспокоиться о запросе и ожидании данных. Просто запросите необходимые данные с помощью запроса GraphQL, и он появится, когда вам это нужно
- Повышает сложность интерфейса в запросах — многие преобразования данных могут быть выполнены во время сборки в запросах GraphQL
- Это идеальный язык запросов данных для часто сложных / вложенных зависимостей данных современных приложений . 
- Улучшает производительность за счет удаления вздутия данных -- GraphQL является большой частью того, Почему Gatsby так быстро, как это позволяет ленивая-загрузка точных данных в точной форме, необходимой для каждого представления
- Позволяет вам использовать преимущества горячей перезагрузки при разработке; например, в примере этого поста "Pokémon" сайт, если вы хотите добавить раздел "see other pokémon" в детальный вид покемонов, вам нужно будет изменить свой `gatsby-node.js` для передачи всех покемонов на страницу и перезапуска сервера dev. В отличие от этого, при использовании запросов, вы можете добавить запрос, и он выполнит горячую перезагрузку.

> Подробнее о [GraphQL in Gatsby](https://www.gatsbyjs.org/docs/graphql/).

Работа вне слоя данных также означает отказ от оптимизации, обеспечиваемой плагинами transformer, такими как:

- [`gatsby-image`](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-image) (быстрая оптимизация изображений),
- [`gatsby-transformer-sharp`](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-transformer-sharp) (предоставляет запрашиваемые поля для обработки изображений различными способами, включая изменение размера, обрезку и создание адаптивных изображений),
- ... вся экосистема Gatsby официальных и созданных сообществом плагинов [transformer plugins] (https://www.gatsbyjs.org/plugins/?=transformer).

Еще одна сложность, добавляемая при работе с неструктурированными данными, заключается в том, что ваш код еще более разрастается, когда вы извлекаете данные из нескольких мест.

## Рекомендация Gatsby

Если вы создаете небольшой сайт, одним из эффективных способов его создания является извлечение неструктурированных данных, как описано в этом руководстве, с помощью API `createPages`, а затем, если сайт становится более сложным позже, вы переходите к созданию более сложных сайтов, или вы хотите преобразовать свои данные, выполните следующие действия:

1.  Проверьте библиотеку [Plugin Library] (https://www.gatsbyjs.org/plugins/), чтобы узнать, существуют ли исходные плагины и/или плагины-трансформеры, которые вы хотите использовать
2.  Если они не существуют, прочитайте руководство [Creating Plugins](https://www.gatsbyjs.org/docs/creating-plugins/) и подумайте о создании собственного!

## Дальнейшее чтение

- Руководство [использование Gatsby без GraphQL](https://www.gatsbyjs.org/blog/2018-10-25-using-gatsby-without-graphql/)
- [Почему Gatsby использует GraphQL](https://www.gatsbyjs.org/docs/why-gatsby-uses-graphql/)

ИСТОЧНИКИ:

Перевод статьи (примерный!) [Gatsby without GraphQL](https://www.gatsbyjs.org/docs/using-gatsby-without-graphql/)