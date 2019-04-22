module.exports = (productRepo) => async (id) => {
  const result = await productRepo.retrieveById(id)

  return result
}