const { assert } = require('chai')

const retrieveById = require('../../src/repository/retrieveById')
const retrieveProduct = require('../../src/usecases/retrieveProduct')

describe('Retrieve product', () => {
  it('should retrieve an item from dynamodb by id', async () => {
    const id = '1'

    const expectedItem = await retrieveProduct(retrieveById)(id)
    
    assert.isNotEmpty(expectedItem)
  })
})