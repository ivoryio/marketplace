const moment = require('moment')

module.exports = document => {
  if (!Object.keys(document).includes('id')) {
    throw new Error(`The document provided doesn't have an id.`)
  }

  const fields = ['id', 'brand', 'model', 'description', 'gender', 'imgsrc', 'isspotlight', 'price', 'createdat']

  Object.keys(document).forEach(field => {
    if(!fields.includes(field)) {
      delete document[`${field}`]
    }
  })

  document.brand = document.brand ? document.brand : ''
  document.model = document.model ? document.model : ''
  document.description = document.description ? document.description : ''
  document.gender = document.gender ? document.gender : ''
  document.imgsrc = document.imgsrc ? document.imgsrc : ''
  document.isspotlight = document.isspotlight ? document.isspotlight : ''
  document.price = document.price ? document.price : 0
  document.createdat = document.createdat ? moment(document.createdat).utc().format() : moment().utc().startOf('day').format()
  return document
}
