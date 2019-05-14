const uuid = require('uuid/v1')
const moment = require('moment')
const Joi = require('@hapi/joi')
const shortid = require('shortid')

module.exports = (create) => async (product) => {
  const schema = Joi.object().keys({
    brand: Joi.string().regex(/^([a-zA-Z0-9 -]+){3,30}$/).required(),
    model: Joi.string().regex(/^([a-zA-Z0-9 -]+){3,30}$/).required(),
    imgSrc: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string().min(10).max(1000).required(),
    referenceNumber: Joi.string().required(),
    year: Joi.number(),
    gender: Joi.string(),
    caliber: Joi.object(),
    case: Joi.object(),
    strap: Joi.object(),
    imgList: Joi.array()
  })

  const { error } = Joi.validate(product, schema)

  if(error) {
    throw error
  }
  product.id = uuid()
  product.listingNumber = shortid.generate()
  product.createdAt = moment(Date.now()).utc().format()

  const result = await create(product)

  return result
}