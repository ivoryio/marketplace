import React, { useContext } from 'react'
import { PropTypes } from 'prop-types'
import { SquaredBox } from '.'
import { Icon, Typography } from '@ivoryio/kogaio'

import { DataContext } from '../services/Provider'

const Pagination = ({ maxPages }) => {
  const { currentPage, setCurrentPage } = useContext(DataContext)

  const _decrement = ev => {
    if (currentPage === 1) {
      return ev.preventDefault()
    }
    setCurrentPage(currentPage - 1)
  }

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
  const isMaxPagesOneOrTwo = [1, 2].includes(maxPages)

  const _pickContentOfFirstBox = () => {
    if (maxPages === 2 && currentPage === 2) {
      return currentPage - 1
    } else if (!isOneOfLastTwo || currentPage === 1) {
      return currentPage
    } else {
      return '...'
    }
  }
  const _pickContentOfSecondBox = () => {
    if (currentPage === 2 && maxPages === 2) {
      return currentPage
    } else if (!isOneOfLastTwo || maxPages === 2) {
      return currentPage + 1
    } else {
      return maxPages - 2
    }
  }
  return (
    <>
      <SquaredBox onClick={_decrement}>
        <Icon color='pastel-blue' fontSize={1} name='arrow_back' />
      </SquaredBox>
      <SquaredBox
        bg={!isOneOfLastTwo || currentPage === 1 ? 'green' : 'transparent'}
        onClick={isOneOfLastTwo && !isMaxPagesOneOrTwo ? _jump('back') : _decrement}>
        <Typography color='pastel-blue' fontSize={1}>
          {_pickContentOfFirstBox()}
        </Typography>
      </SquaredBox>
      {
        maxPages !== 1 ?
          <SquaredBox
            bg={currentPage === 2 && maxPages === 2 ? 'green' : 'transparent'}
            onClick={!isOneOfLastTwo || maxPages === 2 ? _increment : _jumpToPage(maxPages - 2)}
          >
            <Typography color='pastel-blue' fontSize={1}>
              {_pickContentOfSecondBox()}
            </Typography>
          </SquaredBox> : null
      }
      {
        !isMaxPagesOneOrTwo
          ? <>
            <SquaredBox
              bg={currentPage === maxPages - 1 ? 'green' : 'transparent'}
              onClick={!isOneOfLastTwo ? _jump('forward') : _decrement}
            >
              <Typography color='pastel-blue' fontSize={1}>
                {!isOneOfLastTwo ? '...' : maxPages - 1}
              </Typography>
            </SquaredBox>
            <SquaredBox
              bg={currentPage === maxPages ? 'green' : 'transparent'}
              onClick={_jumpToPage(maxPages)}
            >
              <Typography color='pastel-blue' fontSize={1}>
                {maxPages}
              </Typography>
            </SquaredBox>
          </> : null
      }
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
