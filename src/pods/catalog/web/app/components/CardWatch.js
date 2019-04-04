import React from "react"
import PropTypes from 'prop-types'
import { Button, Card, Image, Typography, Space } from "@ivoryio/kogaio"

const CardWatch = ({ title, description, imgSrc, buttonLabel, onClick }) => (
  <Space pb={3}>
    <Card
      colors='card-white'
      display='flex'
      flexDirection='column'
      alignItems='center'
    >
      <Image
        src={imgSrc}
        dimensions={["100%", 140]}
      />
      <Space mt={6} px={4}>
        <Typography color='gunmetal' fontSize={0} fontWeight={8}>
          {title}
        </Typography>
      </Space>
      <Space mt={1} px={4}>
        <Typography
          color='gunmetal'
          fontSize={0}
          lineHeight='18px'
          textAlign='center'
        >
          {description}
        </Typography>
      </Space>
      <Space mt={9}>
        <Button
          colors='button-outline-alt'
          fontSize='0.75em'
          onClick={onClick}
          title={buttonLabel}
          variant='outline'
          width={{ xs: 1, md: 3 / 4 }}
        />
      </Space>
    </Card>
  </Space>
)

CardWatch.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  imgSrc: PropTypes.string,
  buttonLabel: PropTypes.string,
  onClick: PropTypes.func
}
export default CardWatch
