const AWS = require('aws-sdk')
const { assert } = require('chai')

const retrieveSecret = require('../../src/services/retrieveSecret')
const browseProducts = require('../../src/usecases/browseProducts')
const queryTranslate = require('../../src/services/search/queryTranslate')


describe('Browse products', () => {
  before(() => {
    const credentials = new AWS.SharedIniFileCredentials({profile: 'marketplace'})
    AWS.config.credentials = credentials
  })

  it('should retrieve items from cloudsearch', async () => {
    const query = {
      q: 'rolex',
      model: 'datejust,daytona'
    }
    
    const searchQuery = queryTranslate(query)
    const result = await browseProducts(retrieveSecret)(searchQuery)
    
    assert.isTrue(result.items.length > 0)
  })
  it('should return an object containing the number of items searched' , async () => {
    const query = {
      q: 'rolex',
      model: 'datejust,daytona'
    }
    const expectedProperty = 'itemsCount'

    const searchQuery = queryTranslate(query)
    const result = await browseProducts(retrieveSecret)(searchQuery)

    assert.property(result, expectedProperty)
  })
})
