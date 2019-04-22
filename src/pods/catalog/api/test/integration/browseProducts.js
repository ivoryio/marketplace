const assert = require('assert')

const retrieveSecret = require('../../src/services/retrieveSecret')
const browseProducts = require('../../src/usecases/browseProducts')
const queryTranslate = require('../../src/services/search/queryTranslate')

describe('Browse products', () => {
  it('should retrieve items from cloudsearch', async () => {
    const query = {
      q: 'rolex',
      model: 'datejust,daytona'
    }

    const searchQuery = queryTranslate(query)
    const result = await browseProducts(retrieveSecret)(searchQuery)

    assert.equal(result.length > 0, true)
  })
})