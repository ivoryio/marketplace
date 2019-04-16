import React, { useState } from "react"
import PropTypes from "prop-types"
import { Flex, Icon, Space, Touchable, Typography } from "@ivoryio/kogaio"

const Row = ({ left, right }) => (
  <Space>
    <Flex width={1} justifyContent='space-between'>
      {left}
      {right}
    </Flex>
  </Space>
)

const LeftOptionSide = ({ categoryName, title, handleActiveFilterCategories }) => {
  const [ isChecked, setIsChecked ] = useState(false)
  const handleCheck = (ev) => {
    if(!isChecked) {
      handleActiveFilterCategories(categoryName.toLowerCase(), title)()
    }
    setIsChecked(!isChecked)
  }

  return (
    <Flex>
      <Space mr={{ xs: 1, md: 2 }}>
        <input
          name={`checkbox-${title}`}
          value={title}
          type='checkbox'
          checked={isChecked}
          onChange={handleCheck}
        />
      </Space>
      <Typography
        color='gunmetal'
        fontSize={1}
      >
        {title}
      </Typography>
    </Flex>
  )
}

  const RightOptionSide = ({ numberOfProducts }) => (
    <Typography>
      {`(${numberOfProducts})`}
    </Typography>
  )

const FilterCategory = ({ name, options, handleActiveFilterCategories, ...props }) => {
  const [showOptions, setShowOptions] = useState(false)
  const handleShowOptions = () => setShowOptions(!showOptions)

  const LeftCategorySide = () => (
    <Typography color='pastel-blue' fontSize={0} fontWeight={8}>
      {name}
    </Typography>
  )

  const RightCategorySide = () => (
    <Touchable effect='highlight' onClick={handleShowOptions}>
      <Flex
        alignItems='center'
        justifyContent='center'
        height='22px'
        width='22px'
        bg='pastel-blue'
        borderRadius={6}
      >
        <Icon
          color='ghost-white'
          name={showOptions ? "arrow_drop_up" : "arrow_drop_down"}
          fontSize={3}
        />
      </Flex>
    </Touchable>
  )

  return (
    <Space>
      <Flex width={1} flexDirection='column' {...props}>
        <Row left={<LeftCategorySide />} right={<RightCategorySide />} />
        { showOptions && (options ? options.map(option => {
          const {title, numberOfProducts } = option
          return (
            <Space key={title}>
              <Row
                left={<LeftOptionSide categoryName={name} handleActiveFilterCategories={handleActiveFilterCategories} title={title} />}
                right={<RightOptionSide numberOfProducts={numberOfProducts} />}
              />
            </Space>
          )
        }) : null) }
      </Flex>
    </Space>
  )
}

LeftOptionSide.propTypes = {
  categoryName: PropTypes.string,
  title: PropTypes.string,
  handleActiveFilterCategories: PropTypes.string
}
RightOptionSide.propTypes = {
  numberOfProducts: PropTypes.oneOf([PropTypes.string, PropTypes.number])
}
Row.propTypes = {
  left: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
    PropTypes.element
  ]),
  right: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
    PropTypes.element
  ])
}

FilterCategory.propTypes = {
  name: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
  handleActiveFilterCategories: PropTypes.func
}

export default FilterCategory
