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

const CardWatch = ({
  type,
  title,
  description,
  descriptionFontStyle,
  descriptionPadding,
  imgSrc,
  imgHeight,
  buttonLabel,
  buttonAlignment,
  onClick,
  ...props
}) =>
  type === 'newest' ? (
    <Card
      alignItems='center'
      borderRadius={3}
      colors='card-white'
      display='flex'
      flexDirection='column'
      position='relative'
      {...props}
    >
      <Flex alignItems='center' justifyContent='center' width={1}>
        <Image src={imgSrc} height={imgHeight} objectFit='contain' width={1} />
      </Flex>
      <Space mt={4} px={3}>
        <ProductTitle
          color='gunmetal'
          fontSize={0}
          fontWeight={2}
          textAlign='center'
        >
          {title}
        </ProductTitle>
      </Space>
      <Space mt={1} px={4}>
        <Flex alignItems='center' height='34px'>
          <Description
            color='gunmetal'
            fontSize={0}
            lineHeight='18px'
            textAlign='center'
          >
            {description}
          </Description>
        </Flex>
      </Space>
      <Space mt={8} mb={4}>
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
  ) : (
    <Card
      borderRadius={3}
      colors='card-white'
      display='flex'
      flexDirection='column'
      {...props}
    >
      <Flex alignItems='center' justifyContent='center' width={1}>
        <Image src={imgSrc} height={imgHeight} objectFit='contain' width={1} />
      </Flex>
      <Space mt={4} px={descriptionPadding || { xs: 4, md: 6 }}>
        <Flex alignItems='center' height='44px'>
          <Description
            color='gunmetal'
            textStyle={descriptionFontStyle || 'h6'}
            textAlign='center'
          >
            {description}
          </Description>
        </Flex>
      </Space>
      <Hide xs sm md>
        <Space mb={{ xs: 0, sm: 1, md: 4 }}>
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
  )

const pickButtonAlignment = ({ buttonAlignment }) => css`
  ${buttonAlignment === 'center' ? `align-self: center;` : `margin-left: 40px;`}
`
const StyledButton = styled(Button)`
  ${pickButtonAlignment}
`

const Description = styled(Typography)`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`
const ProductTitle = styled(Typography)`
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
  descriptionPadding: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
    PropTypes.string
  ]),
  imgHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  imgSrc: PropTypes.string,
  buttonLabel: PropTypes.string,
  onClick: PropTypes.func
}
export default CardWatch
