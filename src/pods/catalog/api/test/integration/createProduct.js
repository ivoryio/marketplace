const AWS = require('aws-sdk')
const { assert } = require('chai')

const create = require('../../src/repository/create')
const createProduct = require('../../src/usecases/createProduct')

describe('Create product', () => {
  beforeEach(() => {
    const credentials = new AWS.SharedIniFileCredentials({profile: 'marketplace'})
    AWS.config.credentials = credentials
  })

  it('should return a product with the created fields', async () => {
    const inputItem = {
      brand: 'Rolex',
      model: 'Daytona',
      imgSrc: 'https://b34959663f5a3997bd0d-2668915a1d3a077262c88fab6aa0aa02.ssl.cf3.rackcdn.com/17310684_1_640.jpg',
      price: 2000,
      description: 'The classic Rolex Datejust is the archetype of the modern watch, thanks to aesthetics and functions that transcend changes in fashion. Aesthetically, the Datejust has spanned eras, while retaining the enduring codes that make it one of the most recognized and recognizable of watches.',
      referenceNumber: 'I__rsAmjAt'
    }

    const expectedItem = await createProduct(create)(inputItem)

    assert.property(expectedItem, 'id')
    assert.property(expectedItem, 'listingNumber')
    assert.property(expectedItem, 'createdAt')
  })
  it('should return a Joi validation error', async () => {
    const inputItem = {
      brand: 'Rolex...',
      model: 'Daytona',
      imgSrc: 'https://b34959663f5a3997bd0d-2668915a1d3a077262c88fab6aa0aa02.ssl.cf3.rackcdn.com/17310684_1_640.jpg',
      price: 2000,
      description: 'The classic Rolex Datejust is the archetype of the modern watch, thanks to aesthetics and functions that transcend changes in fashion. Aesthetically, the Datejust has spanned eras, while retaining the enduring codes that make it one of the most recognized and recognizable of watches.',
      referenceNumber: 'I__rsAmjAt'
    }

    try {
      await createProduct(create)(inputItem)
    }
    catch (err) {
      assert.equal(err.name, 'ValidationError')
    }
  })
})