module.exports = (retrieveById) => async (id) => {
  const result = await retrieveById(id)

  return result
}