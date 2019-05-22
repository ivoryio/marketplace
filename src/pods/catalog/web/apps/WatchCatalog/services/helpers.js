export const makeSlices = (items, sliceLength) => {
  let result = []
  let slicingStart = 0
  while(slicingStart < items.length) {
    let slice = items.slice(slicingStart, slicingStart + sliceLength)
    result.push(slice)
    slicingStart += sliceLength
	}
  return result 
}

export const composeSearchTerm = activeFilters => {
  const { query, brands, models, genders } = activeFilters
  const brandsTerm = brands.length !== 0 ? `&brand=${brands.join()}` : ''
  const modelsTerm = models.length !== 0 ? `&model=${models.join()}` : ''
  const gendersTerm = genders.length !== 0 ? `&gender=${genders.join()}` : ''

  return `${query}${brandsTerm}${modelsTerm}${gendersTerm}`
}

export const sortWatches = (sortType, watches) => {
  if (sortType === 'Price Low - High') {
    const items = [...watches]
    items.sort(function (a,b) {
      return Number(a.price) - Number(b.price)
    })
    return items
  } else if (sortType === 'Price High - Low') {
    const items = [...watches]
    items.sort(function (a,b) {
      return Number(b.price) - Number(a.price)
    })
    return items
  } else if (sortType === 'Newest') {
    const items = [...watches]
    items.sort(function (a,b) {
      let dateA = new Date(a.createdAt),
          dateB = new Date(b.createdAt)
      return dateB - dateA
    })
    return items
  }
    const items = [...watches]
    items.sort(function (a,b) {
      let dateA = new Date(a.createdAt),
          dateB = new Date(b.createdAt)
      return dateA - dateB
    })
    return items
}

export const transformActiveFiltersToArray = activeFilters => {
  const filterCategories = Object.keys(activeFilters).filter(category => category !== "query")
  let array = []
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

export const capitalizeFirstChar = string => string.charAt(0).toUpperCase() + string.slice(1)
export const formatPrice = number => number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
export const transformCamelToSentence = text => {
  let result = text.replace( /([A-Z])/g, " $1" )
  let indexOfBackslash = result.indexOf('/')
  result = indexOfBackslash === -1 ? result : result.slice(0, indexOfBackslash + 1) + result[indexOfBackslash + 1].toUpperCase() + result.slice(indexOfBackslash + 2)
  let finalResult = capitalizeFirstChar (result)
  return finalResult
}