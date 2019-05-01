export const composeSearchTerm = activeFilters => {
  const { query, brands, models, genders  } = activeFilters
  const brandsTerm = brands.length !== 0 ? `&&brand=${brands.join()}` : ''
  const modelsTerm = models.length !== 0 ? `&&model=${models.join()}` : ''
  const gendersTerm = genders.length !== 0 ? `&&gender=${genders.join()}` : ''

  return `${query}${brandsTerm}${modelsTerm}${gendersTerm}`
}

export const transformActiveFiltersToArray = activeFilters => {
  const { query } = activeFilters
  const filterCategories = Object.keys(activeFilters).filter(category => category !== "query")
  let array = [query]
  filterCategories.forEach(category => {
    if (category.length !== 0) {
      array = [...array, ...activeFilters[category]]
    }
  })
  return array
}

export const categoryProvenience = (filter, activeFilters) => {
  let result = null
  const filterCategories = Object.keys(activeFilters)
  filterCategories.forEach(category => {
    if(activeFilters[category].includes(filter)){
      result = category 
    }
  })
  return result
}
