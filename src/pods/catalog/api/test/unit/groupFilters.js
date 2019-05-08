const { assert } = require('chai')

const groupFilters = require('../../src/services/search/groupFilters')

describe('Group filters', searchresult => {
  it('should return an object with options filters for the search query', () => {
    const inputItem = [{
        description: 'For true women',
        isspotlight: 'true',
        price: '4000',
        id: '301',
        imgsrc:
          'https://s3.amazonaws.com/peoplepng/wp-content/uploads/2018/06/26130734/Rolex-Transparent-Background-PNG-545x1024.png',
        model: 'DateJust',
        brand: 'Rolex',
        createdat: '2019-04-09T10:40:13.637Z',
        gender: 'Men'
      },
      {
        description: 'Give it a spin!',
        isspotlight: 'true',
        price: '2250',
        id: '302',
        imgsrc:
          'https://images.rolex.com/2019/catalogue/images/upright-bba-with-shadow/m128348rbr-0005.png?impolicy=upright-grid-card&imwidth=585',
        model: 'Daytona',
        brand: 'Rolex',
        createdat: '2019-04-08T10:40:13.637Z',
        gender: 'Women'
      },
      {
        description: 'Give it a spin!',
        isspotlight: 'true',
        price: '2250',
        id: '302',
        imgsrc:
          'https://images.rolex.com/2019/catalogue/images/upright-bba-with-shadow/m128348rbr-0005.png?impolicy=upright-grid-card&imwidth=585',
        model: 'Portofino',
        brand: 'IWC',
        createdat: '2019-04-08T10:40:13.637Z',
        gender: 'Women'
      }]
    const expectedItem = {
      brands: ['Rolex', 'IWC'],
      models: ['DateJust', 'Daytona', 'Portofino'],
      genders: ['Men', 'Women']
    }
    
    const actualItem = groupFilters(inputItem)

    assert.deepEqual(actualItem, expectedItem)
  })
})
