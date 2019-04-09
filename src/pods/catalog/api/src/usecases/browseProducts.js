
module.exports = (repo, searchService) => async (searchText, filter) => {
  const ids = await searchService.search(searchText, filter)
  const searchResult = await repo.queryByIds(ids)
  return searchResult
}
