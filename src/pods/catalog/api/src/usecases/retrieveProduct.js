module.exports = (productRepo) => async (id) => {
  const result = await productRepo.retrieve(id)

  return result
}