const AWS = require('aws-sdk')

module.exports = (retrieveSecret) => async (query) => {
  const endpoints = await retrieveSecret(process.env.SEARCH_HOSTNAME_SECRET)
  const { searchEndpoint } = JSON.parse(endpoints)

  const cloudSearch = new AWS.CloudSearchDomain({ 
    endpoint: searchEndpoint,
    region: process.env.REGION
  })

  const searchResults = await cloudSearch.search(query).promise()

  return searchResults.hits.hit.map(result => {
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
}
