const AWS = require('aws-sdk')

function CloudSearch (seacretService) {  
  return {
    search,
    translate
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
 
  function translate (queryString) {
    const query = queryString.q ? queryString.q : 'ivory|-ivory'
    const size = queryString.limit ? queryString.limit : 100
    const start = queryString.start ? queryString.start : 0
    const sortBy = queryString.sortBy ? queryString.sortBy : 'createdat asc'


    let options = []
    const filters = ['brand', 'model', 'gender']

    filters.forEach(filter => {
      if(queryString.hasOwnProperty(filter)) {
        options.push(`(and field='${filter}' '${queryString[filter]}')`)
      }

    })
    const filterQuery = options.length > 0 ? `(and ${options.join('')})` : undefined
    const sort = sortBy.split('.').join(' ')

    return {
      query,
      filterQuery,
      sort,
      size,
      start
    }
  }
}

module.exports = CloudSearch
