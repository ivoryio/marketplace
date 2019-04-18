module.exports = (queryString) => {

  return {
    query: queryString && queryString.q ? queryString.q : 'ivory|-ivory',
    size: queryString && queryString.limit ? queryString.limit : 10,
    start: queryString && queryString.start ? queryString.start : 0,
    filterQuery: createFilterQuery(queryString),
    sort: queryString && queryString.sortBy ? queryString.sortBy.replace('.', ' ') : 'createdat desc'
  }

  function createFilterQuery (queryString) {
    if(!queryString) {
      return null
    }

      let query = []
      if(queryString.model) {
        query.push(`(and field='model' '${queryString.model}')`)
      }
      if(queryString.brand) {
        query.push(`(and field='brand' '${queryString.brand}')`)
      }
      if(queryString.gender) {
        query.push(`(and field='gender' '${queryString.gender}')`)
      }
      if(queryString.isspotlight) {
        query.push(`(and field='isspotlight' '${queryString.isspotlight}')`)
      }
      if(query.length > 1) {
        query.unshift('(and')
        query.push(')')
      }

      if(query.length > 0) {
        return query.join('')
      }
      return null
  }
}