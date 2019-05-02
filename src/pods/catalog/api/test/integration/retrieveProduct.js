const { assert } = require('chai')

const productRepo = require('../../src/repository/product')
const retrieveProduct = require('../../src/usecases/retrieveProduct')

describe('Retrieve product', () => {
  it('Should retrieve an item from dynamodb by id', async () => {
    const id = 'c9bb4f70-6763-11e9-8fed-7f54509066b0'

    const expectedItem = await retrieveProduct(productRepo)(id)
    
    assert.isNotEmpty(expectedItem)
  })
})