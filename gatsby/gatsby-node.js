import path from 'path';
import fetch from 'isomorphic-fetch';

async function turnPizzasIntoPages({ graphql, actions }) {
  // 1. Get a template for this page
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js');
  // 2. query all pizzas
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);
  // console.log(data);
  // 3. loop over each pizza and create a page for that pizza
  data.pizzas.nodes.forEach((pizza) =>
    actions.createPage({
      // what is the url for each page
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        slug: pizza.slug.current,
      },
    })
  );
}

async function turnToppingsIntoPages({ graphql, actions }) {
  // console.log(`turning the toppings into pages!!!`);
  // get template
  const toppingTemplate = path.resolve('./src/pages/pizzas.js');
  // query all the toppings
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
        }
      }
    }
  `);
  // create page for that topping
  data.toppings.nodes.forEach((topping) => {
    // console.log('creating page for each topping', topping.name);
    actions.createPage({
      path: `topping/${topping.name}`,
      component: toppingTemplate,
      context: {
        topping: topping.name,
        toppingRegex: `/${topping.name}/i`,
      },
    });
  });
  // pass topping data to pizza.js
}

async function fetchBeersAndTurnIntoNodes({
  actions,
  createNodeId,
  createContentDigest,
}) {
  // fetch list of beers
  const res = await fetch('https://sampleapis.com/beers/api/ale');
  const beers = await res.json();
  // loop over each one
  for (const beer of beers) {
    // create a node for that beer
    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        type: 'Beer',
        mediaType: 'application/json',
        contentDigest: createContentDigest(beer),
      },
    };

    actions.createNode({ ...beer, ...nodeMeta });
  }
}

async function turnSlicemastersIntoPages({ graphql, actions }) {
  // query all slicemasters
  const { data } = await graphql(`
    query {
      slicemasters: allSanityPeron {
        totalCount
        nodes {
          name
          id
          slug {
            current
          }
        }
      }
    }
  `);
  // turn each slicemaster into their own page
  // figure out how many pages there are based on how many slicemasters there are and how many per page.
  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
  console.log(pageSize, 'this is pageSize');
  const pageCount = Math.ceil(data.slicemasters.totalCount / pageSize);
  // loop from 1 to n and create the pages for them
  Array.from({ length: pageCount }).forEach((_, i) => {
    console.log(`Creating page ${i}`);
    actions.createPage({
      path: `/slicemasters/${i + 1}`,
      component: path.resolve('./src/pages/slicemasters.js'),
      context: {
        skip: i * pageSize,
        currentPage: i + 1,
        pageSize,
      },
    });
  });
}

export async function sourceNodes(params) {
  // fetch a list of beers and source them into our gatsby API!
  await Promise.all([fetchBeersAndTurnIntoNodes(params)]);
}

export async function createPages(params) {
  // create pages dynamicall

  // wait for all promises to be resolved before finishing this function
  await Promise.all([
    // 1.pizzas
    turnPizzasIntoPages(params),
    // 2.toppings
    turnToppingsIntoPages(params),
    turnSlicemastersIntoPages(params),
  ]);

  // slicemasters
}
