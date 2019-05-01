const { uniq } = require('lodash')

module.exports = (searchResults) => {
  let brands = []
  let models = []
  let genders = []

  searchResults.forEach(result => {
    brands.push(result['brand'])
    models.push(result['model'])
    genders.push(result['gender'])
  })

  return {
    brands: uniq(brands),
    models: uniq(models),
    genders: uniq(genders)
  }
}