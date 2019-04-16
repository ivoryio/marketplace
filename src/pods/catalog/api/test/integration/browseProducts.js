const AWS = require('aws-sdk')
const assert = require('assert')

const queryTranslate = require('../../src/services/queryTranslate')

const cloudSearch = new AWS.CloudSearchDomain({
  endpoint: 'search-catalog-search-jrxzovqvu6v6al7zuptwh27tiy.us-east-1.cloudsearch.amazonaws.com',
  region: 'us-east-1'
})
describe('Browse products', () => {
  it('should retrieve items from cloudsearch', async () => {
    const query = {
      q: 'rolex men',
      model: 'submariner'
    }

    const searchQuery = queryTranslate(query)
    const result = await cloudSearch.search(searchQuery).promise()

    assert.equal(result.hits.hit.length > 0, true)
  })
})