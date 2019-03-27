import React from 'react'
import { Auth } from 'aws-amplify'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Formik, Form } from 'formik'
import {
  Box,
  Button,
  Card,
  Dropdown,
  Flex,
  Image,
  Input,
  Space,
  Touchable,
  Typography
} from '@ivoryio/kogaio'

import icons from 'user-assets/icons'
import { ValidatedInput } from '../components'
import { required, emailFormat, passwordFormat } from '../services/validators'

const options = [
  {
    id: 'dropdown-romania',
    name: 'Romania'
  },
  {
    id: 'dropdown-russia',
    name: 'Russia'
  },
  {
    id: 'dropdown-moldova',
    name: 'Moldova'
  }
]

const SignUp = ({ authState, onStateChange }) => {
  const _handleStateChange = (newState, params) => () => {
    onStateChange(newState, params)
  }

  const _signUp = async (values, actions) => {
    const { setError, setSubmitting } = actions
    setError(null)
    const { email, password, name, familyName, city, country } = values
    try {
      const user = await Auth.signUp({
        username: email,
        password,
        attributes: {
          name,
          family_name: familyName,
          'custom:city': city,
          'custom:country': country
        }
      })
      _handleStateChange('signIn', { email: user.email })()
    } catch (err) {
      if (typeof err === 'object') {
        const { message } = err
        return setError(`* ${message}`)
      }
      setError(`* Error caught: ${err}`)
    } finally {
      setSubmitting(false)
    }
  }

  if (authState !== 'signUp') {
    return null
  }
  return (
    <Container justifyContent='center' alignItems='center'>
      <Space mx={3} p={4}>
        <Card
          alignItems='center'
          colors='card-gray'
          display='flex'
          flexDirection='column'
          width={{ xs: 1, sm: 3 / 4, md: 3 / 5, lg: 1 / 2 }}
        >
          <Image mx='auto' size={[120]} src={icons.logo} />
          <Typography
            data-testid='signup-title'
            color='dark-gunmetal'
            fontWeight={8}
            textAlign='center'
            textStyle='h2'
          >
            Sign Up Below!
          </Typography>
          <Space mt={3}>
            <Formik
              initialValues={{
                email: '',
                password: '',
                name: '',
                familyName: '',
                city: '',
                country: ''
              }}
              onSubmit={_signUp}
              render={({
                values: { email, password, name, familyName, city, country },
                error,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting
              }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Flex flexWrap='wrap' justifyContent='center'>
                    <Space px={{ lg: 3 }}>
                      <Box width={{ xs: 1, sm: 4 / 5, md: 3 / 4, lg: 1 / 2 }}>
                        <ValidatedInput
                          dataTestId='email-input-signup'
                          label='Email'
                          name='email'
                          placeholder='Email'
                          required
                          type='email'
                          validate={[required, emailFormat]}
                          value={email}
                        />
                      </Box>
                    </Space>
                    <Space px={{ lg: 3 }}>
                      <Box width={{ xs: 1, sm: 4 / 5, md: 3 / 4, lg: 1 / 2 }}>
                        <ValidatedInput
                          dataTestId='password-input-signup'
                          type='password'
                          placeholder='Password'
                          name='password'
                          value={password}
                          label='Password'
                          required
                          validate={[required, passwordFormat]}
                        />
                      </Box>
                    </Space>
                    <Space px={{ lg: 3 }}>
                      <Box width={{ xs: 1, sm: 4 / 5, md: 3 / 4, lg: 1 / 2 }}>
                        <ValidatedInput
                          dataTestId='firstname-input-signup'
                          placeholder='First name'
                          value={name}
                          label='First Name'
                          name='name'
                          required
                          validate={[required]}
                        />
                      </Box>
                    </Space>
                    <Space px={{ lg: 3 }}>
                      <Box width={{ xs: 1, sm: 4 / 5, md: 3 / 4, lg: 1 / 2 }}>
                        <ValidatedInput
                          dataTestId='lastname-input-signup'
                          label='Last Name'
                          name='familyName'
                          placeholder='Last name'
                          required
                          validate={[required]}
                          value={familyName}
                        />
                      </Box>
                    </Space>
                    <Space px={{ lg: 3 }}>
                      <Box width={{ xs: 1, sm: 4 / 5, md: 3 / 4, lg: 1 / 2 }}>
                        <Input
                          dataTestId='city-input-signup'
                          placeholder='City'
                          value={city}
                          label='City'
                          name='city'
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                      </Box>
                    </Space>
                    <Space px={{ lg: 3 }}>
                      <Box width={{ xs: 1, sm: 4 / 5, md: 3 / 4, lg: 1 / 2 }}>
                        <Dropdown
                          data-testid='country-dropdown-signup'
                          label='Country'
                          name='country'
                          placeholder='Select Your Country'
                          options={options}
                          onChangeOption={handleChange('country')}
                          selectedOption={country}
                          width={1}
                        />
                      </Box>
                    </Space>
                    <Space mt={1}>
                      <Box width={1}>
                        {error && (
                          <Typography textStyle='error' textAlign='center'>
                            {error}
                          </Typography>
                        )}
                      </Box>
                    </Space>
                    <Space mt={3}>
                      <Box width={{ xs: 1, sm: 4 / 5, md: 3 / 4, lg: 3 / 7 }}>
                        <Button
                          data-testid='signup-button'
                          disabled={isSubmitting}
                          display='block'
                          title='Sign Up'
                          type='submit'
                          width={1}
                        />
                      </Box>
                    </Space>
                  </Flex>
                </Form>
              )}
            />
          </Space>
          <Space mt={3}>
            <Touchable
              data-testid='anchor-to-signin'
              effect='opacity'
              onClick={_handleStateChange('signIn')}
            >
              <Typography
                textStyle='link'
                message='Already have an account? Sign in!'
              />
            </Touchable>
          </Space>
        </Card>
      </Space>
    </Container>
  )
}

const Container = styled(Flex)`
  min-height: 100%;
`

SignUp.propTypes = {
  authState: PropTypes.string.isRequired,
  onStateChange: PropTypes.func
}

SignUp.defaultProps = {
  authState: 'signIn'
}

export default SignUp
