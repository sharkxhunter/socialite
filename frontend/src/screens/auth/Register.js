import { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Container } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { register, reset } from '../../features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const { name, email, password, confirmPassword } = formData

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

    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
    } else {
      // DISPATCH REGISTER
      const userData = {
        name,
        email,
        password,
      }

      dispatch(register(userData))
    }
  }

  // Errors
  const nameError =
    errors &&
    Array.isArray(errors) &&
    errors.length > 0 &&
    errors.find((err) => err.param === 'name')
      ? 'is-invalid'
      : ''

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
        <Row className='d-flex justify-content-center py-5'>
          <Col md={8}>
            <h3 className='display-4 text-uppercase'>SIGN UP</h3>
            {isLoading && <Loader />}
            <Form onSubmit={submitHandler}>
              <Form.Group className='mb-3'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter your name'
                  name='name'
                  value={name}
                  className={nameError}
                  onChange={onChange}
                />

                <div className='invalid-feedback'>
                  {errors &&
                  Array.isArray(errors) &&
                  errors.length > 0 &&
                  errors.filter((err) => err.param === 'name').length > 0
                    ? errors.filter((err) => err.param === 'name')[0].msg
                    : ''}
                </div>
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter email'
                  name='email'
                  value={email}
                  className={emailError}
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

                <Form.Text className='text-muted'>
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Password'
                  name='password'
                  value={password}
                  className={passwordError}
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
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Confirm password'
                  name='confirmPassword'
                  value={confirmPassword}
                  onChange={onChange}
                />
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Check type='checkbox' label='Remember me' />
              </Form.Group>
              <Button variant='primary' type='submit'>
                Register
              </Button>

              <div className='py-2'>
                <span className='me-2'>Already have an account?</span>
                <Link to='/'>Login</Link>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Register
