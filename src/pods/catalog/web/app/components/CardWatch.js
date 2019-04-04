import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import {
  Button,
  Card,
  Flex,
  Hide,
  Image,
  Space,
  Typography
} from '@ivoryio/kogaio'

const CardWatch = ({ type, title, description, descriptionFontStyle, descriptionPadding, imgSrc, imgHeight, buttonLabel, buttonAlignment, onClick, ...props }) => (
  type === 'newest' ? (<Space pb={4}>
    <Card
      borderRadius={3}
      colors='card-white'
      display='flex'
      flexDirection='column'
      alignItems='center'
      {...props}
    >
      <Image
        src={imgSrc}
        dimensions={['100%', imgHeight]}
      />
      <Space mt={4} px={3}>
        <StyledTitle color='gunmetal' fontSize={0} fontWeight={8} textAlign='center'>
          {title}
        </StyledTitle>
      </Space>
      <Space mt={1} px={4}>
        <Flex alignItems='center' height='34px'>
          <StyledDescription
            color='gunmetal'
            fontSize={0}
            lineHeight='18px'
            textAlign='center'
          >
            {description}
          </StyledDescription>
        </Flex>
      </Space>
      <Space mt={9}>
        <Button
          colors='button-outline-alt'
          fontSize={0}
          onClick={onClick}
          title={buttonLabel}
          variant='outline'
          width={3 / 4}
        />
      </Space>
    </Card>
  </Space>) : (<Space pb={5}>
    <Card
      borderRadius={3}
      colors='card-white'
      display='flex'
      flexDirection='column'
      {...props}
    >
      <Image
        src={imgSrc}
        dimensions={['100%', imgHeight]}
      />
      <Space mt={4} px={descriptionPadding ? descriptionPadding: { xs: 4, md:5 }}>
        <Flex alignItems='center' height='44px'>
          <StyledDescription color='gunmetal' textStyle={descriptionFontStyle ? descriptionFontStyle : 'h6'} textAlign='center'>
            {description}
          </StyledDescription>
          </Flex>
      </Space>
      <Hide xs sm md>
        <Space mb='auto' >
            <StyledButton
              width='160px'
              buttonAlignment={buttonAlignment}
              colors='button-outline-alt'
              fontSize={0}
              onClick={onClick}
              title={buttonLabel}
              variant='outline'
            />
        </Space>
      </Hide>
    </Card>
  </Space>)
)

const pickButtonAlignment = ({ buttonAlignment }) => css`
  ${buttonAlignment === 'center'
    ? `align-self: center;`
      : `margin-left: 40px;`
  }
`
const StyledButton = styled(Button)`
  ${pickButtonAlignment}
`
const StyledDescription = styled(Typography)`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`
const StyledTitle = styled(Typography)`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`

CardWatch.propTypes = {
  buttonAlignment: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string,
  description: PropTypes.string,
  descriptionFontStyle: PropTypes.string,
  descriptionPadding: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.string]),
  imgHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  imgSrc: PropTypes.string,
  buttonLabel: PropTypes.string,
  onClick: PropTypes.func
}
export default CardWatch
