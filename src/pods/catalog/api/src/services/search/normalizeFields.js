const moment = require('moment')

module.exports = item => {
  if (!Object.keys(item).includes('id')) {
    throw new Error(`The item provided doesn't have an id.`)
  }

  item.id = '1'
  item.brand = item.brand ? item.brand : ''
  item.model = item.model ? item.model : ''
  item.description = item.description ? item.description : ''
  item.gender = item.gender ? item.gender : ''
  item.imgsrc = item.imgsrc ? item.imgsrc : ''
  item.isspotlight = item.isspotlight ? item.isspotlight : ''
  item.price = item.price ? item.price : 0
  item.createdat = item.createdat ? moment(item.createdat).utc().format() : moment().utc().startOf('day').format()

  return item
}
