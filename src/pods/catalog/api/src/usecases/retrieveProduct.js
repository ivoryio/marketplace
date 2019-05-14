const Joi = require('@hapi/joi')

module.exports = (retrieveById) => async (id) => {
  const schema = Joi.string().guid({ version: 'uuidv1'})

  const { error } = Joi.validate(id, schema)

  if(error){
    throw error
  }

  const result = await retrieveById(id)

  return result
}