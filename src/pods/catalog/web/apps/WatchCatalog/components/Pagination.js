import React from 'react'
import { PropTypes } from 'prop-types'
import { Icon, Typography } from '@ivoryio/kogaio'

import { SquaredBox } from '.'

const Pagination = ({ currentPage, maxPages, setCurrentPage }) => {
  const _decrement = ev =>
    currentPage === 1 ? ev.preventDefault() : setCurrentPage(currentPage - 1)

  const _jump = direction => ev => {
    const HOPPER = 10
    if (direction === 'back') {
      if (currentPage - HOPPER < 1) {
        return setCurrentPage(1)
      }
      setCurrentPage(currentPage - HOPPER)
    } else {
      if (currentPage + HOPPER > maxPages) {
        return setCurrentPage(maxPages)
      }
      setCurrentPage(currentPage + HOPPER)
    }
  }

  const _jumpToPage = pageNumber => () => setCurrentPage(pageNumber)
  const _increment = ev =>
    currentPage === maxPages
      ? ev.preventDefault()
      : setCurrentPage(currentPage + 1)

  const isOneOfLastTwo = [maxPages, maxPages - 1].includes(currentPage)
  const isMaxPagesOneOrTwo = [1, 2].includes(maxPages)

  const _pickContentOfFirstBox = () => {
    if (maxPages === 2 && currentPage === 2) {
      return currentPage - 1
    } else if (!isOneOfLastTwo || currentPage === 1) {
      return currentPage
    }
    return '...'
  }
  const _pickContentOfSecondBox = () => {
    if (currentPage === 2 && maxPages === 2) {
      return currentPage
    } else if (!isOneOfLastTwo || maxPages === 2) {
      return currentPage + 1
    }
    return maxPages - 2
  }
  return (
    <>
      <SquaredBox onClick={_decrement}>
        <Icon color='pastel-blue' fontSize={1} name='arrow_back' />
      </SquaredBox>
      <SquaredBox
        bg={!isOneOfLastTwo || currentPage === 1 ? 'green' : 'transparent'}
        onClick={
          isOneOfLastTwo && !isMaxPagesOneOrTwo ? _jump('back') : _decrement
        }>
        <Typography color='pastel-blue' fontSize={1}>
          {_pickContentOfFirstBox()}
        </Typography>
      </SquaredBox>
      {maxPages !== 1 ? (
        <SquaredBox
          bg={currentPage === 2 && maxPages === 2 ? 'green' : 'transparent'}
          onClick={
            !isOneOfLastTwo || maxPages === 2
              ? _increment
              : _jumpToPage(maxPages - 2)
          }>
          <Typography color='pastel-blue' fontSize={1}>
            {_pickContentOfSecondBox()}
          </Typography>
        </SquaredBox>
      ) : null}
      {!isMaxPagesOneOrTwo ? (
        <>
          <SquaredBox
            bg={currentPage === maxPages - 1 ? 'green' : 'transparent'}
            onClick={!isOneOfLastTwo ? _jump('forward') : _decrement}>
            <Typography color='pastel-blue' fontSize={1}>
              {!isOneOfLastTwo ? '...' : maxPages - 1}
            </Typography>
          </SquaredBox>
          <SquaredBox
            bg={currentPage === maxPages ? 'green' : 'transparent'}
            onClick={_jumpToPage(maxPages)}>
            <Typography color='pastel-blue' fontSize={1}>
              {maxPages}
            </Typography>
          </SquaredBox>
        </>
      ) : null}
      <SquaredBox onClick={_increment}>
        <Icon color='pastel-blue' fontSize={1} name='arrow_forward' />
      </SquaredBox>
    </>
  )
}

Pagination.propTypes = {
  currentPage: PropTypes.number,
  maxPages: PropTypes.number,
  setCurrentPage: PropTypes.func
}

Pagination.defaultProps = {
  maxPages: 50
}

export default Pagination
