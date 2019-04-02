const _ = require('lodash')

module.exports = repo => async searchParams => {
  if (searchParams.filter && searchParams.brand && searchParams.model) {
    let result = await repo.searchByBrandAndModel(searchParams.brand, searchParams.model)

    result = (_.orderBy(result, ['createdAt'], ['desc']))
    return result
  } else if (searchParams.brand && searchParams.model) {
    const result = await repo.searchByBrandAndModel(searchParams.brand, searchParams.model)

    return result
  } else if (searchParams.filter) {
    let result = await repo.filterNewest()

    result = (_.orderBy(result, ['createdAt'], ['desc'])).slice(0, 20)
    return result
  }
  throw new Error('No usecase found')
}
