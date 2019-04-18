const assert = require('assert')

const queryTranslate = require('../../src/services/search/queryTranslate')
const retrieveSecret = require('../../src/services/retrieveSecret')
const browseProducts = require('../../src/usecases/browseProducts')

describe('Browse products', () => {
  it('should retrieve items from cloudsearch', async () => {
    const query = {
      q: 'rolex men',
      model: 'submariner'
    }

    const searchQuery = queryTranslate(query)
    const result = await browseProducts(retrieveSecret)(searchQuery)

    assert.equal(result.length > 0, true)
  })
})