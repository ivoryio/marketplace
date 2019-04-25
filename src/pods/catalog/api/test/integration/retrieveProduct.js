const { assert } = require('chai')

const productRepo = require('../../src/repository/retrieveById')
const retrieveProduct = require('../../src/usecases/retrieveProduct')

describe('Retrieve product', () => {
  it('Should retrieve an item from dynamodb by id', async () => {
    const id = '1'

    const expectedItem = await retrieveProduct(productRepo)(id)
    
    assert.isNotEmpty(expectedItem)
  })
})