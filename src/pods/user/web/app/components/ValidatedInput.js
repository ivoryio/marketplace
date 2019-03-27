import React from 'react'
import Input from '@ivoryio/kogaio/Input'
import PropTypes from 'prop-types'
import { Field } from 'formik'

const _validateField = (value, validations) => () => {
  for (let validation of validations) {
    const result = validation(value)
    if (result) {
      return result
    }
  }
  return ''
}
const ValidatedInput = ({
  dataTestId,
  name,
  type,
  label,
  placeholder,
  required,
  validate,
  value
}) => (
  <Field
    name={name}
    validate={_validateField(value, validate)}
    render={({ field, form: { touched, errors }, ...props }) => (
      <Input
        {...field}
        {...props}
        dataTestId={dataTestId}
        type={type}
        name={name}
        label={label}
        placeholder={placeholder}
        required={required}
        error={touched[name] && errors[name]}
      />
    )}
  />
)

ValidatedInput.propTypes = {
  dataTestId: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  validate: PropTypes.arrayOf(PropTypes.func),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
    PropTypes.array
  ])
}

export default ValidatedInput
