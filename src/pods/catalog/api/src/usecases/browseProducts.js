const _ = require('lodash')

module.exports = (repo, searchService) => async searchParams => {
  if (searchParams.filter === 'newest') {
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
  } else if (searchParams.query) {
    try {
      let searchResult = await searchService.search(searchParams.query)
      let ids = searchResult.hits.hit.map(item => item.fields.id[0])
      if (ids.length === 0) return []

      let result = await repo.queryByIds(ids)
      return result
    } catch (err) {
      throw err
    }
  }

  throw new Error('No usecase found')
}
