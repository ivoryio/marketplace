const _ = require('lodash')

module.exports = repo => async searchParams => {
  if (searchParams.filter && searchParams.brand && searchParams.model) {
    let result = await repo.searchBy
    return result
  } else if (searchParams.brand && searchParams.model) {
    let result = await repo.searchByBrandAndModel(searchParams.brand, searchParams.model)
    return result
  } else if (searchParams.filter) {
    let result = await repo.searchByNewest()

    result = _.orderBy(result, ['createdAt'], ['desc'])
    return result
  }
  throw new Error('No usecase found')
}
