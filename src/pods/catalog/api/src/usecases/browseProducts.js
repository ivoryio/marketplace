const CloudSearchDomain = require('aws-sdk/clients/cloudsearchdomain')

module.exports = (retrieveSecret) => async (query) => {
  const region = process.env.REGION

  const endpoints = await retrieveSecret(process.env.SEARCH_HOSTNAME_SECRET)
  const { searchEndpoint } = JSON.parse(endpoints)

  const csd = new CloudSearchDomain({ 
    region,
    endpoint: searchEndpoint
  })

  const searchResults = await csd.search(query).promise()

  let items = searchResults.hits.hit.map(result => {
    let object = {}
    for(let i in result.fields) {
      object[`${i}`] = result.fields[i][0]
    }

    object = {
      ...object,
      createdAt: object.createdat,
      imgSrc: object.imgsrc,
      isSpotlight: object.isspotlight
    }

    delete object.createdat
    delete object.isspotlight
    delete object.imgsrc

    return object
  })

  return {
    items,
    itemsCount: searchResults.hits.found
  }
}
