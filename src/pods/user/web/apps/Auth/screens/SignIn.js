import React from 'react'
import PropTypes from 'prop-types'
import { Auth } from 'aws-amplify'
import styled from 'styled-components'
import { Formik, Form } from 'formik'

import {
  Box,
  Button,
  Card,
  Flex,
  Image,
  Space,
  Touchable,
  Typography
} from '@ivoryio/kogaio'
import icons from 'user-assets/icons'
import { ValidatedInput } from '../components'
import { required, emailFormat } from '../services/validators'

const SignIn = ({ authState, onStateChange }) => {
  const _handleStateChange = (newState, params = null) => () =>
    onStateChange(newState, params)

  const _signIn = async (values, actions) => {
    const { setError, setSubmitting } = actions
    setError(null)
    try {
      const { email, password } = values
      await Auth.signIn(email, password)
    } catch (err) {
      if (typeof err === 'object') {
        const { message, code } = err
        if (['NotFoundException', 'NotAuthorizedException'].includes(code)) {
          return setError('* Invalid email or password.')
        } else {
          return setError(`* ${message}`)
        }
      }
      setError(`* Error caught: ${err}`)
    } finally {
      setSubmitting(false)
    }
  }
  if (!['signIn', 'signedOut', 'signedUp'].includes(authState)) {
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
          width={{ xs: 1, sm: 2 / 3, md: 3 / 4, lg: 1 / 3 }}
        >
          <Image size={[120]} src={icons.logo} />
          <Space mt={1}>
            <Typography
              data-testid='signin-title'
              color='dark-gunmetal'
              fontWeight={2}
              textAlign='center'
              textStyle='h2'
            >
              Sign In Below!
            </Typography>
          </Space>
          <Box width={{ xs: 1, sm: 3 / 4, lg: 2 / 3 }}>
            <Formik
              initialValues={{ email: '', password: '' }}
              onSubmit={_signIn}
              render={({
                values: { email, password },
                error,
                handleSubmit,
                isSubmitting
              }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Space mt={1}>
                    <ValidatedInput
                      dataTestId='username-input-signin'
                      label='Email'
                      name='email'
                      placeholder='Email'
                      type='email'
                      validate={[required, emailFormat]}
                      value={email}
                    />
                    <ValidatedInput
                      dataTestId='password-input-signin'
                      label='Password'
                      name='password'
                      placeholder='Password'
                      type='password'
                      validate={[required]}
                      value={password}
                    />
                  </Space>
                  <Space mt={1}>
                    {error && (
                      <Typography textStyle='error' textAlign='center'>
                        {error}
                      </Typography>
                    )}
                  </Space>
                  <Space mt={4}>
                    <Button
                      data-testid='signin-button'
                      disabled={isSubmitting}
                      title='Sign In'
                      type='submit'
                      width={1}
                    />
                  </Space>
                </Form>
              )}
            />
          </Box>
          <Space mt={4}>
            <Touchable
              data-testid='anchor-to-signup'
              effect='opacity'
              onClick={_handleStateChange('signUp')}
              width={1}
            >
              <Typography
                textStyle='link'
                message="Don\'t have an account yet? Sign up!"
              />
            </Touchable>
          </Space>
        </Card>
      </Space>
    </Container>
  )
}

const Container = styled(Flex)`
  height: 100%;
`

SignIn.propTypes = {
  authState: PropTypes.string.isRequired,
  onStateChange: PropTypes.func
}

SignIn.defaultProps = {
  authState: 'signIn'
}

export default SignIn
