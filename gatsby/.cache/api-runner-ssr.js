var plugins = [{
      plugin: require('C:/Users/Derek/coding-bootcamp/Udemy Course/Wes Bos/pizza-site-gatsby-react/gatsby/node_modules/gatsby-plugin-styled-components/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('C:/Users/Derek/coding-bootcamp/Udemy Course/Wes Bos/pizza-site-gatsby-react/gatsby/node_modules/gatsby-source-sanity/gatsby-ssr'),
      options: {"plugins":[],"projectId":"vxv6h2pe","dataset":"production","watchMode":true,"token":"skQ78Te3MfDXTxTsAGxllJta7WgqO70TaI7ahXipltffS1mxMSSxbHjwZdYcmkxj3x8jNlgioMBcymmnI2UDWN1Uqi68kesN6lFyHKCjSO0bmQhlDGsbqqQ5BLk16R7rMeXuawKQ8dmFKJv7PNf518DMff3IKDUrAhxUE1we5XYNR9fbl0vh"},
    },{
      plugin: require('C:/Users/Derek/coding-bootcamp/Udemy Course/Wes Bos/pizza-site-gatsby-react/gatsby/gatsby-ssr'),
      options: {"plugins":[]},
    }]
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn, argTransform) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  // Run each plugin in series.
  // eslint-disable-next-line no-undef
  let results = plugins.map(plugin => {
    if (!plugin.plugin[api]) {
      return undefined
    }
    const result = plugin.plugin[api](args, plugin.options)
    if (result && argTransform) {
      args = argTransform({ args, result })
    }
    return result
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else {
    return [defaultReturn]
  }
}
