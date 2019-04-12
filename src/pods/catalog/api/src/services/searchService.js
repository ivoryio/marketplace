const AWS = require('aws-sdk')

function CloudSearch (seacretService) {  
  return {
    search
  }
  
  async function search (searchText, filter, searchOptions) {
    const endpoints = await seacretService.retrieve(process.env.SEARCH_HOSTNAME_SECRET)
    let { searchEndpoint } = JSON.parse(endpoints)
    const cloudSearch = new AWS.CloudSearchDomain({ endpoint: searchEndpoint })
   

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

module.exports = CloudSearch
