import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'

export const DetailsContext = createContext()

const INITIAL_DETAILS = {
  data: {},
  isFetching: true,
  error: null
}
const DetailsProvider = ({ children }) => {
  const [details, setDetails] = useState(INITIAL_DETAILS)

  const setIsFetching = status =>
    setDetails(prevDetails => ({ ...prevDetails, isFetching: status }))

  const storeDetails = details =>
    setDetails(prevDetails => ({
      ...prevDetails,
      data: details,
      isFetching: false
    }))
  const storeDetailsError = err =>
    setDetails(prevDetails => ({
      ...prevDetails,
      isFetching: false,
      error: err
    }))
  const clearDetails = () => setDetails(INITIAL_DETAILS)
  const {
    data: { imgList },
    isFetching
  } = details
  return (
    <DetailsContext.Provider
      value={{
        imgList,
        isFetching,
        setIsFetching,
        storeDetails,
        storeDetailsError,
        details: details.data,
        clearDetails
      }}>
      {children}
    </DetailsContext.Provider>
  )
}

DetailsProvider.propTypes = {
  children: PropTypes.element
}

export default DetailsProvider
