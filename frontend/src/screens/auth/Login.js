import { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Container } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import Loader from '../../components/Loader'
import { toast } from 'react-toastify'
import Message from '../../components/Message'
import { login, reset } from '../../features/auth/authSlice'

import { useDispatch, useSelector } from 'react-redux'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, errors } = useSelector(
    (state) => state.auth
  )
  // Get the values from global state

  useEffect(() => {
    if (isError && typeof errors === 'string') {
      toast.error(errors)
    }

    if (isSuccess || user) {
      navigate('/newsfeed')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, errors, navigate, dispatch])

  const submitHandler = (e) => {
    e.preventDefault()

    // DISPATCH LOGIN
    const userData = {
      email,
      password,
    }

    dispatch(login(userData))
  }

  const emailError =
    errors &&
    Array.isArray(errors) &&
    errors.length > 0 &&
    errors.find((err) => err.param === 'email')
      ? 'is-invalid'
      : ''

  const passwordError =
    errors &&
    Array.isArray(errors) &&
    errors.length > 0 &&
    errors.find((err) => err.param === 'password')
      ? 'is-invalid'
      : ''

  return (
    <>
      <Container>
        <Row className='d-flex justify-content-center mt-5 pt-3'>
          <Col md={8}>
            <h3 className='display-4 text-uppercase'>SIGN IN</h3>
            {typeof errors === 'string' && isError ? (
              <Message variant='danger'>{errors}</Message>
            ) : (
              <></>
            )}
            {isLoading ? (
              <Loader />
            ) : (
              <Form onSubmit={submitHandler}>
                <Form.Group className='mb-3'>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type='email'
                    placeholder='Enter email'
                    name='email'
                    className={emailError}
                    value={email}
                    onChange={onChange}
                  />

                  <div className='invalid-feedback'>
                    {errors &&
                    Array.isArray(errors) &&
                    errors.length > 0 &&
                    errors.filter((err) => err.param === 'email').length > 0
                      ? errors.filter((err) => err.param === 'email')[0].msg
                      : ''}
                  </div>
                </Form.Group>

                <Form.Group className='mb-3'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='Password'
                    name='password'
                    className={passwordError}
                    value={password}
                    onChange={onChange}
                  />

                  <div className='invalid-feedback'>
                    {errors &&
                    Array.isArray(errors) &&
                    errors.length > 0 &&
                    errors.filter((err) => err.param === 'password').length > 0
                      ? errors.filter((err) => err.param === 'password')[0].msg
                      : ''}
                  </div>

                  <Form.Text className='text-muted'>
                    Never share your password with anyone else.
                  </Form.Text>
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Check type='checkbox' label='Remember me' />
                </Form.Group>
                <Button variant='primary' type='submit'>
                  Submit
                </Button>

                <div className='py-2'>
                  <span className='me-2'>Haven't join yet?</span>
                  <Link to='/register'>Join Us</Link>
                </div>
              </Form>
            )}
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Login
