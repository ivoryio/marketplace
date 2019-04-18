// const assert = require('assert')
const moment = require('moment')
const { assert } = require('chai')

const normalize = require('../../src/services/search/normalizeFields')

describe('normalize()', () => {
  it(`should throw an exception when the object doesn't have an id`, () => {
    const item = {}

    assert.throws(() => normalize(item), Error)
  })
  it(`should return an object with all fields having default values`, () => {
    const item = { id: '1' }

    const result = normalize(item)

    assert.equal(result.id, '1')
    assert.equal(result.brand, '')
    assert.equal(result.model, '')
    assert.equal(result.description, '')
    assert.equal(result.gender, '')
    assert.equal(result.imgsrc, '')
    assert.equal(result.isspotlight, '')
    assert.equal(result.price, 0)
    assert.equal(result.createdat, moment().utc().startOf('day').format())
  })
  it('should return return an object with default values for missing fields ', () => {
    const item = { 
      id: '1',
      brand: 'rolex',
      model: 'submariner',
      description: 'nice watch',
      gender: 'male',
      imgsrc: 'img',
      isspotlight: 'true'
    }

    const result = normalize(item)

    assert.deepEqual(result, {
        id: '1',
        brand: 'rolex',
        model: 'submariner',
        description: 'nice watch',
        gender: 'male',
        imgsrc: 'img',
        isspotlight: 'true',
        price: 0,
        createdat: moment().utc().startOf('day').format()
    })
  })
  it('should return an object with the normalized fields', () => {
    const inputItem = { 
      id: '1',
      brand: 'rolex',
      model: 'submariner',
      description: 'nice watch',
      gender: 'male',
      imgsrc: 'img',
      isspotlight: 'true',
      price: 225,
      createdat: 1554201373636
    }
    const exptectedItem = {
      ...inputItem,
      createdat: '2019-04-02T10:36:13Z'
    }
  
    const actualItem = normalize(inputItem)

    assert.deepEqual(actualItem, exptectedItem)
  })
  
})