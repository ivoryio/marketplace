const AWS = require('aws-sdk')

function CloudSearch () {
  const endpoint = 'search-catalog-search2-yphbjo3v7pzzjianrlkns2ldp4.us-east-1.cloudsearch.amazonaws.com'
  const cloudSearch = new AWS.CloudSearchDomain({ endpoint })

  const search = async text => {
    const params = {
      query: text,
      queryParser: 'simple',
      queryOptions: '{fields:["brand", "model", "description"]}'
    }
    try {
      let result = await cloudSearch.search(params).promise()
      return result
    } catch (err) {
      throw err
    }
  }

  return {
    search
  }
}

module.exports = new CloudSearch()
