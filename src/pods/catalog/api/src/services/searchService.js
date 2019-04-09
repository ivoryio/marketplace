const AWS = require('aws-sdk')

function CloudSearch () {
  const endpoint = 'search-catalog-search-jrxzovqvu6v6al7zuptwh27tiy.us-east-1.cloudsearch.amazonaws.com'
  const cloudSearch = new AWS.CloudSearchDomain({ endpoint })
  
  const getParams = (searchText, filter) => {
    const query = searchText ? searchText : 'ivory|-ivory' // ivory|-ivory means all documents that have ivory and all documents that don't have ivory i.e. all documents
    const simpleSearch = {
      query,
      return: 'id'
    }
    const searchNewest = {
      query,
      sort: 'createdat desc',
      return: 'id'
    }
    const searchSpotlight = {
      query,
      filterQuery: `(and field='isspotlight' 'true')`,
      return: 'id'
    }

    if(filter) {
      return filter === 'newest' ? searchNewest : searchSpotlight
    } else {
      return simpleSearch
    }
  }
  
  const search = async (searchText, filter) => {
    const params = getParams(searchText, filter)

    let results = await cloudSearch.search(params).promise()
    const ids = results.hits.hit.map(itemFound => itemFound.fields.id[0])
    return ids
  }

  return {
    search
  }
}

module.exports = new CloudSearch()
