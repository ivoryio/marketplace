const moment = require('moment')

module.exports = item => {
  if (!Object.keys(item).includes('id')) {
    throw new Error(`The document provided doesn't have an id.`)
  }

  let document = {
    id: item.id,
    price: item.price ? item.price : 0,
    brand: item.brand ? item.brand : '',
    model: item.model ? item.model : '',
    gender: item.gender ? item.gender : '',
    isspotlight: item.isSpotlight ? item.isSpotlight : '',
    description: item.description ? item.description : '',
    imgsrc : item.imgSrc ? item.imgSrc : '',
    createdat: item.createdAt ? moment(item.createdAt).utc().format() : moment().utc().startOf('day').format()
  }

  return document
}
