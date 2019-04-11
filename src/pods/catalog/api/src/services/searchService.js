const AWS = require('aws-sdk')

function CloudSearch () {
  const endpoint = 'search-catalog-search-jrxzovqvu6v6al7zuptwh27tiy.us-east-1.cloudsearch.amazonaws.com'
  const cloudSearch = new AWS.CloudSearchDomain({ endpoint })
  
  return {
    search
  }
   
  async function search (searchText, filter, searchOptions) {
    const params = getParams(searchText, filter, searchOptions)
    let searchResult = await cloudSearch.search(params).promise()
  
    return searchResult.hits.hit.map(result => {
      let object = {}
      for(let i in result.fields) {
        object[`${i}`] = result.fields[i][0]
      }
      return object
    })

    function getParams (searchText, filter, {size, start}) {
      const query = searchText ? searchText : 'ivory|-ivory' // ivory|-ivory means all documents that have ivory and all documents that don't have ivory i.e. all documents
      const defaultSize = 10
      const defaultStart = 0
      const simpleSearch = {
        query,
        size: size ? size: defaultSize,
        start: start ? start : defaultStart
      }
      const searchNewest = {
        query,
        sort: 'createdat desc',
        size: size ? size : defaultSize
      }
      const searchSpotlight = {
        query,
        filterQuery: `(and field='isspotlight' 'true')`,
        size: size ? size: defaultSize,
        start: start ? start : defaultStart
      }
  
      if(filter) {
        return filter === 'newest' ? searchNewest : searchSpotlight
      } else {
        return simpleSearch
      }
    }
  }
 
}

module.exports = new CloudSearch()
