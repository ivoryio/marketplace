module.exports = (queryString) => {

  return {
    query: queryString && queryString.q ? queryString.q : 'ivory|-ivory',
    size: queryString && queryString.limit ? queryString.limit : 500,
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
        const models = queryString.model.split(',')
        models.forEach(model => query.push(`(and field='model' '${model}')`))
      }
      if(queryString.brand) {
        const brands = queryString.brand.split(',')
        brands.forEach(brand => query.push(`(and field='brand' '${brand}')`))
      }
      if(queryString.gender) {
        const genders = queryString.gender.split(',')
        genders.forEach(gender => query.push(`(and field='gender' '${gender}')`))
      }
      if(queryString.isspotlight) {
        query.push(`(and field='isspotlight' '${queryString.isspotlight}')`)
      }
      if(query.length > 1) {
        query.unshift('(or ')
        query.push(')')
      }

      if(query.length > 0) {
        return query.join('')
      }
      return null
  }
}