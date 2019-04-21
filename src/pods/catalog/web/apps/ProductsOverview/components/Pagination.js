import React from 'react'
import { PropTypes } from 'prop-types'
import { SquaredBox } from '.'
import { Icon, Typography } from '@ivoryio/kogaio'

const Pagination = ({ currPage, maxPages, setCurrentPage }) => {
  const _decrement = ev => {
    if (currPage === 1) {
      return ev.preventDefault()
    }
    setCurrentPage(currPage - 1)
  }

  const _jump = direction => ev => {
    const HOPPER = 10
    if (direction ==='back') {
      if (currPage - HOPPER < 1) {
        return setCurrentPage(1)
      }
      setCurrentPage(currPage - HOPPER)
    } else {
      if (currPage + HOPPER > maxPages) {
        return setCurrentPage(maxPages)
      }
      setCurrentPage(currPage + HOPPER)
    }
  }

  const _increment = ev => {
    if (currPage === maxPages) {
      return ev.preventDefault()
    }

    setCurrentPage(currPage + 1)
  }

  const _jumpToPage = pageNumber => ev => {
    setCurrentPage(pageNumber)
  }

  const isCurrMax = currPage === maxPages
  return (
    <>
      <SquaredBox onClick={_decrement}>
        <Icon color='pastel-blue' fontSize={1} name='arrow_back' />
      </SquaredBox>
      <SquaredBox
        bg={!isCurrMax ? 'green' : 'transparent'}
        onClick={isCurrMax ? _jump('back') : null}>
        <Typography color='pastel-blue' fontSize={1}>
          {!isCurrMax ? currPage : '...' }
        </Typography>
      </SquaredBox>
      <SquaredBox onClick={!isCurrMax ? _increment : _jumpToPage(maxPages - 2)}>
        <Typography color='pastel-blue' fontSize={1}>
          { !isCurrMax ? currPage + 1 : maxPages - 2}
        </Typography>
      </SquaredBox>
      <SquaredBox onClick={ !isCurrMax ? _jump('forward') : _decrement}>
        <Typography color='pastel-blue' fontSize={1}>
          { !isCurrMax ? '...' : maxPages - 1 }
        </Typography>
      </SquaredBox>
      <SquaredBox
        bg={ isCurrMax ? 'green' : 'transparent'}
        onClick={_jumpToPage(maxPages)}
      >
        <Typography color='pastel-blue' fontSize={1}>
          {maxPages}
        </Typography>
      </SquaredBox>
      <SquaredBox onClick={_increment}>
        <Icon color='pastel-blue' fontSize={1} name='arrow_forward' />
      </SquaredBox>
    </>
  )
}

Pagination.propTypes = {
  currPage: PropTypes.number,
  maxPages: PropTypes.number,
  setCurrentPage: PropTypes.func
}

Pagination.defaultProps = {
  maxPages: 50
}

export default Pagination
