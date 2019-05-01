import React, { useContext } from 'react'
import { PropTypes } from 'prop-types'
import { SquaredBox } from '.'
import { Icon, Typography } from '@ivoryio/kogaio'

import { Context } from '../services/Provider'

const Pagination = ({ maxPages }) => {
  const contextData = useContext(Context)
  const { currentPage, setCurrentPage } = contextData
  
  const _decrement = ev => {
    if (currentPage === 1) {
      return ev.preventDefault()
    }
    setCurrentPage(currentPage - 1)
  }

  const _jump = direction => ev => {
    const HOPPER = 10
    if (direction ==='back') {
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

  const _increment = ev => {
    if (currentPage === maxPages) {
      return ev.preventDefault()
    }
    setCurrentPage(currentPage + 1)
  }

  const _jumpToPage = pageNumber => ev => {
    setCurrentPage(pageNumber)
  }

  const isOneOfLastTwo = [maxPages, maxPages - 1].includes(currentPage)
  return (
    <>
      <SquaredBox onClick={_decrement}>
        <Icon color='pastel-blue' fontSize={1} name='arrow_back' />
      </SquaredBox>
      <SquaredBox
        bg={!isOneOfLastTwo ? 'green' : 'transparent'}
        onClick={isOneOfLastTwo ? _jump('back') : null}>
        <Typography color='pastel-blue' fontSize={1}>
          {!isOneOfLastTwo ? currentPage : '...' }
        </Typography>
      </SquaredBox>
      <SquaredBox onClick={!isOneOfLastTwo ? _increment : _jumpToPage(maxPages - 2)}>
        <Typography color='pastel-blue' fontSize={1}>
          { !isOneOfLastTwo ? currentPage + 1 : maxPages - 2}
        </Typography>
      </SquaredBox>
      <SquaredBox
        bg={ currentPage === maxPages - 1 ? 'green' : 'transparent'}
        onClick={ !isOneOfLastTwo ? _jump('forward') : _decrement}
      >
        <Typography color='pastel-blue' fontSize={1}>
          { !isOneOfLastTwo ? '...' : maxPages - 1 }
        </Typography>
      </SquaredBox>
      <SquaredBox
        bg={ currentPage === maxPages ? 'green' : 'transparent'}
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
  maxPages: PropTypes.number
}

Pagination.defaultProps = {
  maxPages: 50
}

export default Pagination
