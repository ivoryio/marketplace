const moment = require('moment')
const { assert } = require('chai')

const normalize = require('../../src/services/search/normalizeFields')

describe('normalize()', () => {
  it(`should throw an exception when the object doesn't have an id`, () => {
    const actualItem = {}

    assert.throws(() => normalize(actualItem), Error)
  })
  it(`should return an object with all fields having default values`, () => {
    const actualItem = { id: '1' }

    const exptectedItem = normalize(actualItem)

    assert.deepEqual(actualItem, exptectedItem)
  })
  it('should return return an object with default values for missing fields ', () => {
    const inputItem = { 
      id: '1',
      brand: 'rolex',
      model: 'submariner',
      description: 'nice watch',
      gender: 'male',
      imgsrc: 'img',
      isspotlight: 'true'
    }
    const exptectedItem = {
      id: '1',
      brand: 'rolex',
      model: 'submariner',
      description: 'nice watch',
      gender: 'male',
      imgsrc: 'img',
      isspotlight: 'true',
      price: 0,
      createdat: moment().utc().startOf('day').format()
  }

    const actualItem = normalize(inputItem)

    assert.deepEqual(actualItem, exptectedItem)
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