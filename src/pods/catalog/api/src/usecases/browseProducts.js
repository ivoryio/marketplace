const _ = require('lodash')

module.exports = repo => async searchParams => {
  if (searchParams.filter && searchParams.brand && searchParams.model) {
    try {
      let result = await repo.searchByBrandAndModel(searchParams.brand, searchParams.model)

      result = (_.orderBy(result, ['createdAt'], ['desc']))
      return result
    } catch (err) {
      throw err
    }
  } else if (searchParams.brand && searchParams.model) {
    try {
      const result = await repo.searchByBrandAndModel(searchParams.brand, searchParams.model)

      return result
    } catch (err) {
      throw err
    }
  } else if (searchParams.filter === 'newest') {
    try {
      let result = await repo.filterNewest()

      result = (_.orderBy(result, ['createdAt'], ['desc'])).slice(0, 20)
      return result
    } catch (err) {
      throw err
    }
  } else if (searchParams.filter === 'spotlight') {
    try {
      const result = await repo.filterSpotlight()

      return result
    } catch (err) {
      throw err
    }
  }

  throw new Error('No usecase found')
}
