
module.exports = searchService => async (searchText, filter, searchOptions) => {
  const searchResult = await searchService.search(searchText, filter, searchOptions)
  return searchResult
}
